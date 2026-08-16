import { describe, it, expect } from 'vitest';
import menu from '../src/content/menu.json';
import pub from '../src/content/pub.json';
import { menuFileSchema } from '../src/lib/menu-schema';

describe('menu files', () => {
  it('food JSON is valid and has required sections', () => {
    const data = menuFileSchema.parse(menu);
    const ids = data.sections.map((s) => s.id);
    expect(ids).toEqual(
      expect.arrayContaining([
        'appetizers',
        'vegetarian',
        'tandoor',
        'seafood',
        'chicken',
        'lamb',
        'balti',
        'rice-bread',
        'sides',
        'desserts',
      ])
    );
    for (const section of data.sections) {
      for (const item of section.items) {
        expect(item.price).toBeGreaterThan(0);
      }
    }
  });

  it('pub JSON is valid and has signatures', () => {
    const data = menuFileSchema.parse(pub);
    expect(data.sections.some((s) => s.id === 'signatures')).toBe(true);
    const names = data.sections.flatMap((s) => s.items.map((i) => i.name.en));
    expect(names).toContain('While My Sitar Gently Weeps');
    expect(names).not.toContain('CHADONNAY');
  });
});
