<template>
  <div class="flex min-h-screen bg-gray-50">
    <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-500 to-blue-700 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 opacity-90"></div>
      <div class="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
        <div class="max-w-md">
          <h1 class="text-4xl font-bold mb-6">{{ $t('auth.headerInfo') }}</h1>
          <p class="text-lg text-neutral-100">
            {{ $t('auth.descriptionInfo') }}
          </p>
        </div>
      </div>
    </div>
    <div class="w-full lg:w-1/2 p-4 sm:p-6 bg-white">
      <div class="flex items-center justify-between gap-3 w-full">
        <div class="flex gap-2">
          <rounded-button @action="toggleTheme">
            <LightModeIcon v-if="currentTheme === 'light'"/>
            <DarkModeIcon v-else />
          </rounded-button>
        </div>
        <SwitchLanguage />
      </div>
      <div class="flex flex-col justify-center items-center h-full">
      <div class="w-full max-w-xl">
        <div class="mb-8 text-center">
          <img class="w-32 mx-auto" src="@/assets/images/text-logo.svg" />

        </div>
        <div class="mb-8">
          <div class="flex border-b border-gray-200">
            <button
                @click="goToLogin"
                :class="{
                'text-primary-600 border-b-2 border-primary-600 font-medium': isLoginRoute,
                'text-gray-500 hover:text-gray-700': !isLoginRoute
              }"
                class="flex-1 py-3 px-4 text-center transition-colors duration-200"
            >
              {{ $t('buttons.login') }}
            </button>
            <button
                @click="goToRegister"
                :class="{
                'text-primary-600 border-b-2 border-primary-600 font-medium': isRegisterRoute,
                'text-gray-500 hover:text-gray-700': !isRegisterRoute
              }"
                class="flex-1 py-3 px-4 text-center transition-colors duration-200"
            >
              {{ $t('buttons.register') }}
            </button>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm">
          <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">

              <component :is="Component" />
          </transition>
          </router-view>

        </div>

      </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {useThemeStore} from "@/store/theme.ts";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";
import RoundedButton from "@/components/buttons/RoundedButton.vue";
import SwitchLanguage from "@/layouts/dashboard/components/navbar/partial/SwitchLanguage.vue";
import LightModeIcon from "@/components/icons/LightModeIcon.vue";
import DarkModeIcon from "@/components/icons/DarkModeIcon.vue";

const router = useRouter()
const route = useRoute()
const { toggleTheme, setTheme } = useThemeStore()


const { currentTheme } = storeToRefs(useThemeStore())
const isLoginRoute = computed(() => route.name === 'auth-login')
const isRegisterRoute = computed(() => route.name === 'auth-register')

const goToLogin = () => {
  if (!isLoginRoute.value) {
    router.push({ name: 'auth-login' })
  }
}

const goToRegister = () => {
  if (!isRegisterRoute.value) {
    router.push({ name: 'auth-register' })
  }
}

onMounted(async () => {
  setTheme(currentTheme.value)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>