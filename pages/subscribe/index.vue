<template>
  <div>
    <h1>S'abonner</h1>
    <form action="/api/subscription/subscribe" method="POST">
      <input type="hidden" name="priceId" :value="getPriceId" />
      <button type="submit" title="SUBMIT" class="cta">S'abonner form</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { PriceIdEnum } from '~~/lib/enums';

const subscriptionMode = ref<'monthly' | 'yearly'>('monthly');

const getPriceId = computed((): PriceIdEnum => {
  return subscriptionMode.value === 'monthly'
    ? PriceIdEnum.MONTHLY
    : PriceIdEnum.YEARLY;
});
</script>
