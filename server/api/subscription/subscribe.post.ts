import { getServerSession } from '#auth';
import { newSubscription } from '~~/server/app/services/subscriptionService';

export default defineEventHandler(async (event): Promise<boolean> => {
  const session = await getServerSession(event);

  if (!session || !session.user || !session.user.email) {
    throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 });
  }

  const { email } = session.user;

  const user = await newSubscription(email);

  return user !== null;
});
