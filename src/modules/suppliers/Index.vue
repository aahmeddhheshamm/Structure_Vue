<script setup lang="ts">
import MainDataTable from "@/components/table/MainDataTable.vue";
import useSuppliersFields from "@/modules/suppliers/composables/useSuppliersFields.ts";

const { fields, actions, sampleData } = useSuppliersFields()

</script>

<template>
  <MainDataTable
      title="sidebar.suppliers"
      :columns="fields"
      :items="sampleData"
      :actions="actions"
      :has-filter-btn="false"
      :has-search-btn="false"
      :hasPagination="false"
      action-btn-title="buttons.addSupplier"
      class="text-neural-300 font-normal text-xs"
  >
    <template #image="data">
      <img
          v-if="data.image"
          :src="data.image"
          alt="product-image"
          class="w-[50px] h-[50px] rounded-[8px] object-cover"
      />
      <div
          v-else
          class="w-[50px] h-[50px] rounded-[8px] bg-gray-100 flex items-center justify-center"
      ></div>
    </template>
  </MainDataTable>
</template>

<style scoped>
</style>
