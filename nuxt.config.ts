// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@sidebase/nuxt-auth',
    '@nuxt/image-edge',
  ],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Baloo+Thambi+2:wght@400;500;600;700;800&display=swap',
        },
      ],
    },
  },
  auth: {
    isEnabled: true,
    origin: process.env.APP_DOMAIN,
    basePath: process.env.NUXT_AUTH_BASE_PATH,
    enableSessionRefreshPeriodically: false,
    enableSessionRefreshOnWindowFocus: true,
    enableGlobalAppMiddleware: false,
  },
  runtimeConfig: {
    public: {
      appDomain: process.env.APP_DOMAIN,
    },
    secret: {
      stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    },
  },
});
