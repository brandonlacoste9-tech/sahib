import type { MenuItem } from '@/lib/menu-schema';
import type { Locale } from '@/i18n/routing';

export const tagLabels: Record<Locale, Record<MenuItem['tags'][number], string>> = {
  en: {
    vegan: 'Vegan',
    vegetarian: 'Vegetarian',
    gluten: 'Contains gluten',
    favorite: 'Favourite',
    spicy: 'Spicy',
    hot: 'Hot',
  },
  fr: {
    vegan: 'Végane',
    vegetarian: 'Végétarien',
    gluten: 'Contient du gluten',
    favorite: 'Coup de cœur',
    spicy: 'Épicé',
    hot: 'Très piquant',
  },
  hi: {
    vegan: 'वीगन',
    vegetarian: 'शाकाहारी',
    gluten: 'ग्लूटेन है',
    favorite: 'पसंदीदा',
    spicy: 'तीखा',
    hot: 'बहुत तीखा',
  },
};

const tagOrder: MenuItem['tags'][number][] = [
  'vegetarian',
  'vegan',
  'gluten',
  'spicy',
  'hot',
  'favorite',
];

export function visibleTags(tags: MenuItem['tags']): MenuItem['tags'][number][] {
  const vegan = tags.includes('vegan');
  return tagOrder.filter((tag) => {
    if (!tags.includes(tag)) return false;
    if (tag === 'vegetarian' && vegan) return false;
    return true;
  });
}
