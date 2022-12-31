import Stripe from 'stripe';

const runtimeConfig = useRuntimeConfig();

const stripe = new Stripe(runtimeConfig.private.stripeSecretKey, {
  apiVersion: '2022-11-15',
});

export { stripe };
