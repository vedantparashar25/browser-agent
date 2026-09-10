/**
 * Centralized Voice Configuration for Aria Voice Assistant
 * Controls TTS prosody, streaming thresholds, chunking boundaries, and voice selection.
 */

export const VOICE_CONFIG = {
  name: 'Aria',
  tagline: 'Your Destination, Our Path',
  enabled: true,
  streaming: true,
  chunking: true,
  interruption: true,

  // Natural Prosody Calibration for Human-like Indian Hindi/Hinglish Cadence
  // 0.95 gives comfortable vowel clarity and natural breathing space on Indian voices
  speed: 0.95,         // Relaxed, natural human conversational rate
  pitch: 1.01,         // Grounded, warm female pitch without robotic sharpness
  volume: 1.0,         // Clean full output

  // Chunking and Latency Thresholds
  shortResponseThresholdWords: 6,  // Short replies (e.g. "Bilkul!", "Ho gaya!") speak instantly
  minChunkWords: 4,                // Minimum words before chunking at soft pauses (avoids choppy 1-word pauses)
  maxChunkWords: 22,               // Maximum words before forcing a natural breath break

  // Preferred Voice Order (Edge Natural > OS Neural > Web Speech Fallbacks)
  voicePreferences: [
    { pattern: /aria.*online.*natural/i, desc: 'Microsoft Aria Online (Natural)' },
    { pattern: /aria/i, desc: 'Aria' },
    { pattern: /neerja.*online.*natural/i, desc: 'Microsoft Neerja (Indian English Neural)' },
    { pattern: /heera/i, desc: 'Microsoft Heera (Indian English)' },
    { pattern: /en-in/i, gender: 'female', desc: 'Indian English Female' },
    { pattern: /google.*hi-in/i, desc: 'Google Hindi/Hinglish' },
    { pattern: /jenny.*online.*natural/i, desc: 'Microsoft Jenny Online (Natural)' },
    { pattern: /jenny/i, desc: 'Jenny' },
    { pattern: /google.*uk.*female/i, desc: 'Google UK English Female' },
    { pattern: /google.*us.*english/i, desc: 'Google US English' },
    { pattern: /samantha/i, desc: 'Apple Samantha' },
    { pattern: /victoria/i, desc: 'Apple Victoria' }
  ],

  // Debug Logging
  logging: true
};

export default VOICE_CONFIG;
