/**
 * Speech Text Normalizer for Aria Voice Assistant
 * Preprocesses text specifically for Text-To-Speech (TTS):
 * - Strips markdown, emojis, HTML, brackets, and raw URLs.
 * - Converts currencies, percentages, and units into natural spoken words.
 * - Expands tech acronyms (ANC, TWS, GaN, dB, GB) for smooth pronunciation.
 * - Preserves natural conversational Hinglish flow without altering the visible UI text.
 */

// Common tech & e-commerce pronunciation mappings
const ACRONYMS_AND_BRANDS = [
  { regex: /\bboAt\b/g, replacement: 'Boat' },
  { regex: /\bANC\b/g, replacement: 'A-N-C' },
  { regex: /\bTWS\b/g, replacement: 'T-W-S' },
  { regex: /\bGaN\b/g, replacement: 'Gallium Nitride' },
  { regex: /\bENx\b/g, replacement: 'E-N-X' },
  { regex: /\bIPX([0-9]+)\b/gi, replacement: 'I-P-X $1' },
  { regex: /\b5G\b/gi, replacement: '5-G' },
  { regex: /\b4G\b/gi, replacement: '4-G' },
  { regex: /\bvs\.?\b/gi, replacement: 'versus' },
  { regex: /\be\.g\.,?\b/gi, replacement: 'for example,' },
  { regex: /\bi\.e\.,?\b/gi, replacement: 'that is,' },
  { regex: /\bapprox\.?\b/gi, replacement: 'approximately' },
  { regex: /\bmin\b/gi, replacement: 'minutes' },
  { regex: /\bhrs?\b/gi, replacement: 'hours' },
  { regex: /\bEMI\b/g, replacement: 'E-M-I' },
  { regex: /\bEMIs\b/g, replacement: 'E-M-Is' }
];

export function normalizeTextForSpeech(rawText) {
  if (!rawText || typeof rawText !== 'string') return '';

  let text = rawText;

  // 1. Remove Markdown & Code Syntax
  text = text
    .replace(/```[\s\S]*?```/g, ' ')               // Multi-line code blocks
    .replace(/`([^`]+)`/g, '$1')                   // Inline code backticks
    .replace(/#{1,6}\s+/g, '')                     // Markdown headings #, ##, etc.
    .replace(/\*\*([^*]+)\*\*/g, '$1')             // Bold **text**
    .replace(/\*([^*]+)\*/g, '$1')                 // Italic *text*
    .replace(/__([^_]+)__/g, '$1')                 // Underline __text__
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')     // Markdown links [title](url) -> title
    .replace(/^[-*+]\s+/gm, '')                    // Bullet lists
    .replace(/^\d+\.\s+/gm, '')                    // Numbered lists
    .replace(/&mdash;|&ndash;|—/g, ', ')           // Dashes to natural pause commas
    .replace(/&amp;/g, 'and');

  // 2. Remove URLs & Web Cruft
  text = text.replace(/https?:\/\/\S+/gi, ' ');    // Never read raw URLs out loud

  // 3. Remove Emojis & Strange Symbols
  text = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/gu, ' ');

  // 4. Currency Conversions
  // e.g. ₹1,299 or Rs. 1,299 -> "1,299 rupees"
  text = text.replace(/(?:₹|Rs\.?\s*)([0-9]+(?:,[0-9]+)*)/gi, (match, amount) => {
    const cleanNum = amount.replace(/,/g, '');
    return `${cleanNum} rupees`;
  });

  // e.g. $50 -> "50 dollars"
  text = text.replace(/\$([0-9]+(?:,[0-9]+)*)/g, (match, amount) => {
    const cleanNum = amount.replace(/,/g, '');
    return `${cleanNum} dollars`;
  });

  // 5. Percentages
  // e.g. ±10% -> "plus minus 10 percent"
  text = text.replace(/±\s*([0-9]+(?:\.[0-9]+)?)\s*%/g, 'plus minus $1 percent');
  // e.g. -8% -> "minus 8 percent"
  text = text.replace(/-\s*([0-9]+(?:\.[0-9]+)?)\s*%/g, 'minus $1 percent');
  // e.g. 71% -> "71 percent"
  text = text.replace(/([0-9]+(?:\.[0-9]+)?)\s*%/g, '$1 percent');

  // 6. Fast Charging & Duration Formulae
  // e.g. (10m = 100m) -> "10 minute charge gives 100 minutes playtime"
  text = text.replace(/\(?([0-9]+)\s*m\s*=\s*([0-9]+)\s*m\)?/gi, '$1 minute charge gives $2 minutes playtime');

  // 7. Tech Units
  // e.g. 32dB -> "32 decibels"
  text = text.replace(/([0-9]+)\s*dB\b/gi, '$1 decibels');
  // e.g. 42H or 70H -> "42 hours" / "70 hours"
  text = text.replace(/([0-9]+)\s*H\b/gi, '$1 hours');
  // e.g. 65W -> "65 watt"
  text = text.replace(/([0-9]+)\s*W\b/gi, '$1 watt');
  // e.g. 5000mAh -> "5000 milliamp hours"
  text = text.replace(/([0-9]+)\s*mAh\b/gi, '$1 milliamp hours');
  // e.g. 16GB, 512GB, 1TB -> "16 gigabytes", "1 terabyte"
  text = text.replace(/([0-9]+)\s*GB\b/gi, '$1 gigabytes');
  text = text.replace(/([0-9]+)\s*TB\b/gi, '$1 terabytes');
  text = text.replace(/([0-9]+)\s*mm\b/gi, '$1 millimeter');

  // 8. Expand Tech Acronyms & Brands
  for (const item of ACRONYMS_AND_BRANDS) {
    text = text.replace(item.regex, item.replacement);
  }

  // 9. Natural Symbols
  text = text.replace(/\s*\+\s*/g, ' plus ');
  text = text.replace(/\s*\/\s*/g, ' or ');

  // 10. Natural English Micro-Pause & Connector Polish
  // Adds natural conversational breath pauses before transition words
  const ENGLISH_CONNECTORS = [
    'as well as',
    'in addition',
    'furthermore',
    'however',
    'such as',
    'specifically',
    'for instance'
  ];
  for (const conn of ENGLISH_CONNECTORS) {
    const regex = new RegExp(`(?<=[a-zA-Z0-9])\\s+(${conn})\\b`, 'gi');
    text = text.replace(regex, ', $1');
  }

  // 12. Clean up Whitespace and Punctuation for Speech
  text = text
    .replace(/[()[\]{}]/g, ' ')                     // Remove leftover brackets
    .replace(/\s*([,.;?!])\s*/g, '$1 ')             // Ensure clean spacing around punctuation
    .replace(/\s+/g, ' ')                          // Collapse multiple spaces
    .replace(/\.{2,}/g, '.')                       // Collapse multiple periods
    .trim();

  return text;
}

export default normalizeTextForSpeech;
