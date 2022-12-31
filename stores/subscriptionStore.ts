import { defineStore } from 'pinia';

interface SubscriptionStoreState {
  isSubscribed: boolean | undefined;
}

export const useSubscriptionStore = defineStore('subscription', {
  state: (): SubscriptionStoreState => ({
    isSubscribed: undefined,
  }),
  actions: {
    async loadSubscription() {
      if (this.isSubscribed !== undefined) return;
      this.isSubscribed = await $fetch('/api/users/isSubscribed');
    },
    async unsubscribe() {
      const result = await $fetch('/api/subscription/unsubscribe', {
        method: 'POST',
      });
      this.isSubscribed = !result;
    },
  },
});
