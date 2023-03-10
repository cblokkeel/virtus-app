<template>
  <div></div>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton>
        <nuxt-img
          class="inline-block h-14 w-14 rounded-full ring-2 ring-white cursor-pointer"
          :src="imageUrl"
        ></nuxt-img>
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1" v-for="section in menuSections" :key="section">
          <MenuItem
            v-for="item in getMenuItemsInSection(section)"
            :key="item.name"
            v-slot="{ active }"
          >
            <a
              :href="item.link || ''"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm',
                item.red ? 'text-red-500' : '',
              ]"
              @click="item.action"
            >
              {{ item.label }}
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { useUserStore } from '~~/stores/userStore';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { MenuLinks } from '~~/lib/types';
import { useSubscriptionStore } from '~~/stores/subscriptionStore';

const { imageUrl } = defineProps({
  imageUrl: {
    type: String,
    required: true,
  },
});

const userStore = useUserStore();
const subscriptionStore = useSubscriptionStore();

const handleLogout = async () => {
  await userStore.logout();
};

const handleUnsubscribe = async () => {
  await subscriptionStore.unsubscribe();
};

const menuLinks: MenuLinks[] = [
  {
    name: 'options',
    label: 'Options',
    section: 1,
  },
  {
    name: 'manageSubscription',
    label: 'Modifier son abonnement',
    section: 1,
    link: '/subscribe/manage',
  },
  {
    name: 'unsubscribe',
    label: 'Se d??sabonner',
    section: 1,
    action: handleUnsubscribe,
  },
  {
    name: 'logout',
    label: 'Se d??connecter',
    section: 2,
    red: true,
    action: handleLogout,
  },
];

const menuSections = computed(() => {
  return Array.from(new Set(menuLinks.map((link) => link.section))).sort(
    (a, b) => a - b,
  );
});

const getMenuItemsInSection = (section: number) => {
  return menuLinks.filter((link) => link.section === section);
};
</script>
