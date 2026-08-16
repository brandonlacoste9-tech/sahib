import { describe, it, expect } from 'vitest';
import { parseCatering } from '../src/lib/handle-catering';

describe('parseCatering', () => {
  it('rejects missing first name', () => {
    expect(
      parseCatering({
        firstName: '',
        lastName: 'K',
        email: 'a@b.com',
        phone: '5144261121',
        guests: 10,
        occasion: 'wedding',
        notes: '',
        honey: '',
      }).success
    ).toBe(false);
  });
});
