import { getServerSession } from '#auth';
import { getPortalUrl } from '~~/server/app/services/stripeService';

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);

  if (!session || !session.user || !session.user.email) {
    throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 });
  }

  // TODO: check if user is already subscribed

  const portalSessionUrl = await getPortalUrl(session.user.email);

  return await sendRedirect(event, portalSessionUrl);
});
