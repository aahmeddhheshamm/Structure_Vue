<script setup lang="ts">
import InputTextField from "@/components/form/InputTextField.vue";
import SelectBox from "@/components/form/SelectBox.vue";
import {useLocaleSettings} from "@/composables/useLocaleSettings.ts";
import {useForm} from "vee-validate";
import {ref} from "vue";
import MainButton from "@/components/buttons/MainButton.vue";
import {useCrudProductFields} from "@/modules/products/composables/useCrudProductFields.ts";

const { t } = useLocaleSettings();
defineEmits(['close']);

const { values, resetForm } = useForm({
  keepValuesOnUnmount: true,
  initialValues: {
    name: "",
    price: "",
    category: "",
    sub_categories: "",
  }
})


const levels = ref([
  { label: 'beginner', value: 'beginner' },
  { label: 'intermediate', value: 'intermediate' },
  { label: 'advanced', value: 'advanced' }
])

const { onSubmit, isPending } = useCrudProductFields();

</script>

<template>
  <form
      class="grid grid-cols-2 tems-center gap-4 w-full"
      @submit="onSubmit"
  >
    <InputTextField
        :label="t('fields.productName')"
        name="name"
        :placeholder="t('fields.enterProductName')"
        required
    />

    <InputTextField
        :label="t('fields.price')"
        name="price"
        :placeholder="t('fields.enterPrice')"
        required
    />


    <SelectBox
        :label="t('fields.category')"
        name="category"
        :static-options="levels"
        optionLabel="label"
        optionValue="value"
        :placeholder="t('fields.selectCategory')"
    />
    <SelectBox
        multi
        :label="t('fields.subCategories')"
        name="sub_categories"
        fetchOptionsUrl="sub_categories"
        optionLabel="label"
        optionValue="value"
        :placeholder="t('fields.selectSubCategories')"
    />

    <MainButton
        class="col-span-2"
        text="buttons.submit"
        type="submit"
        :loading="isPending"
    />
  </form>
</template>

<style scoped>

</style>