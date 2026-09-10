/**
 * Aria Voice Engine
 * Complete end-to-end conversational voice pipeline:
 * - Real-time speech streaming with sentence boundary detection
 * - Intelligent pre-buffering audio queue (eliminates awkward pauses between chunks)
 * - Chrome/Edge speech synthesis watchdog (prevents stalls/cancels)
 * - Instant Barge-In / Interruption handling (stops audio, flushes stale queue immediately)
 * - Prosody & naturalness tuning (Aria persona)
 * - Reactive state reporting (IDLE, LISTENING, THINKING, SPEAKING, INTERRUPTED)
 */

import { VOICE_CONFIG } from './voiceConfig.js';
import { normalizeTextForSpeech } from './speechNormalizer.js';
import { SentenceChunker } from './sentenceChunker.js';

export class VoiceEngine {
  constructor() {
    this.config = { ...VOICE_CONFIG };
    this.voices = [];
    this.selectedVoice = null;
    
    // Audio Queue State
    this.audioQueue = [];
    this.currentResponseId = 0;
    this.currentUtterance = null;
    this.isSpeaking = false;
    this.isPlayingQueue = false;

    // Conversational State: 'IDLE' | 'LISTENING' | 'THINKING' | 'SPEAKING' | 'INTERRUPTED'
    this.state = 'IDLE';

    // Event Subscriptions
    this.listeners = {
      stateChange: new Set(),
      chunkStart: new Set(),
      chunkEnd: new Set(),
      boundary: new Set(),
      error: new Set()
    };

    // Watchdog timer to prevent Chromium speech synthesis stalling
    this.watchdogTimer = null;
    this.lastSpeechTime = 0;

    this.initVoices();
  }

  /**
   * Initialize speech synthesis voices
   */
  initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('[VoiceEngine] Web Speech API not supported in this environment.');
      return;
    }

    const loadVoices = () => {
      this.voices = window.speechSynthesis.getVoices();
      this.selectedVoice = this.pickBestVoice();
      if (this.config.logging && this.selectedVoice) {
        console.log(`[VoiceEngine] Selected Voice: ${this.selectedVoice.name} (${this.selectedVoice.lang})`);
      }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  /**
   * Selects the highest quality natural female voice based on priority list
   */
  pickBestVoice() {
    if (!this.voices || this.voices.length === 0) return null;

    for (const pref of this.config.voicePreferences) {
      const match = this.voices.find(v => {
        if (!pref.pattern.test(v.name)) return false;
        if (pref.gender && !v.name.toLowerCase().includes(pref.gender)) {
          // If gender is female, verify it doesn't say male
          if (v.name.toLowerCase().includes('male')) return false;
        }
        return true;
      });
      if (match) return match;
    }

    // Fallback strictly to natural English female voices
    const fallback = this.voices.find(v => (v.lang === 'en-US' || v.lang === 'en-GB') && !v.name.toLowerCase().includes('male'))
      || this.voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female'))
      || this.voices.find(v => v.lang === 'en-US' || v.lang === 'en-GB')
      || this.voices.find(v => v.lang.startsWith('en'))
      || this.voices[0];

    return fallback;
  }

  /**
   * Subscribe to engine events
   */
  on(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].add(callback);
    }
    return () => this.off(event, callback);
  }

  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].delete(callback);
    }
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => {
        try {
          cb(data);
        } catch (e) {
          console.error(`[VoiceEngine] Error in ${event} callback:`, e);
        }
      });
    }
  }

  setState(newState) {
    if (this.state !== newState) {
      const oldState = this.state;
      this.state = newState;
      if (this.config.logging) {
        console.log(`[VoiceEngine] State: ${oldState} -> ${newState}`);
      }
      this.emit('stateChange', { state: newState, oldState });
    }
  }

  getState() {
    return this.state;
  }

  /**
   * Instant Interruption / Barge-in:
   * Immediately silences the assistant, invalidates active responseId, and flushes audio queue.
   */
  interrupt(reason = 'user_barge_in') {
    if (this.config.logging) {
      console.log(`[VoiceEngine] Interrupted (${reason}). Flushing audio queue.`);
    }

    // Invalidate response ID so pending queued utterances are discarded
    this.currentResponseId++;

    // Immediately stop synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    this.audioQueue = [];
    this.currentUtterance = null;
    this.isSpeaking = false;
    this.isPlayingQueue = false;
    this.stopWatchdog();

    this.setState('INTERRUPTED');
  }

  /**
   * Start a new spoken response turn.
   * Clears old queues and sets state to SPEAKING.
   * Can accept full text or start progressive streaming.
   */
  startResponse(text = '', isStream = false) {
    // Increment response turn ID to invalidate anything from prior turn
    this.currentResponseId++;
    const activeResponseId = this.currentResponseId;

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.audioQueue = [];
    this.isSpeaking = false;
    this.isPlayingQueue = false;

    if (text) {
      this.enqueueText(text, activeResponseId);
    }

    return activeResponseId;
  }

  /**
   * Feeds streamed text chunks from LLM/WebSocket as they arrive
   */
  feedStreamChunk(textChunk, responseId) {
    if (responseId !== undefined && responseId !== this.currentResponseId) {
      // Stale response stream chunk, discard
      return;
    }
    this.enqueueText(textChunk, this.currentResponseId);
  }

  /**
   * Normalize, chunk, and enqueue text into the audio queue
   */
  enqueueText(rawText, responseId) {
    if (!rawText || !this.config.enabled) return;

    // Preprocess text specifically for speech (remove markdown, expand units/currency)
    const normalized = normalizeTextForSpeech(rawText);
    if (!normalized.trim()) return;

    // Intelligent sentence chunking
    const chunks = SentenceChunker.splitIntoChunks(normalized, {
      shortThreshold: this.config.shortResponseThresholdWords,
      minWords: this.config.minChunkWords,
      maxWords: this.config.maxChunkWords
    });

    for (const chunk of chunks) {
      this.audioQueue.push({
        id: Math.random().toString(36).slice(2, 9),
        responseId,
        text: chunk,
        status: 'queued'
      });
    }

    // Trigger playback loop if not already running
    if (!this.isPlayingQueue) {
      this.processAudioQueue();
    }
  }

  /**
   * Process and play chunks in the queue with pre-buffering and seamless transitions
   */
  processAudioQueue() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || !this.config.enabled) {
      this.isPlayingQueue = false;
      this.setState('IDLE');
      return;
    }

    if (this.audioQueue.length === 0) {
      this.isPlayingQueue = false;
      this.isSpeaking = false;
      this.stopWatchdog();
      this.setState('IDLE');
      return;
    }

    this.isPlayingQueue = true;
    const item = this.audioQueue.shift();

    // Discard stale item from prior response turn
    if (item.responseId !== this.currentResponseId) {
      this.processAudioQueue();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(item.text);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
      utterance.lang = this.selectedVoice.lang || 'en-US';
    } else {
      utterance.lang = 'en-US';
    }

    // Apply Aria prosody
    utterance.pitch = this.config.pitch;
    utterance.rate = this.config.speed;
    utterance.volume = this.config.volume;

    this.currentUtterance = utterance;
    this.isSpeaking = true;
    this.setState('SPEAKING');
    this.startWatchdog();

    utterance.onstart = () => {
      this.lastSpeechTime = Date.now();
      this.emit('chunkStart', { text: item.text, responseId: item.responseId });
    };

    utterance.onboundary = (event) => {
      this.lastSpeechTime = Date.now();
      this.emit('boundary', {
        name: event.name,
        charIndex: event.charIndex,
        text: item.text
      });
    };

    utterance.onend = () => {
      this.emit('chunkEnd', { text: item.text, responseId: item.responseId });
      // Immediately proceed to next chunk with zero artificial delay
      this.processAudioQueue();
    };

    utterance.onerror = (err) => {
      console.warn('[VoiceEngine] Utterance error:', err);
      this.emit('error', err);
      // Don't stall queue on single chunk error
      this.processAudioQueue();
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error('[VoiceEngine] Failed to speak utterance:', e);
      this.processAudioQueue();
    }
  }

  /**
   * Watchdog timer to prevent Chromium speech synthesis stalling bug
   */
  startWatchdog() {
    if (this.watchdogTimer) return;
    this.watchdogTimer = setInterval(() => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        if (this.isSpeaking && window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
          // Keep synthesis alive
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }
    }, 10000);
  }

  stopWatchdog() {
    if (this.watchdogTimer) {
      clearInterval(this.watchdogTimer);
      this.watchdogTimer = null;
    }
  }

  /**
   * Public speak method: handles complete text or short phrases
   */
  speak(text, onComplete) {
    if (!text || !this.config.enabled) {
      if (onComplete) onComplete();
      return;
    }

    const responseId = this.startResponse(text);

    if (onComplete) {
      const handleChunkEnd = (data) => {
        if (data.responseId === responseId && this.audioQueue.length === 0) {
          this.off('chunkEnd', handleChunkEnd);
          onComplete();
        }
      };
      this.on('chunkEnd', handleChunkEnd);
    }
  }

  /**
   * Updates configuration dynamically
   */
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    if (newConfig.speed !== undefined || newConfig.pitch !== undefined) {
      if (this.config.logging) {
        console.log('[VoiceEngine] Updated configuration:', this.config);
      }
    }
  }
}

// Export singleton instance
export const voiceEngine = new VoiceEngine();
export default voiceEngine;
