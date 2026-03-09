<template>
  <div class="bg-white p-6 transition-all duration-500 box-shadow rounded-md" v-bind="$attrs">
    <div v-if="$slots.header" class="">
      <div class="border-b border-black/10 pb-4 mb-4">
        <slot name="header" />
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.box-shadow {
  -webkit-box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
}
</style>
