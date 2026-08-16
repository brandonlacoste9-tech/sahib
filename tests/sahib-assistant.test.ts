import { describe, it, expect } from 'vitest';
import {
  applyTurn,
  openingLine,
  parseDate,
  parseGuests,
  parseTime,
} from '../src/lib/sahib-assistant';

describe('fake Sahib receptionist', () => {
  it('greets with the room name', () => {
    expect(openingLine('Pointe-Claire', 'en')).toMatch(/Pointe-Claire/);
    expect(openingLine('Dorval', 'fr')).toMatch(/Dorval/);
  });

  it('parses party size, evening time, and Friday', () => {
    expect(parseGuests('table for 4')).toBe(4);
    expect(parseTime('7pm')).toBe('19:00');
    const friday = parseDate('friday', [1, 2], new Date(2026, 7, 16), 'en');
    expect(friday).toBe('2026-08-21');
  });

  it('walks a full booking to confirm', () => {
    let step: ReturnType<typeof applyTurn>['step'] = 'guests';
    let draft = {};
    const closed = [1, 2];
    const turns = ['4', '2026-08-21', '19:00', 'Asha Patel', '514-555-0199'];
    for (const line of turns) {
      const next = applyTurn(step, line, draft, closed, 'en');
      step = next.step;
      draft = next.draft;
    }
    expect(step).toBe('confirm');
    expect(draft).toMatchObject({
      guests: 4,
      date: '2026-08-21',
      time: '19:00',
      name: 'Asha Patel',
    });
    const yes = applyTurn(step, 'yes', draft, closed, 'en');
    expect(yes.step).toBe('done');
  });
});
