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
import RoundedButton from "@/components/buttons/RoundedButton.vue";
import type {TagType} from "@/types/types";

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
const selectedRows = ref<number[]>([])

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
const visibleDelete = (data: TagType) => {
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

const reorderContent = (data: number[]) => {
  console.log(data)
}
const deleteSelectedTargets = () => {
  console.log('Selected ids', selectedRows.value)
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
      :multi-select="true"
      v-model:selected-rows="selectedRows"
  >

    <template #rowsSelectedActions>

        <RoundedButton
            class="!bg-black/10 !w-9 !h-9"
            v-if="selectedRows?.length"
            @action="deleteSelectedTargets"
            :tooltip-value="$t('deleteSelectedTags')"
        >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="15"
              viewBox="0 0 12 15"
              fill="none"
          >
            <path
                d="M8.47059 3.44007H12V2.72867H8.47059V1.96926C8.47059 1.40726 8.01706 0.950195 7.45941 0.950195H4.54059C3.98294 0.950195 3.52941 1.40726 3.52941 1.96926V2.72867H0V3.44007H3.52941H8.47059ZM4.23529 1.96926C4.23529 1.80031 4.37294 1.66159 4.54059 1.66159H7.45941C7.62706 1.66159 7.76471 1.80031 7.76471 1.96926V2.72867H4.23529V1.96926Z"
                class="fill-black/60"
            />
            <path
                d="M1.2356 4.68502H1.25677L1.87971 13.6966C1.92736 14.4275 2.53265 15.0002 3.25971 15.0002H8.74089C9.46795 15.0002 10.0732 14.4275 10.1209 13.6966L10.7438 4.68502H10.765V3.97363H1.2356V4.68502ZM7.58854 6.28566C7.58854 6.09002 7.74736 5.92996 7.94148 5.92996C8.1356 5.92996 8.29442 6.09002 8.29442 6.28566V12.866C8.29442 13.0617 8.1356 13.2217 7.94148 13.2217C7.74736 13.2217 7.58854 13.0617 7.58854 12.866V6.28566ZM5.64736 6.28566C5.64736 6.09002 5.80618 5.92996 6.0003 5.92996C6.19442 5.92996 6.35324 6.09002 6.35324 6.28566V12.866C6.35324 13.0617 6.19442 13.2217 6.0003 13.2217C5.80618 13.2217 5.64736 13.0617 5.64736 12.866V6.28566ZM3.70618 6.28566C3.70618 6.09002 3.86501 5.92996 4.05912 5.92996C4.25324 5.92996 4.41207 6.09002 4.41207 6.28566V12.866C4.41207 13.0617 4.25324 13.2217 4.05912 13.2217C3.86501 13.2217 3.70618 13.0617 3.70618 12.866V6.28566Z"
                class="fill-black/60"
            />
          </svg>
        </RoundedButton>

    </template>


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
