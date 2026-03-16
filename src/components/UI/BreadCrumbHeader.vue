<template>
  <div class="flex items-center justify-between pb-4 border-b mb-6 w-full">
    <div class="flex flex-col md:flex-row gap-5 justify-between md:items-center w-full">
        <MainTitle
            class="text-primary-700"
            :title
            :breadcrumb-title="breadcrumbTitle"
            :route-name="backRouteName"
            :route-params="backRouteParams"
        />

      <div class="flex gap-4 items-center self-center">
        <slot name="btns" v-if="hasActionsBtns"></slot>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">



import MainTitle from "@/components/UI/MainTitle.vue";

defineProps<{
  title: string
  hasActionsBtns: boolean
  breadcrumbTitle?: string
  backRouteName?: string
  backRouteParams?: { [key: string]: string }
}>()
</script>

<style lang="scss" scoped></style>
