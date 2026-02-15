<script setup lang="ts">
</script>

<template>
  <div>
    <div class=" flex flex-col justify-center items-center w-full pt-12 m-auto">

        <h1 class="text-4xl font-bold mb-6">{{ $t('auth.headerInfo') }}</h1>
        <p class="text-lg ">
          {{ $t('auth.descriptionInfo') }}
        </p>
      </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
