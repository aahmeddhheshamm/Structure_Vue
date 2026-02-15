<script setup>
import MainButton from "@/components/buttons/MainButton.vue";
import InputTextField from "@/components/form/InputTextField.vue";
import InputPasswordField from "@/components/form/InputPasswordField.vue";
import {useLocaleSettings} from "@/composables/useLocaleSettings.ts";
import {useRegisterForm} from "@/modules/auth/composables/useRegisterForm.ts";
import CheckBoxField from "@/components/form/CheckBoxField.vue";

const { t } = useLocaleSettings();
const { onSubmit, isPending } = useRegisterForm();
</script>

<template>
  <form @submit="onSubmit" class="md:grid grid-cols-2 gap-y-1 gap-x-4 w-full">
    <InputTextField
        name="name"
        type="text"
        :label="t('fields.name')"
        required
        :placeholder="t('fields.enterName')"
    />
    <InputTextField
        name="email"
        type="email"
        :label="t('fields.email')"
        required
        :placeholder="t('fields.enterEmail')"
    />
    <InputPasswordField name="password" :label="t('fields.password')" :placeholder="t('fields.enterPassword')" required/>
    <InputPasswordField name="confirmPassword" :label="t('fields.confirmPassword')" :placeholder="t('fields.enterConfirmPassword')" required/>

    <MainButton
        class="col-span-2 w-full"
        text="buttons.register"
        type="submit"
        :loading="isPending"
    />

    <div class="col-span-2 flex gap-2 mt-8 text-center text-sm text-gray-500">
      <CheckBoxField name="agree_terms"  />
      <p>By continuing, you agree to our <a href="#" class="text-primary-600 hover:text-primary-700">Terms</a> and <a href="#" class="text-primary-600 hover:text-primary-700">Privacy Policy</a></p>
    </div>
  </form>
</template>
<style scoped>

</style>
