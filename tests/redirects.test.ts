import { describe, it, expect } from 'vitest';
import { legacyRedirects } from '../src/lib/redirects';

describe('legacyRedirects', () => {
  it('maps Wix slugs to /en pages', () => {
    const map = Object.fromEntries(legacyRedirects.map((r) => [r.source, r.destination]));
    expect(map['/restaurant-pub-menu']).toBe('/en/pub');
    expect(map['/copy-of-contact-us-pointe-claire']).toBe('/en/contact#dorval');
    expect(map['/contact-us']).toBe('/en/contact#pointe-claire');
    expect(map['/menu']).toBeUndefined();
  });
});
