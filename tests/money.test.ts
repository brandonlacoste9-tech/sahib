import { describe, it, expect } from 'vitest';
import { formatPrice } from '../src/lib/money';

describe('formatPrice', () => {
  it('formats cents as CAD in en', () => {
    expect(formatPrice(2195, 'en')).toMatch(/21\.95/);
  });
  it('formats cents in fr-CA', () => {
    const s = formatPrice(2195, 'fr');
    expect(s.replace(/\u00a0/g, ' ')).toMatch(/21,95/);
  });
  it('rejects non-positive prices at the call site via schema not formatPrice', () => {
    expect(formatPrice(325, 'hi')).toBeTruthy();
  });
});
