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

  // Natural Prosody Calibration for Fluent, Human-like English Cadence
  speed: 1.0,          // Natural human conversational pace
  pitch: 1.0,          // Grounded, warm female pitch
  volume: 1.0,         // Clean full output

  // Chunking and Latency Thresholds
  shortResponseThresholdWords: 6,  // Short replies (e.g. "Sure!", "All set!") speak instantly
  minChunkWords: 4,                // Minimum words before chunking at soft pauses
  maxChunkWords: 22,               // Maximum words before forcing a breath break

  // Preferred Voice Order (High-Fidelity Neural English Voices)
  voicePreferences: [
    { pattern: /aria.*online.*natural/i, desc: 'Microsoft Aria Online (Natural)' },
    { pattern: /aria/i, desc: 'Aria' },
    { pattern: /jenny.*online.*natural/i, desc: 'Microsoft Jenny Online (Natural)' },
    { pattern: /jenny/i, desc: 'Jenny' },
    { pattern: /google.*us.*english/i, desc: 'Google US English' },
    { pattern: /google.*uk.*female/i, desc: 'Google UK English Female' },
    { pattern: /neerja.*online.*natural/i, desc: 'Microsoft Neerja (English Neural)' },
    { pattern: /heera/i, desc: 'Microsoft Heera (English)' },
    { pattern: /en-in/i, gender: 'female', desc: 'English Female' },
    { pattern: /samantha/i, desc: 'Apple Samantha' },
    { pattern: /victoria/i, desc: 'Apple Victoria' }
  ],

  // Debug Logging
  logging: true
};

export default VOICE_CONFIG;
