<script setup lang="ts">
import {ref} from "vue";
import MainDataTable from "@/components/table/MainDataTable.vue";
import placeholderImg from "@/assets/images/img_placeholder.jpg"
import {statusColor} from "@/constants/status.ts";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import EditIcon from "@/components/icons/EditIcon.vue";
import EyeFill from "@/components/icons/EyeFill.vue";
import IconButton from "@/components/buttons/IconButton.vue";
import MainModal from "@/components/UI/modals/MainModal.vue";
import TagAddForm from "@/modules/tags/components/TagAddForm.vue";
import TagEditForm from "@/modules/tags/components/TagEditForm.vue";
import TagsFilterForm from "@/modules/tags/components/TagsFilterForm.vue";
import useTagsFields from "@/modules/tags/composables/useTagsFields.ts";
import DeleteModal from "@/components/UI/modals/DeleteModal.vue";

const filters = ref({
  title: "",
  active: "",
  category: "",
  sub_categories: "",
});

const visibleAddForm = ref(false);
const visibleEditForm = ref(false);
const visibleDeleteModal = ref(false);
const tagId = ref('');
const methodMode = ref('');
const headerTitle = ref('');
const deleteData = ref();

const visibleAddProduct = () => {
  methodMode.value = 'add';
  visibleAddForm.value = true;
}

const visibleEditProduct = (id: string, method: string) => {
  tagId.value = id;
  methodMode.value = method;
  headerTitle.value = method === "view" ? "modal.viewTag" : "modal.editTag";
  visibleEditForm.value = true;
}
const visibleDelete = (data) => {
  deleteData.value = {
    id: data.id,
    text: data.name,
    url: 'dashboard/tags',
    key: 'dashboard/tags',
  };
  visibleDeleteModal.value = true;
  console.log(deleteData.value)
}

const { fields } = useTagsFields()

const reorderContent = (data) => {
  console.log(data)
}
</script>

<template>
  <MainModal
      v-model:visible="visibleAddForm"
      headerTitle="modal.addTag"
  >
    <TagAddForm @close="visibleAddForm = false" :methodMode="methodMode"  />
  </MainModal>

  <MainModal
      v-model:visible="visibleEditForm"
      :headerTitle="headerTitle"
  >
    <TagEditForm @close="visibleEditForm = false" :id="tagId" :methodMode="methodMode"  />
  </MainModal>

  <DeleteModal
      v-model:visible="visibleDeleteModal"
      headerTitle="modal.deleteTage"
      @close="visibleDeleteModal = false"
      :deleteData="deleteData"
  />

  <MainDataTable
      @reorder="reorderContent"
      sortable
      title="sidebar.tags"
      :columns="fields"
      list-url="dashboard/tags"
      :url-params="filters"
      :has-filter-btn="true"
      :show-action-icons="true"
      action-btn-title="buttons.addTag"
      class="text-neural-300 font-normal text-xs"
      @add-action-btn="visibleAddProduct"
  >

    <template #filters>
      <div class="w-full">
        <TagsFilterForm v-model:filters="filters" />
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

        <IconButton :tooltip-value="$t('buttons.delete')" is-delete-button @action="visibleDelete(data)">
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
    <template #active_status="data">
    <Badge :severity="statusColor[data.active_status] || 'secondary'" class="uppercase">{{$t(`status.${data.active_status}`)}}</Badge>
    </template>

  </MainDataTable>
</template>

<style scoped>
</style>
