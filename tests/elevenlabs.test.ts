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

  it('defaults to Pierre, a French-Canadian English host', () => {
    expect(DEFAULT_SAHIB_VOICE).toBe('SLhJQg3VdZI7WdEazpYM');
    expect(FALLBACK_PREMADE_VOICE).toBe('JBFqnCBsd6RMkjVDRZzb');
  });
});
