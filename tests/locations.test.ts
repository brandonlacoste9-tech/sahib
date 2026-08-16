import { describe, it, expect } from 'vitest';
import { locations } from '../src/content/locations';

describe('locations', () => {
  it('has pointe-claire and dorval with three actions', () => {
    expect(locations.map((l) => l.id)).toEqual(['pointe-claire', 'dorval']);
    for (const loc of locations) {
      expect(loc.reserveUrl.startsWith('http')).toBe(true);
      expect(loc.orderUrl.startsWith('http')).toBe(true);
      expect(loc.justBookMeUrl).toContain('justbookme.ca/book/sahib-');
      expect(loc.phone).toMatch(/^514/);
    }
  });
});
