import { describe, it, expect } from 'vitest';
import { routing } from '../src/i18n/routing';

describe('routing', () => {
  it('exposes en, fr, hi', () => {
    expect(routing.locales).toEqual(['en', 'fr', 'hi']);
    expect(routing.defaultLocale).toBe('en');
  });
});
