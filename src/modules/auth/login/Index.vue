<script setup>
import MainButton from "@/components/buttons/MainButton.vue";
import InputTextField from "@/components/form/InputTextField.vue";
import InputPasswordField from "@/components/form/InputPasswordField.vue";
import {useLocaleSettings} from "@/composables/useLocaleSettings.ts";
import {useLoginForm} from "@/modules/auth/composables/useLoginForm.ts";

const { t } = useLocaleSettings();
const { onSubmit, isPending } = useLoginForm();
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-1 w-full">
      <InputTextField
          name="email"
          type="email"
          :label="t('fields.email')"
          required
          :placeholder="t('fields.enterEmail')"
      />
      <InputPasswordField name="password" :label="t('fields.password')" :placeholder="t('fields.enterPassword')" required/>
      <div class="flex items-center justify-end pb-[21px]">
        <router-link
            to="/"
            class="text-primary-600 font-medium  text-sm"
        >
          {{ $t("auth.forgotPassword") }}
        </router-link>
      </div>
      <MainButton
          class="w-full"
          text="buttons.login"
          type="submit"
          :loading="isPending"
      />
    </form>
</template>
<style scoped>

</style>
