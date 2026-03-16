<template>
  <div>
    <label class="flex items-center gap-2 cursor-pointer">
      <checkbox
          v-model="internalValue"
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
    <div v-if="name" class="min-h-8 py-2 min-w[1px] overflow-hidden">
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
import {computed, ref} from 'vue'
import { useField } from 'vee-validate'

// I Make this component like this, because I am using as selectBox in MainTable

const props = defineProps({
  name: { type: String, required: false }, // Make name optional
  modelValue: { type: null },            // Support v-model
  label: { type: String },
  binary: { type: Boolean, default: true }
})

const emit = defineEmits(['update:modelValue'])

// If 'name' is found, use VeeValidate. Otherwise, use v-model
const { value: veeValue, errorMessage } = props.name
    ? useField(() => props.name!)
    : { value: ref(null), errorMessage: ref(null) };

const internalValue = computed({
  get: () => (props.name ? veeValue.value : props.modelValue),
  set: (val) => {
    if (props.name) {
      veeValue.value = val
    } else {
      emit('update:modelValue', val)
    }
  }
})
</script>