import { getUserByEmail } from '~~/server/database/repositories/usersRepository';

export const isUserSubscribed = async (email: string) => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw createError({ statusMessage: 'User not found', statusCode: 404 });
  }

  return user.subscribed;
};

export const hasSubscriberId = async (email: string): Promise<boolean> => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw createError({ statusMessage: 'User not found', statusCode: 404 });
  }

  if (!user.stripeCustomerId || user.stripeCustomerId === '') {
    return false;
  }

  return true;
};
