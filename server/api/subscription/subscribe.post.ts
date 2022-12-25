import { getServerSession } from '#auth';
import * as zh from 'h3-zod';
import { SubscriptionSchema } from '~~/server/app/schemas/subscription.schema';
import { getSubscriptionUrl } from '~~/server/app/services/stripeService';
import { updateStripeCustomerId } from '~~/server/database/repositories/usersRepository';

export default defineEventHandler(async (event): Promise<boolean> => {
  const { priceId } = await zh.useValidatedBody(event, SubscriptionSchema);
  const session = await getServerSession(event);

  if (!session || !session.user || !session.user.email) {
    throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 });
  }

  const { email } = session.user;

  const { url, stripeCustomerId } = await getSubscriptionUrl(priceId, email);

  const user = await updateStripeCustomerId(email, stripeCustomerId);

  await sendRedirect(event, url);

  return user !== null;
});
