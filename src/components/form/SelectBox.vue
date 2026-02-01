<template>
  <div>
    <label :for="inputId" v-if="label">
      <span class="flex gap-1 items-center mb-1 font-medium text-black/80">
        <span class="text-sm">{{ label }}</span>
        <span v-if="required && !disabled" class="text-errors-100">*</span>
      </span>
    </label>

    <!-- MULTI -->
    <MultiSelect
        v-if="multi"
        v-model="value"
        :options="options"
        :option-value="optionValue"
        :optionLabel="optionLabel"
        :placeholder="placeholder"
        :filter="filter"
        :disabled="disabled"
        :loading="loading"
        display="chip"
        :inputId="inputId"
        class="w-full text-sm"
        :class="{ 'is-invalid': errorMessage }"
        @blur="handleBlur($event, true)"
        @update:modelValue="handleChange"
    />

    <!-- SINGLE -->
    <Dropdown
        v-else
        v-model="value"
        :options="options"
        :option-value="optionValue"
        :optionLabel="optionLabel"
        :placeholder="placeholder"
        :filter="filter"
        :disabled="disabled"
        :loading="loading"
        :inputId="inputId"
        class="w-full text-sm"
        :class="{ 'is-invalid': errorMessage }"
        @blur="handleBlur($event, true)"
        @update:modelValue="handleChange"
    />

    <div class="min-h-8 py-2 overflow-hidden">
      <Transition name="error" mode="out-in">
        <span
            v-if="errorMessage"
            class="text-errors-100 block text-sm leading-4 break-all"
        >
          {{ errorMessage }}
        </span>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { ref, onMounted, watch, computed } from 'vue'
import useFetch from '@/composables/useFetch'
import InterceptorHelper from '@/InterceptorHelper'

defineOptions({
  inheritAttrs: false
})

type Option = Record<string, any>

type Props = {
  name: string
  multi?: boolean
  fetchOptionsUrl?: string
  optionValue: string
  optionLabel: string
  placeholder: string

  label?: string
  filter?: boolean
  required?: boolean
  readonly?: boolean
  disabled?: boolean

  staticOptions?: Option[]
  optionalParams?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  multi: true,
  filter: false,
  staticOptions: () => []
})

const {
  value,
  errorMessage,
  handleChange,
  handleBlur,
  setValue
} = useField<any>(props.name)

const inputId = computed(() => `select.${props.name}`)
const options = ref<Option[]>([])
const loading = ref(false)

watch(
    () => props.multi,
    (isMulti) => {
      if (isMulti && !Array.isArray(value.value)) {
        setValue(value.value ? [value.value] : [], false)
      }

      if (!isMulti && Array.isArray(value.value)) {
        setValue(value.value[0] ?? null, false)
      }
    },
    { immediate: true }
)

function syncValuesWithOptions() {
  if (!props.multi || !Array.isArray(value.value)) return

  const validIds = options.value.map(
      (o) => o[props.optionValue]
  )

  setValue(
      value.value.filter((v) => validIds.includes(v)),
      false
  )
}

async function fetchRemoteOptions() {
  if (!props.fetchOptionsUrl) return

  loading.value = true

  const { data, isLoading, isSuccess } = useFetch({
    queryKey: ['select_box', props.fetchOptionsUrl, props.optionalParams],
    queryFn: () =>
        InterceptorHelper.intercept(
            props.fetchOptionsUrl!,
            undefined,
            props.optionalParams
        )
  })

  loading.value = isLoading.value

  if (isSuccess.value && Array.isArray(data.value?.data)) {
    options.value = data.value.data
    syncValuesWithOptions()
  }
}

async function resolveOptions() {
  options.value = []

  if (props.staticOptions?.length) {
    options.value = [...props.staticOptions]
    syncValuesWithOptions()
    return
  }

  await fetchRemoteOptions()
}

onMounted(resolveOptions)

watch(
    () => [props.staticOptions, props.optionalParams],
    resolveOptions,
    { deep: true }
)
</script>

