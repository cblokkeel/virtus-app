import { getServerSession } from '#auth';
import * as zh from 'h3-zod';
import { SubscribeSchema } from '~~/server/app/schemas/subscription/subscribe.schema';
import { getSubscriptionUrl } from '~~/server/app/services/stripeService';
import { updateStripeCustomerId } from '~~/server/database/repositories/usersRepository';

export default defineEventHandler(async (event) => {
  const { priceId } = await zh.useValidatedBody(event, SubscribeSchema);
  const session = await getServerSession(event);

  if (!session || !session.user || !session.user.email) {
    throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 });
  }

  // TODO: check if user is already subscribed

  const { email } = session.user;

  const { url, stripeCustomerId, isNewCustomer } = await getSubscriptionUrl(
    priceId,
    email,
  );

  if (isNewCustomer) {
    await updateStripeCustomerId(email, stripeCustomerId);
  }

  return await sendRedirect(event, url);
});
