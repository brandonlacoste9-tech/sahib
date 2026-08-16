import { describe, it, expect } from 'vitest';
import { rewriteLegacyPath } from '../src/lib/legacy-path';
import { legacyRedirects } from '../src/lib/redirects';

describe('legacyRedirects', () => {
  it('maps Wix slugs to /en pages', () => {
    const map = Object.fromEntries(legacyRedirects.map((r) => [r.source, r.destination]));
    expect(map['/restaurant-pub-menu']).toBe('/en/pub');
    expect(map['/copy-of-contact-us-pointe-claire']).toBe('/en/contact#dorval');
    expect(map['/contact-us']).toBe('/en/contact#pointe-claire');
    expect(map['/blog']).toBe('/en/blog');
    expect(map['/post/:slug']).toBe('/en/blog/:slug');
    expect(map['/:locale(en|fr|hi)/post/:slug']).toBe('/:locale/blog/:slug');
    expect(map['/menu']).toBeUndefined();
  });

  it('rewrites Wix /post slugs before next-intl prefixes them', () => {
    expect(
      rewriteLegacyPath(
        '/post/what-is-balti-cooking-the-birmingham-curry-tradition-behind-sahib-s-balti-pot-dishes'
      )
    ).toBe(
      '/en/blog/what-is-balti-cooking-the-birmingham-curry-tradition-behind-sahib-s-balti-pot-dishes'
    );
    expect(
      rewriteLegacyPath(
        '/fr/post/indian-catering-for-montreal-events-what-to-know-before-you-book'
      )
    ).toBe(
      '/fr/blog/indian-catering-for-montreal-events-what-to-know-before-you-book'
    );
    expect(rewriteLegacyPath('/en/blog')).toBeNull();
  });
});
