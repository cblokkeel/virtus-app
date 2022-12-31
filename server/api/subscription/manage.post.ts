import { getServerSession } from '#auth';
import {
  getPortalUrl,
  isUserSubscribed,
} from '~~/server/app/services/stripeService';

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);

  if (!session || !session.user || !session.user.email) {
    throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 });
  }

  if (!(await isUserSubscribed(session.user.email))) {
    throw createError({
      statusMessage: 'User not subscribed',
      statusCode: 400,
    });
  }

  const portalSessionUrl = await getPortalUrl(session.user.email);

  return await sendRedirect(event, portalSessionUrl);
});
