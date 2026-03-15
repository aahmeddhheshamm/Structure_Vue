<script setup lang="ts">
import InputTextField from "@/components/form/InputTextField.vue";
import SelectBox from "@/components/form/SelectBox.vue";
import {useLocaleSettings} from "@/composables/useLocaleSettings.ts";
import {ref} from "vue";
import MainButton from "@/components/buttons/MainButton.vue";
import SpinnerLoading from "@/components/UI/SpinnerLoading.vue";
import {useFetchTagDetails} from "@/modules/tags/composables/useFetchTagDetails.ts";
import {useCrudTagFields} from "@/modules/tags/composables/useCrudTagFields.ts";

const { t } = useLocaleSettings();
const emit = defineEmits(['close']);

const props = defineProps<{
    id: string
  methodMode: string
}>()


const { data, isLoading } = useFetchTagDetails(props.id)


const tagsType = ref([
  { label: 'service', value: 1 },
  { label: 'product', value: 2 },
  { label: 'blog', value: 3 },
  { label: 'event', value: 4 }
])

const { onSubmit, isPending } = useCrudTagFields(props.methodMode, data, () => emit('close'));

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
        :label="t('fields.nameEn')"
        name="name.en"
        :placeholder="t('fields.enterNameEn')"
        required
        :disabled="methodMode === 'view'"
    />

    <InputTextField
        :label="t('fields.nameAr')"
        name="name.ar"
        :placeholder="t('fields.enterNameAr')"
        required
        :disabled="methodMode === 'view'"
    />

    <SelectBox
        multi
        :label="t('fields.tagType')"
        name="type"
        :static-options="tagsType"
        optionLabel="label"
        optionValue="value"
        :placeholder="t('fields.selectTagType')"
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