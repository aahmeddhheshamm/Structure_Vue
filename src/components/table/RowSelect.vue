<template>
  <div class="flex items-center">
    <CheckBoxField
        :model-value="isChecked"
        @update:model-value="onToggle"
        :binary="true"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CheckBoxField from "@/components/form/CheckBoxField.vue";

const props = defineProps<{
  element: any
  modelValue: Set<number>
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', values: Set<number>): void
}>()

const isChecked = computed(() => props.modelValue.has(props.element.id))

const onToggle = (checked: boolean) => {
  const next = new Set(props.modelValue)
  if (checked) {
    next.add(props.element.id)
  } else {
    next.delete(props.element.id)
  }
  emits('update:modelValue', next)
}
</script>