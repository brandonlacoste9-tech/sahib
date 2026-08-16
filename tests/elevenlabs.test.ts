import { describe, it, expect } from 'vitest';
import {
  DEFAULT_SAHIB_VOICE,
  FALLBACK_PREMADE_VOICE,
  GEORGE_VOICE,
  PIERRE_VOICE,
  THIERRY_VOICE,
  parseVoiceRequest,
  voiceIdForLocale,
} from '../src/lib/elevenlabs';

describe('ElevenLabs voice', () => {
  it('accepts a short Sahib line and rejects empty or huge text', () => {
    expect(parseVoiceRequest({ text: 'Hello, Sahib Pointe-Claire.' })?.text).toBe(
      'Hello, Sahib Pointe-Claire.'
    );
    expect(parseVoiceRequest({ text: '' })).toBeNull();
    expect(parseVoiceRequest({ text: 'x'.repeat(501) })).toBeNull();
  });

  it('uses George for every locale until the plan allows library voices', () => {
    expect(DEFAULT_SAHIB_VOICE).toBe(GEORGE_VOICE);
    expect(voiceIdForLocale('en')).toBe(GEORGE_VOICE);
    expect(voiceIdForLocale('fr')).toBe(GEORGE_VOICE);
    expect(voiceIdForLocale('hi')).toBe(GEORGE_VOICE);
    expect(FALLBACK_PREMADE_VOICE).toBe(GEORGE_VOICE);
    expect(PIERRE_VOICE).toBe('SLhJQg3VdZI7WdEazpYM');
    expect(THIERRY_VOICE).toBe('mVjOqyqTPfwlXPjV5sjX');
    expect(
      parseVoiceRequest({ text: 'Bonjour', locale: 'fr' })?.locale
    ).toBe('fr');
  });
});
