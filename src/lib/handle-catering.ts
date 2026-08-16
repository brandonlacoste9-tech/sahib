import { cateringSchema } from './catering-schema';

export function parseCatering(input: unknown) {
  return cateringSchema.safeParse(input);
}

/** Map Resend `{ data, error }` to success/failure without throwing. */
export function cateringSendResult(resendResponse: {
  data?: unknown;
  error?: { message?: string } | null;
}): { ok: true } | { ok: false; message: string } {
  if (resendResponse.error) {
    return {
      ok: false,
      message: resendResponse.error.message ?? 'Send failed',
    };
  }
  return { ok: true };
}
