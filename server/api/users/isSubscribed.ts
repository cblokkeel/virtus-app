import { getServerSession } from '#auth';
import { isUserSubscribed } from '~~/server/app/services/stripeService';

export default defineEventHandler(async (event): Promise<Boolean> => {
  const session = await getServerSession(event);

  if (!session || !session.user || !session.user.email) {
    throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 });
  }

  return await isUserSubscribed(session.user.email);
});
