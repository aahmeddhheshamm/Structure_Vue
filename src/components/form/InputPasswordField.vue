<template>
  <div class="relative">
    <label>
      <span
        class="flex gap-1 items-center leading-normal text-black/80 mb-1 font-medium"
        v-if="label"
      >
        <span class="min-h-6 text-sm"> {{ label }}</span>
        <span class="text-errors-100 text-md" v-if="required && !disabled">*</span>
      </span>
      <span
        :class="{
          'pointer-events-none': !value && !meta.dirty
        }"
      >
        <span class="absolute inset-y-0 flex items-center px-3 cursor-pointer end-0"
          @click="togglePassword"
        >
          <EyeOffFill
            class="w-[24px] h-[24px] fill-neutral-500 mb-2"
            v-show="passwordType !== 'password'"
          />
          <EyeFill
            class="w-[24px] h-[24px] fill-neutral-500 mb-2"
            v-show="passwordType === 'password'"
          />
        </span>
      </span>
      <InputText
        class="py-2 password-input"
        :class="['w-full', { 'is-invalid': errorMessage }]"
        :feedback="false"
        toggleMask
        :name="name"
        v-model.trim="value"
        @change="handleChange"
        @blur="handleBlur($event, true)"
        :placeholder="placeholder"
        :type="passwordType"
        :disabled="disabled"
        autocomplete="new-password"
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
import { useField } from 'vee-validate'
import { ref } from 'vue'
import EyeFill from "@/components/icons/EyeFill.vue";
import EyeOffFill from "@/components/icons/EyeOffFill.vue";


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
  }
})

const { handleChange, value, handleBlur, errorMessage, meta } = useField(
  () => props.name,
  undefined
)

const passwordType = ref('password')

function togglePassword() {
  passwordType.value === 'password'
    ? (passwordType.value = 'text')
    : (passwordType.value = 'password')
}
</script>
