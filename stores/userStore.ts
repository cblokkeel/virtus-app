import { PriceIdEnum } from '~~/lib/enums';
import { defineStore } from 'pinia';

interface UserStoreState {
  status: 'authenticated' | 'unauthenticated' | 'loading';
  infos:
    | {
        readonly email?: string | undefined | null;
        readonly name?: string | undefined | null;
        readonly image?: string | undefined | null;
      }
    | undefined;
  subscribed: boolean;
}

export const useUserStore = defineStore('users', {
  state: (): UserStoreState => ({
    status: 'loading',
    infos: {},
    subscribed: false,
  }),
  actions: {
    loadUserInfos() {
      const { status, data } = useSession();
      this.status = status.value;
      if (data.value && data.value.user) {
        this.infos = data.value.user;
        this.loadIsSubscribed();
      }
    },
    async login(provider = 'google') {
      const { signIn } = useSession();
      await signIn(provider);
    },
    async logout() {
      const { signOut } = useSession();
      await signOut();
    },
    async loadIsSubscribed() {
      this.subscribed = await $fetch('/api/users/isSubscribed');
    },
    async handleSubscription(priceId: PriceIdEnum) {
      this.subscribed = await $fetch('/api/subscription/subscribe', {
        method: 'POST',
        body: {
          id: priceId,
        },
      });
    },
    async handleUnsubscription() {
      this.subscribed = !(await $fetch('/api/subscription/unsubscribe', {
        method: 'POST',
      }));
    },
  },
});
