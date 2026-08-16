import { describe, it, expect } from 'vitest';
import { tagLabels, visibleTags } from '../src/lib/menu-tags';

describe('diet marks', () => {
  it('hides vegetarian when a dish is already vegan', () => {
    expect(visibleTags(['vegan', 'vegetarian', 'spicy'])).toEqual([
      'vegan',
      'spicy',
    ]);
  });

  it('keeps vegetarian when the dish is not vegan', () => {
    expect(visibleTags(['vegetarian', 'gluten'])).toEqual([
      'vegetarian',
      'gluten',
    ]);
  });

  it('names gluten as contains, not gluten-free', () => {
    expect(tagLabels.en.gluten).toMatch(/contains/i);
    expect(tagLabels.fr.gluten).toMatch(/contient/i);
  });
});
