import { z } from 'zod';

const localized = z.object({
  en: z.string().min(1),
  fr: z.string().min(1),
  hi: z.string().min(1),
});

export const tagSchema = z.enum([
  'vegan',
  'vegetarian',
  'gluten',
  'favorite',
  'spicy',
  'hot',
]);

export const menuItemSchema = z.object({
  id: z.string().min(1),
  name: localized,
  description: localized,
  price: z.number().int().positive(),
  tags: z.array(tagSchema).default([]),
  recipe: localized.optional(),
});

export const menuSectionSchema = z.object({
  id: z.string().min(1),
  title: localized,
  note: localized.optional(),
  items: z.array(menuItemSchema).min(1),
});

export const menuFileSchema = z.object({
  sections: z.array(menuSectionSchema).min(1),
});

export type MenuFile = z.infer<typeof menuFileSchema>;
export type MenuItem = z.infer<typeof menuItemSchema>;
