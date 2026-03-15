<script setup lang="ts">
import InputTextField from "@/components/form/InputTextField.vue";
import SelectBox from "@/components/form/SelectBox.vue";
import {useLocaleSettings} from "@/composables/useLocaleSettings.ts";
import {ref} from "vue";
import MainButton from "@/components/buttons/MainButton.vue";
import {useCrudTagFields} from "@/modules/tags/composables/useCrudTagFields.ts";

const { t } = useLocaleSettings();
const emit = defineEmits(['close']);

const props = defineProps<{
  methodMode: string
}>()


const tagsType = ref([
  { label: 'service', value: 1 },
  { label: 'product', value: 2 },
  { label: 'blog', value: 3 },
  { label: 'event', value: 4 }
])

const { onSubmit, isPending } = useCrudTagFields(props.methodMode, undefined, () => emit('close'));

</script>

<template>
  <form
      class="grid grid-cols-2 tems-center gap-4 w-full"
      @submit="onSubmit"
  >
    <InputTextField
        :label="t('fields.nameEn')"
        name="name.en"
        :placeholder="t('fields.enterNameEn')"
        required
    />

    <InputTextField
        :label="t('fields.nameAr')"
        name="name.ar"
        :placeholder="t('fields.enterNameAr')"
        required
    />


    <SelectBox
        multi
        :label="t('fields.tagType')"
        name="type"
        :static-options="tagsType"
        optionLabel="label"
        optionValue="value"
        :placeholder="t('fields.selectTagType')"
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