<template>
  <div></div>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton>
        <img
          class="inline-block h-14 w-14 rounded-full ring-2 ring-white cursor-pointer"
          :src="imageUrl"
          alt="User profile picture"
        />
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

const { imageUrl } = defineProps({
  imageUrl: {
    type: String,
    required: true,
  },
});

const userStore = useUserStore();

const handleLogout = async () => {
  await userStore.logout();
};

const handleUnsubscribe = async () => {
  await userStore.handleUnsubscription();
};

const menuLinks: MenuLinks[] = [
  {
    name: 'options',
    label: 'Options',
    section: 1,
  },
  {
    name: 'unsubscribe',
    label: 'Se désabonner',
    section: 1,
    action: handleUnsubscribe,
  },
  {
    name: 'logout',
    label: 'Se déconnecter',
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
