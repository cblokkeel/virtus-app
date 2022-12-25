import { Stripe } from 'stripe';

const runtimeConfig = useRuntimeConfig();
// @ts-ignore
const stripe = new Stripe(runtimeConfig.private.stripeSecretKey, null);

export const getSubscriptionUrl = async (
  priceId: string,
  email: string,
): Promise<{ url: string; stripeCustomerId: string }> => {
  const price = await stripe.prices.retrieve(priceId);

  const customer = await stripe.customers.create({ email });

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

  return { url: session.url, stripeCustomerId: customer.id };
};
