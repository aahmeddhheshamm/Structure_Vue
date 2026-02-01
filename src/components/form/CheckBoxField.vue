<template>
  <div>
    <label class="flex items-center gap-2 cursor-pointer">
      <checkbox
        v-model="value"
        :binary="binary"
        :input-id="name"
        v-bind="$attrs"
        :class="{ 'is-invalid': errorMessage }"
      />
      <span
          class="flex gap-1 items-center leading-normal text-black/80 font-medium"
          v-if="label"
      >
        <span class="min-h-6 text-sm">
          {{ label }}
        </span>
      </span>
    </label>
    <div class="min-h-8 py-2 min-w[1px] overflow-hidden">
      <Transition name="error" mode="out-in">
        <span
          v-if="errorMessage"
          class="text-errors-100 block font-normal text-sm leading-4 break-all text-wrap hyphens-auto"
        >
          {{ errorMessage }}
        </span>
      </Transition>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useField } from 'vee-validate'

defineOptions({
  inheritAttrs: false
})
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: false
  },
  binary: {
    type: Boolean,
    required: false,
    default: true
  }
})

const { value, errorMessage } = useField(() => props.name, undefined)
</script>
