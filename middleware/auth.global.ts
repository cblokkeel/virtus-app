import { RoutesEnum } from './../lib/routes';

const ALLOWED: RoutesEnum[] = [RoutesEnum.ROOT, RoutesEnum.PRICING];

const FALLBACK_ROUTE: RoutesEnum = RoutesEnum.ROOT;

export default defineNuxtRouteMiddleware((to, from) => {
  if (ALLOWED.map((route) => route as string).includes(to.path)) {
    return;
  }

  const session = useSession();

  if (!session || session.status.value !== 'authenticated') {
    return navigateTo(FALLBACK_ROUTE);
  }
});
