import { NuxtAuthHandler } from '#auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '~~/server/database/client';

export default NuxtAuthHandler({
  secret: process.env.NUXT_SECRET,
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/',
  },
  providers: [
    // @ts-ignore
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
});
