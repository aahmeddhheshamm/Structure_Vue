<script setup lang="ts">
import InputTextField from "@/components/form/InputTextField.vue";
import SelectBox from "@/components/form/SelectBox.vue";
import {useLocaleSettings} from "@/composables/useLocaleSettings.ts";
import {useForm} from "vee-validate";
import {ref} from "vue";
import MainButton from "@/components/buttons/MainButton.vue";
import {useCrudProductFields} from "@/modules/products/composables/useCrudProductFields.ts";
import {useFetchProductDetails} from "@/modules/products/composables/useFetchProductDetails.ts";
import SpinnerLoading from "@/components/UI/SpinnerLoading.vue";

const { t } = useLocaleSettings();
defineEmits(['close']);

const props = defineProps<{
    id: string
    methodMode: string
}>()


const { data, isLoading } = useFetchProductDetails(props.id)


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

const { onSubmit, isPending } = useCrudProductFields(props.methodMode, data);

</script>

<template>
  <div v-if="isLoading">
    <span class="flex justify-center items-center">
      <SpinnerLoading></SpinnerLoading>
    </span>
  </div>

  <form v-else
      class="grid grid-cols-2 tems-center gap-4 w-full"
      @submit="onSubmit"
  >
    <InputTextField
        :label="t('fields.productName')"
        name="name"
        :placeholder="t('fields.enterProductName')"
        required
        :disabled="methodMode === 'view'"
    />

    <InputTextField
        :label="t('fields.price')"
        name="price"
        :placeholder="t('fields.enterPrice')"
        required
        :disabled="methodMode === 'view'"
    />


    <SelectBox
        :label="t('fields.category')"
        name="category"
        :static-options="levels"
        optionLabel="label"
        optionValue="value"
        :placeholder="t('fields.selectCategory')"
        :disabled="methodMode === 'view'"
    />
    <SelectBox
        multi
        :label="t('fields.subCategories')"
        name="sub_categories"
        fetchOptionsUrl="sub_categories"
        optionLabel="label"
        optionValue="value"
        :placeholder="t('fields.selectSubCategories')"
        :disabled="methodMode === 'view'"
    />

    <MainButton
        v-if="methodMode !== 'view'"
        class="col-span-2"
        text="buttons.submit"
        type="submit"
        :loading="isPending"
    />
  </form>
</template>

<style scoped>

</style>