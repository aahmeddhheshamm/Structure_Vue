<template>
  <h5 class="font-normal flex items-center gap-2 text-black text-base capitalize">
    <slot>
      <svg width="7" height="20" viewBox="0 0 7 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0.668945 3C0.668945 1.34315 2.01209 0 3.66895 0C5.3258 0 6.66895 1.34315 6.66895 3V10H0.668945V3Z"
          fill="#0376F9"
        />
        <path
          d="M0.668945 10H6.66895V17C6.66895 18.6569 5.3258 20 3.66895 20C2.01209 20 0.668945 18.6569 0.668945 17V10Z"
          fill="#0376F9"
        />
      </svg>
    </slot>

    <span v-if="breadcrumbTitle" class="!text-black flex items-center gap-3">
      <span class="cursor-pointer" @click="$router.push({ name: routeName })">{{
        breadcrumbTitle
      }}</span>
      <svg
        width="10"
        height="13"
        viewBox="0 0 10 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.0255843 0.528423L5.90197 6.48787L0 12.47C0.793113 12.47 1.58623 12.476 2.37934 12.4879C2.20345 12.4879 2.99656 12.4733 3.65855 12.4879L9.57492 6.48787L3.67454 0.512207C2.45769 0.523558 1.25043 0.526802 0.0255843 0.528423Z"
          fill="#606075"
        />
      </svg>
    </span>

    <slot name="custom">{{ title }}</slot>
  </h5>
</template>

<script setup lang="ts">

import {useI18n} from "vue-i18n";

const { t } = useI18n();
defineProps({
  title: {
    type: String,
    default: ''
  },
  breadcrumbTitle: {
    type: String,
    default: ''
  },
  routeName: {
    type: String
  },
  extra: {
    type: String
  }
})
</script>

<style scoped></style>
