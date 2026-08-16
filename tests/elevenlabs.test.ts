import { describe, it, expect } from 'vitest';
import { DEFAULT_SAHIB_VOICE, parseVoiceText } from '../src/lib/elevenlabs';

describe('ElevenLabs voice', () => {
  it('accepts a short Sahib line and rejects empty or huge text', () => {
    expect(parseVoiceText({ text: 'Hello, Sahib Pointe-Claire.' })).toBe(
      'Hello, Sahib Pointe-Claire.'
    );
    expect(parseVoiceText({ text: '' })).toBeNull();
    expect(parseVoiceText({ text: 'x'.repeat(501) })).toBeNull();
  });

  it('defaults to George as the host voice', () => {
    expect(DEFAULT_SAHIB_VOICE).toBe('JBFqnCBsd6RMkjVDRZzb');
  });
});
