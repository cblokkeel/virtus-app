import { getServerSession } from '#auth';
import { isUserSubscribed } from '~~/server/app/services/usersService';

export default defineEventHandler(async (event): Promise<boolean> => {
  const session = await getServerSession(event);

  if (!session) {
    throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 });
  }

  if (!session.user || !session.user.email) {
    throw createError({
      statusMessage: 'Missing user information in session',
      statusCode: 403,
    });
  }

  return await isUserSubscribed(session.user.email);
});
