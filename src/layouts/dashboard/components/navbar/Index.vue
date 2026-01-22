<template>
  <nav
    class="bg-white py-3 ps-6 pe-10 flex justify-between items-center border-b border-black/10 transition-all duration-500"
  >
    <div class="flex items-center gap-7">
      <!-- icon -->
      <span
        @click="toggleSidebar"
        :class="collapseIconClass"
        class="p-1 cursor-pointer transition-all duration-500 hidden md:block"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="12"
          viewBox="0 0 16 12"
          fill="none"
        >
          <path
            d="M16 12L10.0836 6.00001L16 0.00974655C14.773 0.017314 13.5471 0.0210981 12.3223 0.0210981L6.42189 6.00001L12.2999 11.9627C13.2902 11.9627 14.2805 11.9686 15.2708 11.9805C15.2005 11.9805 15.5651 11.9886 16 12Z"
            fill="#0375F9"
          />
          <path
            d="M9.54912 11.9594L3.67273 5.99992L9.57471 0.017765C8.78159 0.017765 7.98848 0.0118198 7.19537 -7.24792e-05C7.37126 -7.24792e-05 6.57815 0.0145226 5.91615 -7.24792e-05L-0.000209808 5.99992L5.90016 11.9756C7.11702 11.9642 8.32428 11.961 9.54912 11.9594Z"
            fill="#0375F9"
          />
        </svg>
      </span>

      <span class="block md:hidden" @click="toggleMobileSidebar">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512">
          <path
            fill="#0376f9"
            d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
          />
        </svg>
      </span>

      <!-- module name -->
      <span class="font-medium text-2xl leading-none text-primary-700 capitalize">{{
        route.path.split('/')[2] ? route.path.split('/')[2] : 'dashboard'
      }}</span>
    </div>

    <!-- <search-box /> -->

    <div class="flex items-center gap-3">
      <div class="flex gap-2">
        <rounded-button @action="toggleTheme">
          <svg
            v-if="currentTheme === 'light'"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 48 48"
            class="fill-primary-500"
          >
            <path
              d="M 23.976562 3.9785156 A 1.50015 1.50015 0 0 0 22.5 5.5 L 22.5 8.5 A 1.50015 1.50015 0 1 0 25.5 8.5 L 25.5 5.5 A 1.50015 1.50015 0 0 0 23.976562 3.9785156 z M 10.902344 9.4042969 A 1.50015 1.50015 0 0 0 9.8574219 11.980469 L 11.978516 14.101562 A 1.5012202 1.5012202 0 0 0 14.101562 11.978516 L 11.980469 9.8574219 A 1.50015 1.50015 0 0 0 10.902344 9.4042969 z M 37.050781 9.4042969 A 1.50015 1.50015 0 0 0 36.019531 9.8574219 L 33.898438 11.978516 A 1.5012202 1.5012202 0 0 0 36.021484 14.101562 L 38.142578 11.980469 A 1.50015 1.50015 0 0 0 37.050781 9.4042969 z M 24 13 A 11 11 0 0 0 24 35 A 11 11 0 0 0 24 13 z M 5.5 22.5 A 1.50015 1.50015 0 1 0 5.5 25.5 L 8.5 25.5 A 1.50015 1.50015 0 1 0 8.5 22.5 L 5.5 22.5 z M 39.5 22.5 A 1.50015 1.50015 0 1 0 39.5 25.5 L 42.5 25.5 A 1.50015 1.50015 0 1 0 42.5 22.5 L 39.5 22.5 z M 13.009766 33.445312 A 1.50015 1.50015 0 0 0 11.978516 33.898438 L 9.8574219 36.019531 A 1.501221 1.501221 0 1 0 11.980469 38.142578 L 14.101562 36.021484 A 1.50015 1.50015 0 0 0 13.009766 33.445312 z M 34.943359 33.445312 A 1.50015 1.50015 0 0 0 33.898438 36.021484 L 36.019531 38.142578 A 1.5012209 1.5012209 0 1 0 38.142578 36.019531 L 36.021484 33.898438 A 1.50015 1.50015 0 0 0 34.943359 33.445312 z M 23.976562 37.978516 A 1.50015 1.50015 0 0 0 22.5 39.5 L 22.5 42.5 A 1.50015 1.50015 0 1 0 25.5 42.5 L 25.5 39.5 A 1.50015 1.50015 0 0 0 23.976562 37.978516 z"
            ></path>
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            class="fill-primary-500"
          >
            <path
              d="M25.999 19.2432C25.8549 20.6581 25.3125 22.0031 24.4346 23.122C23.5568 24.241 22.3796 25.0881 21.0396 25.5649C19.6997 26.0417 18.252 26.1287 16.8646 25.8158C15.4772 25.5029 14.207 24.8029 13.2014 23.7971C12.1959 22.7913 11.4963 21.521 11.1837 20.1335C10.8712 18.7461 10.9587 17.2985 11.4359 15.9587C11.9131 14.619 12.7606 13.4421 13.8799 12.5646C14.9992 11.6872 16.3444 11.1452 17.7594 11.0015C17.8157 10.9953 17.8725 11.0086 17.9201 11.0393C17.9678 11.0699 18.0034 11.1161 18.0211 11.1699C18.0388 11.2238 18.0374 11.282 18.0171 11.335C17.9969 11.3879 17.959 11.4323 17.91 11.4606C17.1822 11.8945 16.563 12.4887 16.0997 13.1981C15.6364 13.9075 15.3412 14.7133 15.2365 15.5541C15.1319 16.3949 15.2206 17.2484 15.4958 18.0498C15.7711 18.8511 16.2257 19.579 16.8249 20.178C17.4241 20.777 18.1522 21.2313 18.9537 21.5063C19.7551 21.7813 20.6087 21.8697 21.4495 21.7648C22.2903 21.6598 23.0961 21.3644 23.8053 20.9009C24.5146 20.4374 25.1087 19.8181 25.5423 19.0902C25.5713 19.0426 25.6156 19.0062 25.6679 18.9869C25.7202 18.9677 25.7775 18.9667 25.8305 18.9841C25.8834 19.0016 25.9289 19.0365 25.9595 19.083C25.9901 19.1296 26.004 19.1852 25.999 19.2407V19.2432Z"
            />
          </svg>
        </rounded-button>
      </div>

      <UserHint :name="`navbar`" class="hidden md:block" />
    </div>
  </nav>
</template>

<script setup lang="ts">
import RoundedButton from '@/components/buttons/RoundedButton.vue'
import UserHint from '@/layouts/dashboard/components/navbar/partial/UserHint.vue'
import { useThemeStore } from '@/store/theme'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import {useSidebarStore} from "@/store/sidebar.ts";

const { openMobileSidebar } = useSidebarStore();
const route = useRoute()

const { toggleTheme } = useThemeStore()
const { currentTheme } = storeToRefs(useThemeStore())

const isSidebarVisible = ref(false)
const emit = defineEmits(['collapse'])

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value
  emit('collapse', isSidebarVisible.value)
}

const collapseIconClass = computed(() => {
  return isSidebarVisible.value ? '' : 'rotate-180'
})

const toggleMobileSidebar = () => {
  openMobileSidebar()
}
</script>

<style scoped></style>
