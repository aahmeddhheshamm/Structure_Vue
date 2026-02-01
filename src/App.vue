<script setup lang="ts">
</script>

<template>
  <main>

  <transition name="fade" mode="out-in">
    <router-view v-slot="{ Component }">
        <component :is="Component" />
    </router-view>
  </transition>
  </main>
</template>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}
</style>
