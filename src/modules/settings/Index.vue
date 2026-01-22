<script setup lang="ts">
import MainDataTable from "@/components/table/MainDataTable.vue";
import useProductsFields from "@/modules/settings/composables/useProductsFields.ts";
import ProductsFilterForm from "@/modules/settings/components/ProductsFilterForm.vue";
import {ref} from "vue";

const filters = ref({
  translations__level: "",
  translations__scope: "",
  active: "",
});
const { fields, actions, sampleData } = useProductsFields()

</script>

<template>
  <MainDataTable
      title="Courses"
      :columns="fields"
      :items="sampleData"
      :has-count-circle="true"
      :has-filter-btn="true"
      action-btn-title="New Course"
      class="text-neural-300 font-normal text-xs"
  >

    <template #filters>
      <div class="w-full">
        <ProductsFilterForm v-model:filters="filters" />
      </div>
    </template>

  </MainDataTable>
</template>

<style scoped>
</style>
