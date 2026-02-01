<script setup lang="ts">
import InputTextField from '@/components/form/InputTextField.vue'
import { useForm } from 'vee-validate'
import {ref, watchEffect} from 'vue'
import ToggleSwitchButton from "@/components/form/ToggleSwitchButton.vue";
import SelectBox from "@/components/form/SelectBox.vue";
import ClearFilters from "@/components/buttons/ClearFilters.vue";
import CheckBoxField from "@/components/form/CheckBoxField.vue";
import DatePickerField from "@/components/form/DatePickerField.vue";

defineProps<{
  filters: {
    title: string
    active: string
    category: string
    sub_categories: string
  }
}>()

const { values, resetForm } = useForm({
  keepValuesOnUnmount: true,
  initialValues: {
    title: "",
    active: "",
    category: "",
    sub_categories: "",
  }
})


const levels = ref([
  { label: 'beginner', value: 'beginner' },
  { label: 'intermediate', value: 'intermediate' },
  { label: 'advanced', value: 'advanced' }
])

const emit = defineEmits(['update:filters', 'hide'])

watchEffect(() => {
  emit('update:filters', { ...values })
});
const test =ref()
</script>

<template>
  <form
    class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] md:flex w-full md:flex-row md:items-center gap-4 md:max-w-full max-w-fit"
    @submit.prevent=""
  >
    <InputTextField
        name="title"
        :placeholder="
            $t('placeHolders.enterFieldEn', {
              field: $t('fields.name')
            })
          "
    />

    <ToggleSwitchButton name="active" label="test"/>

    <SelectBox
        name="category"
        :multi="false"
        :static-options="levels"
        optionLabel="label"
        optionValue="value"
        placeholder="Select category"
    />
    <SelectBox
        name="sub_categories"
        multi
        :static-options="levels"
        optionLabel="label"
        optionValue="value"
        placeholder="Select Sub Categories"
    />
    <CheckBoxField
        name="test"
        :binary="true"
        label="test"
    />

    <DatePickerField
        name="test"
        showIcon
        fluid
        dateFormat="dd/mm/yy"
        :placeholder="$t('placeHolders.selectFrom')"
    />
    <ClearFilters
        class="self-start mb-1"
        v-if="values.title || values.active || values.category || values.sub_categories"
        @reset="resetForm"
    />


  </form>
</template>
