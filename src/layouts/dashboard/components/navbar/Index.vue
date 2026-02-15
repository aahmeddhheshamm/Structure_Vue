<template>
  <nav
    class="bg-white py-3 ps-6 pe-10 flex justify-between items-center border-b border-black/10 transition-all duration-500"
  >
    <div class="flex items-center gap-4">
      <span
        @click="toggleSidebar"
        :class="collapseIconClass"
        class="p-1 cursor-pointer transition-all duration-500 hidden md:block"
      >
        <ExpandIcon class="rtl:rotate-180"/>
      </span>

      <span class="block md:hidden">
        <MobileSidebar>
          <template #buttonContent>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512">
              <path fill="#0376f9" d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/>
            </svg>
          </template>
          <template #sideBarLinks>
            <AccordionSidebar :mini="false" />
          </template>
        </MobileSidebar>
      </span>
      <span class="font-medium text-2xl leading-none text-primary-700 capitalize">{{
        route.path.split('/')[2] ? $t(`sidebar.${route.path.split('/')[2]}`) : $t('sidebar.dashboard')
      }}</span>
    </div>

    <div class="flex items-center gap-3">
      <div class="flex gap-2">
        <rounded-button @action="toggleTheme">
          <LightModeIcon v-if="currentTheme === 'light'"/>
          <DarkModeIcon v-else />
        </rounded-button>
      </div>
      <SwitchLanguage />

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
import MobileSidebar from "@/layouts/dashboard/components/sidebar/partial/MobileSidebar.vue";
import AccordionSidebar from "@/layouts/dashboard/components/sidebar/partial/Accordion.vue";
import SwitchLanguage from "@/layouts/dashboard/components/navbar/partial/SwitchLanguage.vue";
import ExpandIcon from "@/components/icons/ExpandIcon.vue";
import LightModeIcon from "@/components/icons/LightModeIcon.vue";
import DarkModeIcon from "@/components/icons/DarkModeIcon.vue";

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

</script>

<style scoped></style>
