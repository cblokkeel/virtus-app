import { User } from '@prisma/client';
import prisma from '~~/server/database/client';

// GET

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const getStripeCustomerId = async (
  email: string,
): Promise<string | null> => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error('User not found');
  }

  return user.stripeCustomerId;
};

// PUT

export const updateStripeCustomerId = async (
  email: string,
  customerId: string,
) => {
  return await prisma.user.update({
    where: { email },
    data: { stripeCustomerId: customerId },
  });
};

// POST

// SUBSCRIPTION

export const subscribeUser = async (email: string): Promise<User | null> => {
  return await prisma.user.update({
    where: { email },
    data: { subscribed: true },
  });
};

export const unsubscribeUser = async (email: string): Promise<User | null> => {
  return await prisma.user.update({
    where: { email },
    data: { subscribed: false },
  });
};
