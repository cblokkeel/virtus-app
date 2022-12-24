<template>
  <div>
    <h1>S'abonner</h1>
    <button v-if="!isUserSubscribed" class="cta" @click="handleSubscribe">
      S'abonner ma gueule
    </button>
    <p v-else>Vous êtes déjà abonné</p>
  </div>
</template>

<script setup lang="ts">
import { PriceIdEnum } from '~~/lib/enums';
import { useUserStore } from '~~/stores/userStore';

const userStore = useUserStore();

const handleSubscribe = async () => {
  await userStore.handleSubscription(PriceIdEnum.MONTHLY);
};

const isUserSubscribed = computed(() => {
  return userStore.$state.subscribed || false;
});
</script>
