<script setup lang="ts">
defineProps({
  tooltipValue: { type: String, required: false, default: null },

})
</script>

<template>
  <button v-tooltip.top="{ value: tooltipValue }" type="button" class="rounded-button bg-primary-50" @click="$emit('action')">
    <slot />
  </button>
</template>

<style scoped>
.rounded-button {
  display: flex;
  width: 2.5rem;
  height: 2.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
  border-radius: 50%;
}
</style>
