<template>
    <div class="">
        <Menu as="div" class="relative inline-block text-left">
            <div>
                <MenuButton class="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-4
                           font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2
                           focus-visible:ring-white focus-visible:ring-opacity-75">
                    Пользователь
                </MenuButton>
            </div>

            <transition enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0">
                <MenuItems
                    class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="px-1 py-1">
                        <MenuItem v-if="userStore.user.role === Role.CURATOR"
                         v-slot="{ active }">
                         <NuxtLink to="/curator/create-link">
                             <button :class="[
                                 active ? 'bg-violet-500 text-white' : 'text-gray-900',
                                 'group flex w-full items-center rounded-md px-2 py-2',
                             ]">
                                 Создать ссылку
                             </button>
                         </NuxtLink>
                        
                        </MenuItem>
                    </div>
                    <div class="px-1 py-1">
                        <MenuItem v-slot="{ active }">
                        <button :class="[
                            active ? 'bg-violet-500 text-white' : 'text-gray-900',
                            'group flex w-full items-center rounded-md px-2 py-2',
                        ]" @click="handleLogout">
                            Выйти
                        </button>
                        </MenuItem>
                    </div>
                </MenuItems>
            </transition>
        </Menu>
    </div>
</template>
  
<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { Role } from '~/types/types';
import { useUserStore } from '~/stores/userStore';

const userStore = useUserStore();
async function handleLogout() {
    await useApiFetch("auth/login", { method: "DELETE" });
    return navigateTo("/auth");
}
</script>
  