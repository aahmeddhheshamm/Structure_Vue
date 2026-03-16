<script setup lang="ts">
import InputTextField from '@/components/form/InputTextField.vue'
import { useForm } from 'vee-validate'
import {ref, watchEffect} from 'vue'
import ToggleSwitchButton from "@/components/form/ToggleSwitchButton.vue";
import SelectBox from "@/components/form/SelectBox.vue";
import ClearFilters from "@/components/buttons/ClearFilters.vue";
import CheckBoxField from "@/components/form/CheckBoxField.vue";
import DatePickerField from "@/components/form/DatePickerField.vue";
import {useLocaleSettings} from "@/composables/useLocaleSettings.ts";
const { t } = useLocaleSettings();

defineProps<{
  filters: {
    title: string
    active: boolean
    category: string
    sub_categories: string
    test: boolean
  }
}>()

const { values, resetForm } = useForm({
  keepValuesOnUnmount: true,
  initialValues: {
    title: "",
    active: false,
    category: "",
    sub_categories: "",
    test: false,
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
// const test =ref()
</script>

<template>
  <form
    class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] md:flex w-full md:flex-row md:items-center gap-4 md:max-w-full max-w-fit"
    @submit.prevent=""
  >
    <InputTextField
        name="title"
        :placeholder="t('fields.enterName')"
    />

    <ToggleSwitchButton name="active" :label="t('status.active')"/>

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

<!--    <DatePickerField-->
<!--        name="test"-->
<!--        showIcon-->
<!--        fluid-->
<!--        dateFormat="dd/mm/yy"-->
<!--        :placeholder="$t('fields.selectDate')"-->
<!--    />-->
    <ClearFilters
        class="self-start mb-1"
        v-if="values.title || values.active || values.category || values.sub_categories"
        @reset="resetForm"
    />


  </form>
</template>
