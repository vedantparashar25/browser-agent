/**
 * Intelligent Sentence Chunker for Aria Voice Assistant
 * Splits streamed or complete text into natural, speakable semantic chunks.
 *
 * Rules:
 * 1. Prioritize complete semantic sentences ending with ('.', '!', '?', '\n').
 * 2. Only split on secondary punctuation (',', ';', ':') if the chunk is already long enough (> 8 words).
 * 3. Never split inside abbreviations, decimal numbers, prices, or versions.
 * 4. Never produce micro-chunks (< 3-4 words) that cause choppy robotic cadence.
 * 5. Handles progressive streaming: buffers incomplete sentences until complete terminator arrives.
 */

import { VOICE_CONFIG } from './voiceConfig.js';

export class SentenceChunker {
  constructor(options = {}) {
    this.minWords = options.minWords || VOICE_CONFIG.minChunkWords || 4;
    this.maxWords = options.maxWords || VOICE_CONFIG.maxChunkWords || 22;
    this.buffer = '';
  }

  /**
   * Reset internal streaming buffer
   */
  reset() {
    this.buffer = '';
  }

  /**
   * Feed a new text token/fragment from LLM/WebSocket stream.
   * Returns an array of newly completed semantic chunks ready for TTS.
   */
  feed(fragment) {
    if (!fragment) return [];

    this.buffer += fragment;
    const readyChunks = [];

    // Check if buffer contains sentence or natural clause boundary
    let match;
    // Regex matches sentence terminators (. ! ? \n) not preceded by common abbreviations or inside numbers
    const sentenceRegex = /([.!?\n]+)\s+/g;
    let lastIndex = 0;

    while ((match = sentenceRegex.exec(this.buffer)) !== null) {
      const candidateChunk = this.buffer.slice(lastIndex, match.index + match[1].length).trim();
      
      // Protect abbreviations (e.g., vs., e.g., i.e., Dr., approx.)
      if (/\b(?:vs|eg|ie|dr|mr|mrs|approx|no|v)\.$/i.test(candidateChunk)) {
        continue;
      }

      // Check word count
      const wordCount = candidateChunk.split(/\s+/).filter(Boolean).length;
      if (wordCount >= this.minWords) {
        readyChunks.push(candidateChunk);
        lastIndex = match.index + match[0].length;
      }
    }

    if (lastIndex > 0) {
      this.buffer = this.buffer.slice(lastIndex);
    }

    // Secondary clause boundary if buffer has grown excessively long (> maxWords)
    if (this.buffer.split(/\s+/).filter(Boolean).length >= this.maxWords) {
      const clauseMatch = /([,;:—–])\s+/g.exec(this.buffer);
      if (clauseMatch && clauseMatch.index > 20) {
        const chunk = this.buffer.slice(0, clauseMatch.index + clauseMatch[1].length).trim();
        readyChunks.push(chunk);
        this.buffer = this.buffer.slice(clauseMatch.index + clauseMatch[0].length);
      }
    }

    return readyChunks;
  }

  /**
   * Flush any remaining text in the buffer as the final chunk
   */
  flush() {
    const remaining = this.buffer.trim();
    this.buffer = '';
    return remaining ? [remaining] : [];
  }

  /**
   * Static helper: Splits a complete block of text into optimal speakable chunks
   */
  static splitIntoChunks(fullText, options = {}) {
    if (!fullText || typeof fullText !== 'string') return [];

    const chunker = new SentenceChunker(options);
    const chunks = [];

    // Split paragraphs first
    const paragraphs = fullText.split(/\n+/).map(p => p.trim()).filter(Boolean);

    for (const para of paragraphs) {
      // Short response optimization: if whole paragraph is short (<= 6 words), speak as 1 chunk
      const wordCount = para.split(/\s+/).filter(Boolean).length;
      if (wordCount <= (options.shortThreshold || VOICE_CONFIG.shortResponseThresholdWords || 6)) {
        chunks.push(para);
        continue;
      }

      const found = chunker.feed(para + ' ');
      chunks.push(...found);
      const remaining = chunker.flush();
      chunks.push(...remaining);
    }

    return chunks.filter(c => c && c.trim().length > 0);
  }
}

export default SentenceChunker;
