import { z } from 'zod';
import { getLocationByBookSlug } from '@/content/locations';

export const justBookMeSchema = z
  .object({
    slug: z.string().trim().min(1),
    name: z.string().trim().min(1).max(80),
    phone: z.string().trim().min(7).max(30),
    email: z.string().trim().email().optional().or(z.literal('')),
    guests: z.coerce.number().int().min(1).max(20),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    time: z.string().regex(/^\d{2}:\d{2}$/),
    notes: z.string().trim().max(2000).optional().default(''),
    honey: z.literal(''),
  })
  .superRefine((value, ctx) => {
    const loc = getLocationByBookSlug(value.slug);
    if (!loc) {
      ctx.addIssue({ code: 'custom', path: ['slug'], message: 'Unknown location' });
      return;
    }
    const [y, m, d] = value.date.split('-').map(Number);
    const day = new Date(y, m - 1, d).getDay();
    if (loc.closedWeekdays.includes(day)) {
      ctx.addIssue({
        code: 'custom',
        path: ['date'],
        message: 'Closed that day',
      });
    }
    const [hour, minute] = value.time.split(':').map(Number);
    const minutes = hour * 60 + minute;
    if (minutes < 11 * 60 + 30 || minutes > 21 * 60 + 30) {
      ctx.addIssue({
        code: 'custom',
        path: ['time'],
        message: 'Outside serving hours',
      });
    }
  });

export type JustBookMeInput = z.infer<typeof justBookMeSchema>;

export function parseJustBookMe(input: unknown) {
  return justBookMeSchema.safeParse(input);
}

export function dinnerSlots() {
  const slots: string[] = [];
  for (let minutes = 11 * 60 + 30; minutes <= 21 * 60 + 30; minutes += 30) {
    const h = String(Math.floor(minutes / 60)).padStart(2, '0');
    const m = String(minutes % 60).padStart(2, '0');
    slots.push(`${h}:${m}`);
  }
  return slots;
}
