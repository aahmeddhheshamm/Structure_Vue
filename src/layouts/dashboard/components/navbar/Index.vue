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
           <MenuIcon class="fill-primary-700" />
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

      <UserHint :name="`navbar`" class="" />
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
import MenuIcon from "@/components/icons/MenuIcon.vue";

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
