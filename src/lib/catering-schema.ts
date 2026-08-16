import { z } from 'zod';

export const cateringSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email(),
  phone: z.string().trim().min(7).max(30),
  guests: z.coerce.number().int().min(1).max(2000),
  occasion: z.string().trim().min(1).max(80),
  notes: z.string().trim().max(2000).optional().default(''),
  honey: z.literal(''),
});

export type CateringInput = z.infer<typeof cateringSchema>;
