<template>
  <div>
    <h1>Hello</h1>
    <img :src="imageUrl" />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~~/stores/userStore';

const userStore = useUserStore();

const imageUrl = computed(() => {
  return userStore.$state.infos?.image || '';
});
</script>
