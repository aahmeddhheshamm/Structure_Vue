<template>
  <div>
    <label>
      <span
          class="flex gap-1 items-center leading-normal text-black/80 mb-1 font-medium"
          v-if="label"
      >
   <span class="min-h-6 text-sm"> {{ label }}</span>
        <span class="text-errors-100 text-md" v-if="required && !disabled">*</span>
      </span>

      <DatePicker
          :class="['w-full', { 'is-invalid': errorMessage, disabled: disabled }]"
          :feedback="false"
          toggleMask
          :name="name"
          v-model="value"
          @change="handleChange"
          @blur="handleBlur($event, true)"
          :placeholder="placeholder"
          :disabled="disabled"
          :dateFormat="dateFormat"
          :hourFormat="'24'"
          :timeOnly="showTimeOnly"
          showIcon
          fluid
          iconDisplay="input"
          v-bind="$attrs"
          inputClass=""
      />
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
<script setup>
import { useField } from 'vee-validate';

defineOptions({
  inheritAttrs: false
});
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: false
  },
  placeholder: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    required: false,
    default: false
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  },
  dateFormat: {
    type: String,
    required: false,
    default: 'dd/mm/yy'
  },
  showTimeOnly: {
    type: Boolean,
    required: false,
    default: false
  }
});

const { handleChange, value, handleBlur, errorMessage } = useField(() => props.name, undefined);
</script>
