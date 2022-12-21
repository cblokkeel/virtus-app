import { User } from '@prisma/client';
import {
  subscribeUser,
  unsubscribeUser,
} from './../../database/repositories/usersRepository';
import { isUserSubscribed } from './usersService';

export const newSubscription = async (email: string): Promise<User | null> => {
  const isSubscribed = await isUserSubscribed(email);

  if (isSubscribed) {
    throw createError({
      statusMessage: 'User already subscribed',
      statusCode: 400,
    });
  }

  return await subscribeUser(email);
};

export const cancelSubscription = async (
  email: string,
): Promise<User | null> => {
  const isSubscribed = await isUserSubscribed(email);

  if (!isSubscribed) {
    throw createError({
      statusMessage: "User wasn't subscribed",
      statusCode: 400,
    });
  }

  return await unsubscribeUser(email);
};
