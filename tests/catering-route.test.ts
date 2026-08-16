import { describe, it, expect } from 'vitest';
import {
  cateringSendResult,
  parseCatering,
} from '../src/lib/handle-catering';

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

describe('cateringSendResult', () => {
  it('treats Resend error payload as failure', () => {
    const r = cateringSendResult({
      data: null,
      error: { message: 'Invalid API key' },
    });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.message).toBe('Invalid API key');
  });

  it('treats successful send as ok', () => {
    expect(cateringSendResult({ data: { id: 're_123' }, error: null }).ok).toBe(
      true,
    );
  });
});
