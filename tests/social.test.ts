import { describe, it, expect } from 'vitest';
import { socialLinks } from '../src/content/social';

describe('social links', () => {
  it('exposes Instagram, Facebook, and LinkedIn from the live brand', () => {
    const map = Object.fromEntries(socialLinks.map((item) => [item.id, item.href]));
    expect(Object.keys(map)).toEqual(['instagram', 'facebook', 'linkedin']);
    expect(map.instagram).toBe('https://www.instagram.com/restaurantsahib/');
    expect(map.facebook).toBe('https://www.facebook.com/restaurantsahib');
    expect(map.linkedin).toBe('https://www.linkedin.com/company/restaurant-sahib/');
  });
});
