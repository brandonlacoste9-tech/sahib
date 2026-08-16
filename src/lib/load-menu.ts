import { menuFileSchema, type MenuFile } from './menu-schema';
import menu from '@/content/menu.json';
import pub from '@/content/pub.json';

export function loadFood(): MenuFile {
  return menuFileSchema.parse(menu);
}

export function loadPub(): MenuFile {
  return menuFileSchema.parse(pub);
}
