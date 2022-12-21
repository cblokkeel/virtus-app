import { User } from '@prisma/client';
import prisma from '~~/server/database/client';

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

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
