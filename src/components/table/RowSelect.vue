<template>
  <div class="flex justify-center items-center">
    <input
      class="w-5 h-5 rounded-[4px] text-primary-700 focus:ring-transparent checked:ring-transparent checked:outline-none outline-none border-black/20 checked:bg-none bg-white/60"
      type="checkbox"
      :id="element.id"
      :value="element.id"
      :checked="isRowSelected(element.id)"
      @input="onRowSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  element: any
  modelValue: Set<number>
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', values: Set<number>): void
}>()

const selectedRows = ref(new Set<number>())

const isRowSelected = (id: number | string) => {
  return selectedRows.value.has(Number(id))
}

onMounted(() => {
  if (Array.isArray(props.modelValue)) {
    selectedRows.value = new Set(props.modelValue)
  } else {
    selectedRows.value = new Set(props.modelValue)
  }
})

const onRowSelect = (e: Event) => {
  const isChecked = (e.target as HTMLInputElement).checked
  const value = parseInt((e.target as HTMLInputElement).value)

  const newSelectedRows = new Set(selectedRows.value)

  if (isChecked) {
    newSelectedRows.add(value)
  } else {
    newSelectedRows.delete(value)
  }

  selectedRows.value = newSelectedRows
  emits('update:modelValue', selectedRows.value)
}

watch(
  () => props.modelValue,
  (newValue) => {
    if (Array.isArray(newValue)) {
      selectedRows.value = new Set(newValue)
    } else {
      selectedRows.value = new Set(newValue)
    }
  }
)
</script>

<style scoped>
input {
  position: relative;
}

input:checked::after {
  content: '';
  position: absolute;
  width: 11px;
  height: 6px;
  color: white;
  top: 20.5%;
  left: 15%;
  border-left: 2px solid white;
  border-bottom: 2px solid white;
  border-bottom-left-radius: 1px;
  rotate: -45deg;
}
</style>
