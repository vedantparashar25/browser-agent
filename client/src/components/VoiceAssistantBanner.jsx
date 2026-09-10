import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Mic, MicOff, Square, Sparkles } from 'lucide-react';
import { voiceEngine } from '../services/voice/voiceEngine';

export default function VoiceAssistantBanner({
  assistantMessage,
  onDismiss,
  voiceEnabled,
  setVoiceEnabled,
  onStartListening
}) {
  const [engineState, setEngineState] = useState(voiceEngine.getState());
  const [activeSubtitle, setActiveSubtitle] = useState('');

  useEffect(() => {
    // Sync with VoiceEngine state
    const unsubscribeState = voiceEngine.on('stateChange', ({ state }) => {
      setEngineState(state);
    });

    const unsubscribeChunkStart = voiceEngine.on('chunkStart', ({ text }) => {
      setActiveSubtitle(text);
    });

    const unsubscribeChunkEnd = voiceEngine.on('chunkEnd', () => {
      if (voiceEngine.audioQueue.length === 0) {
        // Queue empty
      }
    });

    return () => {
      unsubscribeState();
      unsubscribeChunkStart();
      unsubscribeChunkEnd();
    };
  }, []);

  const handleInterrupt = () => {
    voiceEngine.interrupt('user_tap_stop');
  };

  const isSpeaking = engineState === 'SPEAKING';
  const isListening = engineState === 'LISTENING';
  const isThinking = engineState === 'THINKING';
  const isInterrupted = engineState === 'INTERRUPTED';

  const displayText = activeSubtitle || assistantMessage || 'PATHFINDER voice agent ready.';

  return (
    <div className="bg-gradient-to-r from-sky-50 via-indigo-50/30 to-slate-50 border border-sky-200/90 rounded-2xl px-4 py-3 shadow-xs animate-fadeIn transition-all">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
        
        {/* Left: Avatar & Waveform & Persona Title */}
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          {/* Avatar with State Badge */}
          <div className="relative shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-sky-600 text-white shadow-xs font-bold text-xs">
            <span>A</span>
            {isSpeaking && (
              <span className="absolute -inset-1 rounded-full border-2 border-sky-400 animate-ping opacity-75" />
            )}
            {isListening && (
              <span className="absolute -inset-1 rounded-full border-2 border-rose-400 animate-ping opacity-75" />
            )}
          </div>

          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sky-950 text-xs uppercase tracking-wider">
                Aria
              </span>
              <span className="text-[10px] text-slate-400 font-medium hidden xs:inline">&bull;</span>
              <span className="text-[10px] text-slate-500 font-medium">
                Voice Assistant
              </span>

              {/* Status Badge */}
              {isSpeaking && (
                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-100 text-sky-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                  <span>Speaking</span>
                </span>
              )}
              {isListening && (
                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-100 text-rose-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  <span>Listening</span>
                </span>
              )}
              {isThinking && (
                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <span>Thinking</span>
                </span>
              )}
              {isInterrupted && (
                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                  <span>Stopped</span>
                </span>
              )}
            </div>

            {/* Subtitle / Current Speech */}
            <div className="text-xs text-slate-800 font-medium truncate max-w-2xl mt-0.5">
              "{displayText}"
            </div>
          </div>
        </div>

        {/* Right: Real-time Waveform & Controls */}
        <div className="flex items-center space-x-2.5 self-end sm:self-center shrink-0">
          {/* Responsive Audio Waveform (5 bars) */}
          <div className="flex items-center space-x-1 h-5 px-2 bg-white/70 border border-sky-100 rounded-lg">
            {[1, 2, 3, 4, 5].map((i) => {
              const heights = isSpeaking
                ? ['h-2', 'h-4', 'h-3', 'h-5', 'h-2']
                : isListening
                ? ['h-3', 'h-2', 'h-4', 'h-2', 'h-3']
                : ['h-1.5', 'h-1.5', 'h-1.5', 'h-1.5', 'h-1.5'];
              return (
                <span
                  key={i}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    isSpeaking
                      ? 'bg-sky-500 animate-pulse'
                      : isListening
                      ? 'bg-rose-500 animate-pulse'
                      : 'bg-slate-300'
                  } ${heights[i - 1]}`}
                  style={{
                    animationDelay: `${i * 120}ms`
                  }}
                />
              );
            })}
          </div>

          {/* Quick Interrupt / Stop button when speaking */}
          {isSpeaking && (
            <button
              type="button"
              onClick={handleInterrupt}
              className="px-2 py-1 rounded-lg border border-slate-200 bg-white hover:bg-rose-50 hover:text-rose-600 text-slate-700 text-xs font-medium flex items-center space-x-1 transition-colors shadow-2xs"
              title="Interrupt & Stop speech (Barge-in)"
            >
              <Square className="w-3 h-3 text-rose-500 fill-rose-500" />
              <span>Stop</span>
            </button>
          )}

          {/* Audio Mute/Unmute */}
          <button
            type="button"
            onClick={() => {
              if (voiceEnabled) {
                voiceEngine.interrupt('user_muted');
              }
              setVoiceEnabled(!voiceEnabled);
            }}
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs transition-colors"
            title={voiceEnabled ? 'Mute voice assistant' : 'Unmute voice assistant'}
          >
            {voiceEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-sky-600" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>

          {/* Dismiss Banner */}
          <button
            type="button"
            onClick={() => {
              voiceEngine.interrupt('dismissed');
              onDismiss();
            }}
            className="text-[11px] text-slate-500 hover:text-slate-800 font-medium px-2 py-1 rounded hover:bg-white/60 transition-colors"
          >
            Dismiss
          </button>
        </div>

      </div>
    </div>
  );
}
