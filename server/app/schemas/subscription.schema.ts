import * as z from 'zod';

export const SubscriptionSchema = z.object({
  priceId: z.string().min(1),
});
