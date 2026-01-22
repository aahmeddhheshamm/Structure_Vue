<template>
  <div>
    <label>
      <span
          class="flex gap-1 items-center ltr:text-[14px] rtl:text-[16px] leading-normal text-bsTextGray-900 mb-[8px] font-medium ltr:min-h-[24px]"
          v-if="label"
      >
        <span> {{ label }}</span>
        <span class="text-danger text-[16px]" v-if="required && !disabled && !readonly">*</span>
      </span>
      <Select
          v-model="value"
          :filter="filter"
          :empty-filter-message="$t('dropDown.noResults')"
          :empty-message="$t('dropDown.noAvailableOptions')"
          :options="options"
          :option-value="optionValue"
          :optionLabel="optionLabel"
          :placeholder="placeholder"
          :highlightOnSelect="highlightOnSelect"
          class="px-[12px] py-1.5 w-full font-medium text-sm !rounded-[4px]"
          :class="{ '!border-danger is-invalid': errorMessage }"
          @blur="handleBlur($event, true)"
          @update:modelValue="handleChange"
          :disabled="disabled"
          showClear
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
import { onMounted, nextTick } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  filter: {
    type: Boolean,
    required: false,
    default: true
  },
  highlightOnSelect: {
    type: Boolean,
    required: false,
    default: true
  },
  options: {
    required: true,
    default: []
  },
  placeholder: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: false
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
  },
  optionValue: {
    type: String,
    required: false,
    default: 'optionValue'
  },
  optionLabel: {
    type: String,
    required: false,
    default: 'optionLabel'
  },
});

const { value, errorMessage, handleChange, handleBlur, setValue } = useField(props.name, undefined);

onMounted(async () => {
  await nextTick();
  if (!!props.options && Array.isArray(props.options) && !!props.options?.length) {
    if (value.value) {
      const findValue = props.options.find((option) => option[props.optionValue] === value.value);
      if (!findValue) {
        setValue(null, false);
      }
    }
  }
});
</script>
<!-- <style>
.p-select-dropdown {
  padding:0 20px !important;
}
</style> -->
