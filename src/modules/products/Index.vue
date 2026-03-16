<script setup lang="ts">
import {ref} from "vue";
import MainDataTable from "@/components/table/MainDataTable.vue";
import ProductsFilterForm from "@/modules/products/components/ProductsFilterForm.vue";
import useProductsFields from "@/modules/products/composables/useProductsFields.ts";
import placeholderImg from "@/assets/images/img_placeholder.jpg"
import {statusColor} from "@/constants/status.ts";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import EditIcon from "@/components/icons/EditIcon.vue";
import EyeFill from "@/components/icons/EyeFill.vue";
import IconButton from "@/components/buttons/IconButton.vue";
import ProductAddForm from "@/modules/products/components/ProductAddForm.vue";
import MainModal from "@/components/UI/modals/MainModal.vue";
import ProductEditForm from "@/modules/products/components/ProductEditForm.vue";
import {useI18n} from "vue-i18n";

const { t } = useI18n();
const filters = ref({
  title: "",
  active: "",
  category: "",
  sub_categories: "",
  test: "",
});
const { fields } = useProductsFields()
const visibleAddForm = ref(false);
const visibleEditForm = ref(false);
const productId = ref('');
const methodMode = ref('');
const headerTitle = ref('');

const visibleAddProduct = (method: string) => {
  methodMode.value = method;
  visibleAddForm.value = true;
}

const visibleEditProduct = (id: string, method: string) => {
  productId.value = id;
  methodMode.value = method;
  headerTitle.value = method === "view" ? "modal.viewProduct" : "modal.editProduct";
  visibleEditForm.value = true;
}
</script>

<template>
  <MainModal
      v-model:visible="visibleAddForm"
      headerTitle="modal.addProduct"
  >
    <ProductAddForm @close="visibleAddForm = false" :methodMode="methodMode"  />
  </MainModal>

  <MainModal
      v-model:visible="visibleEditForm"
      :headerTitle="headerTitle"
  >
    <ProductEditForm @close="visibleEditForm = false" :id="productId" :methodMode="methodMode"  />
  </MainModal>

  <MainDataTable
      :title="t('sidebar.products')"
      :columns="fields"
      list-url="product"
      :url-params="filters"
      :has-filter-btn="true"
      :show-action-icons="true"
      action-btn-title="buttons.addProduct"
      class="text-neural-300 font-normal text-xs"
      @add-action-btn="visibleAddProduct"
  >

    <template #filters>
      <div class="w-full">
        <ProductsFilterForm v-model:filters="filters" />
      </div>

    </template>
    <template #actions="data">
      <div class="flex items-center justify-center gap-3">

        <IconButton :tooltip-value="$t('buttons.view')" @action="visibleEditProduct(data.id, 'view')">
          <EyeFill/>
        </IconButton>

        <IconButton :tooltip-value="$t('buttons.edit')" @action="visibleEditProduct(data.id, 'edit')">
          <EditIcon/>
        </IconButton>

        <IconButton :tooltip-value="$t('buttons.delete')" is-delete-button>
          <DeleteIcon />
        </IconButton>
      </div>
    </template>
    <template #company_image="data">
        <img
            :src="data.main_image?.original_url ?? placeholderImg"
            alt="product-image"
            class="w-[50px] h-[50px] rounded-[8px] object-cover"
        />
    </template>
    <template #status="data">
    <Badge :severity="statusColor[data.status] || 'secondary'" class="uppercase">{{$t(`status.${data.status}`)}}</Badge>
    </template>

  </MainDataTable>
</template>

<style scoped>
</style>
