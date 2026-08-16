import { describe, it, expect } from 'vitest';
import { speechLang } from '../src/lib/speech-input';

describe('speech input', () => {
  it('maps booking locales to Canadian / Hindi recognizers', () => {
    expect(speechLang('en')).toBe('en-CA');
    expect(speechLang('fr')).toBe('fr-CA');
    expect(speechLang('hi')).toBe('hi-IN');
  });
});
