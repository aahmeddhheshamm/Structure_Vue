<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
</script>

<template>
  <Menu as="div">
    <MenuButton class="relative" id="headlessui-menu-button-current-user">
      <img
          src="@/assets/images/user-logo.jpeg"
          alt="user-profile-image"
          class="w-[35px] h-[35px] object-cover rounded-[0.475rem] bg-[#E6E7E8]"
      />
      <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
      >
        <MenuItems class="headlessui-menu-body !w-[300px]">
          <MenuItem class="headlessui-menu-item border-b border-black/60">
            <div class="flex items-start gap-4">
              <img
                  src="@/assets/images/user-logo.jpeg"
                  alt="user-profile-picture"
                  class="w-[50px] h-[50px] object-cover rounded-[0.475rem] bg-[#E6E7E8]"
              />
              <div class="flex flex-1 flex-col justify-start gap-2 max-w-full overflow-hidden">
                <h3
                    class="text-start font-bold border-black/60 text-sm text-nowrap overflow-hidden overflow-ellipsis"
                >
                  Ahmed Hesham
                </h3>
                <h5
                    class=" text-start font-medium text-xs text-nowrap overflow-hidden overflow-ellipsis"
                >
                  aahmeddhheshamm@gmail.com
                </h5>
                <h5
                    class=" text-start font-medium text-xs text-nowrap overflow-hidden overflow-ellipsis"
                >
                  01064194473
                </h5>
              </div>
            </div>
          </MenuItem>
          <MenuItem class="headlessui-menu-item" v-slot="{ active, close }">
            <div class="text-start">
              <div>
                <router-link :to="{ name: '' }">
                  <div
                      @click="close"
                      class="text-start block mt-1 font-medium text-sm"
                      :class="{
                      '!text-primary-600': active
                    }"
                  >
                    {{ $t('myProfile') }}
                  </div>
                </router-link>
              </div>
            </div>
          </MenuItem>
          <MenuItem class="headlessui-menu-item pt-0" v-slot="{ active }">
            <div
                class="text-start block font-medium text-sm"
                :class="{
                '!text-primary-600': active
              }"
                @click=""
            >
              {{ $t('logout') }}
            </div>
          </MenuItem>
        </MenuItems>
      </transition>
    </MenuButton>
  </Menu>
</template>

<style scoped></style>
