<template>
  <div class="flex min-h-screen bg-gray-50">
    <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-500 to-blue-700 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 opacity-90"></div>
      <div class="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
        <div class="max-w-md">
          <h1 class="text-4xl font-bold mb-6">Welcome Back</h1>
          <p class="text-lg text-blue-100">
            Streamline your workflow with our powerful dashboard. Manage projects, track progress, and collaborate with your team effortlessly.
          </p>
        </div>
      </div>
    </div>
    <div class="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-6 ">
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
              Login
            </button>
            <button
                @click="goToRegister"
                :class="{
                'text-primary-600 border-b-2 border-primary-600 font-medium': isRegisterRoute,
                'text-gray-500 hover:text-gray-700': !isRegisterRoute
              }"
                class="flex-1 py-3 px-4 text-center transition-colors duration-200"
            >
              Register
            </button>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm">
          <transition name="fade" mode="out-in">

          <router-view v-slot="{ Component }">
              <component :is="Component" />
          </router-view>
          </transition>

        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

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