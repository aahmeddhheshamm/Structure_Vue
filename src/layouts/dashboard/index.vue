<template>
  <div class="flex overflow-auto">
    <MainSidebar
      class="transition-all duration-500 hidden md:block"
      :class="sidebarClass"
      :isExpanded
    />
    <div
      class="grow transition-all duration-500 overflow-hidden ps-0 md:ps-[5.5rem]"
      :class="divClass"
    >
      <main-nav class="sticky top-0 z-10" @collapse="collapseSidebar" />
      <div data-scrollbar id="main-scrollbar" tabindex="-1">
        <div class="bg-dashboardBg transition-all duration-500 content-height">
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
<!--            <template #fallback>-->
<!--&lt;!&ndash;              <div class="w-full h-full flex justify-center items-center"><Spinner></Spinner></div>&ndash;&gt;-->
<!--            </template>-->
          </suspense>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import Spinner from '@/components/general/Spinner.vue'
import { useLocaleStore } from '@/store/locale'
import { useThemeStore } from '@/store/theme.ts'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import MainNav from './components/navbar/Index.vue'
import MainSidebar from './components/sidebar/Index.vue'

const { setLocale } = useLocaleStore()
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
  setLocale({ direction: 'ltr', font: 'Lexend', lang: 'EN' })
  const root = document.querySelector<HTMLElement>(':root')

  setCssVariable(root, '--primary-700', '3, 118, 249', true)
  setCssVariable(root, '--primary-500', '0, 152, 255', true)

})

const isExpanded = ref(false)

const collapseSidebar = (value: boolean) => {
  isExpanded.value = value
}

const divClass = computed(() => {
  return isExpanded.value ? '!ps-[18.875rem]' : ''
})
console.log(isExpanded.value)
const sidebarClass = computed(() => {
  return isExpanded.value
    ? ''
    : 'w-[5.5rem]  z-20'
})
</script>

<style scoped>
.scrollbar-thumb {
  background: rgba(3, 118, 249, 0.4) !important;
}
.scrollbar-track {
  background: rgba(3, 118, 249, 0.1) !important;
}

.content-height {
  height: calc(100vh - 70.8px);
}

@media (min-width: 320px) and (max-width: 768px) {
  .content-height {
    height: calc(100vh - 48.8px) !important;
  }
}

@media (min-width: 1537px) {
  .content-height {
    height: calc(100vh - 81.8px) !important;
  }
}

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
