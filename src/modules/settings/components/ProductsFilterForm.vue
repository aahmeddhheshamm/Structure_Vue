<script setup lang="ts">
import InputText from '@/components/form/InputText.vue'
// import SelectBox from '@/components/form/SelectBox.vue'
import ToggleSwitch from '@/components/form/ToggleSwitch.vue'
import { useForm } from 'vee-validate'
import { ref, watchEffect } from 'vue'
import ClearFilters from '@/components/buttons/ClearFilters.vue'

defineProps<{
  filters: {
    translations__level: string
    translations__scope: string
    active: string
  }
}>()

const levelFilter = ref('')
const active = ref(null)
const scope = ref('')

const { resetForm } = useForm({
  keepValuesOnUnmount: true,
  initialValues: {
    translations__level: '',
    translations__scope: '',
    active: ''
  }
})

const levels = ref([
  { label: 'beginner', value: 'beginner' },
  { label: 'intermediate', value: 'intermediate' },
  { label: 'advanced', value: 'advanced' }
])

const emit = defineEmits(['update:filters', 'hide'])
//
// watchEffect(() => {
//   emit('update:filters', {
//     translations__level: levelFilter.value,
//     active: active.value,
//     translations__scope: scope.value
//   })
// })
</script>

<template>
  <form
    class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] md:flex w-full md:flex-row md:items-center gap-4 md:max-w-full max-w-fit"
    @submit.prevent=""
  >
<!--    <InputText-->
<!--      class="self-start"-->
<!--      name="translations__scope"-->
<!--      label="Scope"-->
<!--      placeholder="Write Scope"-->
<!--      id="translations__scope"-->
<!--      v-model="scope"-->
<!--    />-->

<!--    <SelectBox-->
<!--        v-model="levelFilter"-->
<!--        :empty-filter-message="$t('dropDown.noResults')"-->
<!--        :empty-message="$t('dropDown.noAvailableOptions')"-->
<!--        :options="levels"-->
<!--        option-value="optionValue"-->
<!--        optionLabel="optionLabel"-->
<!--        :placeholder="$t('placeHolders.selectStatus')"-->
<!--        class="px-[12px] py-1.5 w-full font-medium text-sm !rounded-[4px]"-->
<!--        inputId="categoryTypesList"-->
<!--        :highlightOnSelect="true"-->
<!--        display="chip"-->
<!--     name="levels"-->
<!--    />-->


    <ToggleSwitch
      class="md:self-end"
      name="active"
      id="course-filter-active-toggle"
      label="Active"
      :true-value="true"
      :false-value="false"
      v-model="active"
      @on-change="(value) => (active = value)"
    />

    <div class="flex gap-1.5 self-end mb-1">
      <ClearFilters
        v-if="active === true || active === false || levelFilter || scope"
        @reset="resetForm"
      />
    </div>
  </form>
</template>
