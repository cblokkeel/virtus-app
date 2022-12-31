<template>
  <header class="wrapper flex items-center justify-between py-12">
    <h1 @click="navigateTo('/')">header</h1>
    <ul class="flex items-center gap-10">
      <li v-for="link in filteredNavLinks" :key="link.name">
        <a
          v-if="link.action"
          :class="link.isCta ? 'cta' : 'nav-link'"
          @click="link.action"
          >{{ link.label }}</a
        >
        <a v-else :class="link.isCta ? 'cta' : 'nav-link'" :href="link.path">{{
          link.label
        }}</a>
      </li>
      <li v-if="isUserAuthanticated">
        <UserMenu :imageUrl="userProfilePicture" />
      </li>
    </ul>
  </header>
</template>

<script setup lang="ts">
import { NavLinks } from '~~/lib/types';
import { useSubscriptionStore } from '~~/stores/subscriptionStore';
import { useUserStore } from '~~/stores/userStore';

const userStore = useUserStore();
const subscriptionStore = useSubscriptionStore();

const handleLogin = async () => {
  userStore.login();
};

const navLinks: NavLinks[] = [
  {
    name: 'price',
    label: 'Voir les prix',
    path: '/pricing',
    isCta: false,
    status: ['unauthenticated', 'unsubscribed'],
  },
  {
    name: 'login',
    label: 'Se connecter',
    path: '/login',
    isCta: false,
    status: ['unauthenticated'],
    action: handleLogin,
  },
  {
    name: 'register',
    label: "S'inscrire",
    path: '/register',
    isCta: true,
    status: ['unauthenticated'],
    action: handleLogin,
  },
  {
    name: 'subscribe',
    label: "S'abonner",
    path: '/subscribe',
    isCta: true,
    status: ['unsubscribed'],
  },
  {
    name: 'progress',
    label: 'Mes progrès',
    path: '/progress',
    isCta: false,
    status: ['subscribed'],
  },
  {
    name: 'programs',
    label: 'Mes programmes',
    path: '/programs',
    isCta: false,
    status: ['subscribed'],
  },
  {
    name: 'start_training',
    label: 'Démarrer un entraînement',
    path: '/training',
    isCta: true,
    status: ['subscribed'],
  },
];

const isUserAuthanticated = computed(() => {
  return userStore.$state.status === 'authenticated';
});

const username = computed(() => {
  return userStore.$state.infos?.name;
});

const userProfilePicture = computed(() => {
  return userStore.$state.infos?.image || '';
});

const filteredNavLinks = computed(() => {
  if (isUserAuthanticated.value) {
    return navLinks.filter((link) => {
      return subscriptionStore.$state.isSubscribed
        ? link.status.includes('subscribed')
        : link.status.includes('unsubscribed');
    });
  }

  console.log('chatte ');

  return navLinks.filter((link) => link.status.includes('unauthenticated'));
});

onMounted(async () => {
  userStore.loadUserInfos();
  subscriptionStore.loadSubscription();
});
</script>
