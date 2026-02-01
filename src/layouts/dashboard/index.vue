<template>
  <div class="flex overflow-auto">
    <MainSidebar
        class="transition-all duration-500 hidden md:block"
        :class="sidebarClass"
        :isExpanded
        :isHovered
        @on-hover="onHover"
        @on-leave="onLeave"
    />
    <div
        class="grow transition-all duration-500 overflow-hidden ps-0 md:ps-[5.5rem]"
        :class="divClass"
    >
      <main-nav class="sticky top-0 z-10" @collapse="collapseSidebar" />
      <div data-scrollbar id="main-scrollbar" tabindex="-1">
        <div class="bg-dashboardBg transition-all duration-500 min-h-full">
          <suspense>
            <template #default>
              <router-view v-slot="{ Component, route }">
                <transition name="fade" mode="out-in">
                  <div :key="route.name!" class="p-4">
                    <component :is="Component"></component>
                  </div>
                </transition>
              </router-view>
            </template>
          </suspense>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store/theme.ts'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import MainNav from './components/navbar/Index.vue'
import MainSidebar from './components/sidebar/Index.vue'

const { setTheme } = useThemeStore()
const { currentTheme } = storeToRefs(useThemeStore())

const setCssVariable = (
    r: HTMLElement | null,
    property: string,
    value: string,
    important = false
) => {
  r?.style.setProperty(property, value, important ? 'important' : '')
}

onMounted(async () => {
  setTheme(currentTheme.value)

  // const root = document.querySelector<HTMLElement>(':root')

  // const storedLocale = JSON.parse(localStorage.getItem('locale')!) || { lang: 'EN', name: 'English', direction: 'ltr', font: 'Lexend' };
  //
  // if (storedLocale) {
  //   setCssVariable(root, '--primary-700', '3, 118, 249', true)
  //   setCssVariable(root, '--primary-500', '0, 152, 255', true)
  //   document.body.setAttribute('dir', storedLocale.direction)  // Set body direction (LTR or RTL)
  //   document.body.style.fontFamily = storedLocale.font  // Apply selected font
  // }
})

const isExpanded = ref(false)
const isHovered = ref(false)

const onHover = () => {
  isHovered.value = true
}

const onLeave = () => {
  isHovered.value = false
}

const collapseSidebar = (value: boolean) => {
  isExpanded.value = value
}

const divClass = computed(() => {
  return isExpanded.value ? '!ps-[18.875rem]' : ''
})

const sidebarClass = computed(() => {
  return isExpanded.value ? '' : 'w-[5.5rem] hover:w-[18.875rem] hover:z-30 hover:transition-all hover:duration-500 z-20'
})
</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(200px);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-out;
}
</style>
