import { describe, it, expect } from 'vitest';
import { getLocationByBookSlug } from '../src/content/locations';
import { dinnerSlots, parseJustBookMe } from '../src/lib/justbookme-schema';

describe('JustBookMe requests', () => {
  it('resolves both Sahib slugs', () => {
    expect(getLocationByBookSlug('sahib-pointe-claire')?.id).toBe('pointe-claire');
    expect(getLocationByBookSlug('sahib-dorval')?.id).toBe('dorval');
    expect(getLocationByBookSlug('missing')).toBeNull();
  });

  it('accepts a Wednesday dinner at Pointe-Claire', () => {
    const parsed = parseJustBookMe({
      slug: 'sahib-pointe-claire',
      name: 'Asha Patel',
      phone: '514-426-1121',
      email: 'asha@example.com',
      guests: 4,
      date: '2026-08-19',
      time: '19:00',
      notes: 'Window if possible',
      honey: '',
    });
    expect(parsed.success).toBe(true);
  });

  it('rejects Monday at Pointe-Claire', () => {
    const parsed = parseJustBookMe({
      slug: 'sahib-pointe-claire',
      name: 'Asha Patel',
      phone: '514-426-1121',
      email: '',
      guests: 2,
      date: '2026-08-17',
      time: '19:00',
      notes: '',
      honey: '',
    });
    expect(parsed.success).toBe(false);
  });

  it('lists dinner slots from 11:30 to 21:30', () => {
    const slots = dinnerSlots();
    expect(slots[0]).toBe('11:30');
    expect(slots.at(-1)).toBe('21:30');
    expect(slots).toContain('19:00');
  });
});
