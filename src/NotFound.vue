<script setup lang="ts">
import MainButton from '@/components/buttons/MainButton.vue';
import Box from '@/components/UI/Box.vue';
</script>

<template>
  <Box class="!rounded-[20px] !p-8 flex flex-col items-center justify-center h-[85vh]">
    <div class="flex flex-col items-center justify-center space-y-8">
      <div class="text-center">
        <h1 class="font-bold text-primary-700 text-[120px] leading-tight">404</h1>
        <p class="font-normal text-black/60 text-base">Page Not Found</p>
      </div>

      <MainButton text="Go Home" @click="$router.push({ name: 'home' })" />
    </div>
  </Box>
</template>

<style scoped></style>
