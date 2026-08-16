import { cateringSchema } from './catering-schema';

export function parseCatering(input: unknown) {
  return cateringSchema.safeParse(input);
}
