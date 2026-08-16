import { describe, it, expect } from 'vitest';
import { cateringSchema } from '../src/lib/catering-schema';

describe('cateringSchema', () => {
  it('rejects invalid email', () => {
    const r = cateringSchema.safeParse({
      firstName: 'A',
      lastName: 'B',
      email: 'nope',
      phone: '5144261121',
      guests: 20,
      occasion: 'wedding',
      notes: '',
      honey: '',
    });
    expect(r.success).toBe(false);
  });

  it('accepts a valid payload and flags bots via honey', () => {
    const ok = cateringSchema.parse({
      firstName: 'Raj',
      lastName: 'K',
      email: 'raj@example.com',
      phone: '514-426-1121',
      guests: 40,
      occasion: 'corporate',
      notes: 'Buffet',
      honey: '',
    });
    expect(ok.email).toBe('raj@example.com');
    expect(
      cateringSchema.safeParse({ ...ok, honey: 'spam' }).success
    ).toBe(false);
  });
});
