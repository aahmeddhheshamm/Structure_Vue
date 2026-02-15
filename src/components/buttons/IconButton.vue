<script setup>

defineProps({
  loading: { type: Boolean, default: false, required: false },
  disabled: { type: Boolean, default: false, required: false },
  tooltipValue: { type: String, required: false, default: null },
  isDeleteButton:{type:Boolean, required: false, default: false},
})
</script>

<template>
  <button
      v-tooltip.top="{ value: tooltipValue }"
      class="group bg-gray-300 border-0 shadow-none overflow-hidden flex items-center justify-center outline-0 rounded-[0.425rem] w-8 h-8"
      :class="[disabled || loading ? `cursor-not-allowed dark:opacity-50` : '']"
      type="button"
      :disabled="disabled || loading"
      v-bind="$attrs"
  >
    <div
        v-if="loading"
        class="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-[#fff] rounded-full"
        role="status"
        aria-label="loading"
    ></div>
    <div
        class="fill-black/60 group-hover:fill-bsPrimary ease-in-out duration-150 w-1/2 h-1/2"
        :class="{'group-hover:!fill-red-600':isDeleteButton}"
        v-else
    >
      <slot></slot>
    </div>
  </button>
</template>
