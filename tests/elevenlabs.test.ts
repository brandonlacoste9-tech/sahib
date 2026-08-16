import { describe, it, expect } from 'vitest';
import {
  DEFAULT_SAHIB_VOICE,
  FALLBACK_PREMADE_VOICE,
  parseVoiceText,
} from '../src/lib/elevenlabs';

describe('ElevenLabs voice', () => {
  it('accepts a short Sahib line and rejects empty or huge text', () => {
    expect(parseVoiceText({ text: 'Hello, Sahib Pointe-Claire.' })).toBe(
      'Hello, Sahib Pointe-Claire.'
    );
    expect(parseVoiceText({ text: '' })).toBeNull();
    expect(parseVoiceText({ text: 'x'.repeat(501) })).toBeNull();
  });

  it('defaults to Ravi, a warm Indian English host', () => {
    expect(DEFAULT_SAHIB_VOICE).toBe('8oCRqOcDUgRwXV5F71Ea');
    expect(FALLBACK_PREMADE_VOICE).toBe('JBFqnCBsd6RMkjVDRZzb');
  });
});
