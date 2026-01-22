<template>
  <label
    :for="id"
    class="cursor-pointer relative"
    :class="[
      {
        'flex items-center gap-3 w-fit text-neural-300 font-medium text-sm leading-normal border rounded-lg px-4 h-12 border-black/10 justify-center':
          label
      },
      { '!cursor-not-allowed': disabled }
    ]"
  >
    {{ label }}
    <!-- <Field type="checkbox" :id  :name :value @change="$emit('onChange')" /> -->

    <input
      type="checkbox"
      class="sr-only peer"
      :true-value
      :false-value
      :id
      :name
      :disabled
      :checked="checked"
      v-model="value"
      @input="onChange"
    />
    <div
      class="block relative bg-[#ACB8C2] w-9 h-6 p-1 rounded-full before:absolute before:bg-white before:w-4 before:h-4 before:p-1 before:rounded-full before:transition-all before:duration-500 before:left-1 peer-checked:before:left-4 peer-checked:bg-gradient-to-r from-[#0D44AC] to-[#0C74DD]"
    ></div>
  </label>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { toRefs } from 'vue'

const props = defineProps({
  label: {
    type: String
  },
  id: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  value: {
    type: Boolean
  },
  disabled: {
    type: Boolean
  },
  modelValue: {},
  trueValue: {
    type: [String, Boolean]
  },
  falseValue: {
    type: [String, Boolean]
  }
})

const { name } = toRefs(props)

const { handleChange, value, checked, setValue } = useField(name, undefined, {
  type: 'checkbox',
  checkedValue: props.trueValue,
  uncheckedValue: props.falseValue,
  syncVModel: true
})

const emit = defineEmits(['onChange', 'update:modelValue'])
const onChange = () => {
  emit('onChange')
  emit('update:modelValue', props.value)
  handleChange(props.value)
}

// watch(
//   () => props.value,
//   (newValue) => {
//     setValue(newValue)
//     console.log('success')
//   },
//   { immediate: true, deep: true }
// )
</script>

<style lang="scss" scoped></style>
