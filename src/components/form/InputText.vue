<template>
  <div>
    <label>
      <span
          class="flex gap-1 items-center ltr:text-[14px] rtl:text-[16px] leading-normal text-bsTextGray-900 mb-[8px] font-medium"
          v-if="label"
      >
        <span class="min-h-[24px]"> {{ label }}</span>
        <span class="text-danger text-[16px]" v-if="required && !disabled && !readonly">*</span>
      </span>
      <InputText
          class="py-2"
          :class="['w-full', { 'is-invalid': errorMessage }]"
          :feedback="false"
          toggleMask
          :name="name"
          v-model.trim="value"
          @change="handleChange"
          @blur="handleBlur($event, true)"
          :placeholder="placeholder"
          :type="type"
          :disabled="disabled"
          :readOnly="readonly"
          v-bind="$attrs"
          autocomplete="new-password"
          :dir="direction"
      />
    </label>
    <div class="min-h-[32px] py-[8px] min-w[1px] overflow-hidden">
      <Transition name="error" mode="out-in">
        <span
            v-if="errorMessage"
            class="text-danger block font-normal text-[12px] leading-[16px] break-all text-wrap hyphens-auto"
        >
          {{ errorMessage }}
        </span>
      </Transition>
    </div>
  </div>
</template>
<script setup>
import { useField } from 'vee-validate';
import {computed} from "vue";

defineOptions({
  inheritAttrs: false
});
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: false,
    default: 'text'
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
  readonly: {
    type: Boolean,
    required: false,
    default: false
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  }
});

const { handleChange, value, handleBlur, errorMessage } = useField(() => props.name, undefined);
const direction = computed(() => {
  if (value.value && /[._](ar|en)$/.test(props.name)){
    return /[\u0600-\u06FF]/.test(value.value) ? "rtl" : "ltr";
  }
  return ''
});
</script>
