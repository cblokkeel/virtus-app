<template>
  <div>
    <h1>S'abonner</h1>
    <button @click="handleSubscription">test</button>
    <form action="/api/subscription/subscribe" method="POST">
      <input type="hidden" name="priceId" :value="getPriceId">
      <button type="submit" title="SUBMIT" class="cta">S'abonner form</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { PriceIdEnum } from '~~/lib/enums';
import { useUserStore } from '~~/stores/userStore';

const userStore = useUserStore();

const subscriptionMode = ref<'monthly' | 'yearly'>('monthly');

const isUserSubscribed = computed(() => {
  return userStore.$state.subscribed || false;
});

const handleSubscription = async () => {
  await useFetch('/api/subscription/subscribe', {
    method: 'POST',
    body: JSON.stringify({
      priceId: getPriceId.value,
    }),
  });
}

const getPriceId = computed((): PriceIdEnum => {
  return subscriptionMode.value === 'monthly'
    ? PriceIdEnum.MONTHLY
    : PriceIdEnum.YEARLY;
})
</script>
