import { describe, it, expect } from 'vitest';
import { menuItemSchema, menuFileSchema } from '../src/lib/menu-schema';

describe('menuItemSchema', () => {
  it('requires en/fr/hi descriptions and price > 0', () => {
    const bad = {
      id: 'x',
      name: { en: 'X', fr: 'X', hi: 'एक्स' },
      description: { en: 'd', fr: 'd' },
      price: 0,
      tags: [],
    };
    expect(menuItemSchema.safeParse(bad).success).toBe(false);
  });

  it('accepts a valid item', () => {
    const ok = {
      id: 'butter-chicken',
      name: { en: 'Butter Chicken', fr: 'Poulet au beurre', hi: 'बटर चिकन' },
      description: {
        en: 'In a creamy tomato sauce.',
        fr: 'Dans une sauce tomate crémeuse.',
        hi: 'मलाईदार टमाटर की सॉस में।',
      },
      price: 2195,
      tags: ['favorite'],
    };
    expect(menuItemSchema.parse(ok).id).toBe('butter-chicken');
  });

  it('rejects an empty section list', () => {
    expect(menuFileSchema.safeParse({ sections: [] }).success).toBe(false);
  });
});
