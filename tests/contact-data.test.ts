import { describe, it, expect } from 'vitest';
import { locations } from '../src/content/locations';

describe('contact data', () => {
  it('exposes both rooms for JSON-LD', () => {
    expect(locations).toHaveLength(2);
    expect(locations[0].justBookMeUrl).toContain('sahib-pointe-claire');
    expect(locations[1].justBookMeUrl).toContain('sahib-dorval');
  });
});
