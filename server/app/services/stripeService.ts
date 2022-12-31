import { getStripeCustomerId } from '~~/server/database/repositories/usersRepository';
import { stripe } from '~~/server/utils/stripe';
import { hasSubscriberId } from './usersService';

const runtimeConfig = useRuntimeConfig();

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

  const customer = doesUserHasASubscriberId
    ? await stripe.customers.retrieve((await getStripeCustomerId(email)) || '')
    : await stripe.customers.create({ email });

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
    success_url: `${runtimeConfig.public.appDomain}/subscribe/`,
    cancel_url: runtimeConfig.public.appDomain,
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

export const getPortalUrl = async (email: string): Promise<string> => {
  const customerId = await getStripeCustomerId(email);

  if (!customerId || !(await isUserSubscribed(email))) {
    throw createError({
      statusMessage: 'User not subscribed',
      statusCode: 400,
    });
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${runtimeConfig.public.appDomain}/subscribe/manage`,
  });

  if (!portalSession || !portalSession.url) {
    throw createError({
      statusMessage: 'Could not create portal session',
      statusCode: 500,
    });
  }

  return portalSession.url;
};

export const isUserSubscribed = async (email: string): Promise<Boolean> => {
  const customerId = await getStripeCustomerId(email);

  if (!customerId) {
    return false;
  }

  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'active',
  });

  return subscriptions.data.length > 0;
};

export const cancelSubscription = async (email: string): Promise<Boolean> => {
  const customerId = await getStripeCustomerId(email);

  if (!customerId) {
    throw createError({
      statusMessage: 'User not subscribed',
      statusCode: 400,
    });
  }

  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'active',
  });

  if (subscriptions.data.length === 0) {
    throw createError({
      statusMessage: 'User not subscribed',
      statusCode: 400,
    });
  }

  const result = await stripe.subscriptions.del(subscriptions.data[0].id);

  return result.status === 'canceled';
};
