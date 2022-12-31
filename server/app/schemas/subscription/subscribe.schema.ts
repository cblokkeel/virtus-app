import * as z from 'zod';

export const SubscribeSchema = z.object({
  priceId: z.string().min(1),
});
