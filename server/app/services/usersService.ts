import { getUserByEmail } from '~~/server/database/repositories/usersRepository';

export const isUserSubscribed = async (email: string) => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw createError({ statusMessage: 'User not found', statusCode: 404 });
  }

  return user.subscribed;
};
