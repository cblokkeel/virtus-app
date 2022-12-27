import { Stripe } from 'stripe';
import subscribePost from '~~/server/api/subscription/subscribe.post';
import { getStripeCustomerId } from '~~/server/database/repositories/usersRepository';
import { hasSubscriberId } from './usersService';

const runtimeConfig = useRuntimeConfig();
// @ts-ignore
const stripe = new Stripe(runtimeConfig.private.stripeSecretKey, null);

export const getSubscriptionUrl = async (
  priceId: string,
  email: string,
): Promise<{
  url: string;
  stripeCustomerId: string;
  isNewCustomer: boolean;
}> => {
  const price = await stripe.prices.retrieve(priceId);

  const doesUserHasASubscriberId = await hasSubscriberId(email);

  console.log('doesUserHasASubscriberId', doesUserHasASubscriberId);

  const customer = doesUserHasASubscriberId
    ? await stripe.customers.retrieve((await getStripeCustomerId(email)) || '')
    : await stripe.customers.create({ email });

  console.log('customer', customer);

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: 'auto',
    customer: customer.id,
    line_items: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${runtimeConfig.public.appDomain}/subscribe/success?sessionId={CHECKOUT_SESSION_ID}`,
    cancel_url: `${runtimeConfig.public.appDomain}/subscribe/cancel`,
  });

  if (!session || !session.url) {
    throw createError({
      statusMessage: 'Could not create session',
      statusCode: 500,
    });
  }

  return {
    url: session.url,
    stripeCustomerId: customer.id,
    isNewCustomer: !doesUserHasASubscriberId,
  };
};
