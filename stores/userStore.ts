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
}

export const useUserStore = defineStore('users', {
  state: (): UserStoreState => ({
    status: 'loading',
    infos: {},
  }),
  actions: {
    loadUserInfos() {
      const { status, data } = useSession();
      this.status = status.value;
      if (data.value && data.value.user) {
        this.infos = data.value.user;
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
  },
});
