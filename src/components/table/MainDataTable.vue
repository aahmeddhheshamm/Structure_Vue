<script setup lang="ts">
import { defineProps, ref, computed, watch, onMounted } from 'vue';
import useFetch from '@/composables/useFetch';
import Box from '@/components/UI/Box.vue';
import MainTitle from '@/components/UI/MainTitle.vue';
import MainButton from '../buttons/MainButton.vue';
import InterceptorHelper from '@/InterceptorHelper';
import PagesHeader from "@/components/UI/PagesHeader.vue";
import FilterIcon from "@/components/icons/FilterIcon.vue";
import RowSelect from "@/components/table/RowSelect.vue";

// Define the emitted events
const emits = defineEmits(['openPopup', 'openFilter', 'openExport', 'reorder', 'update:searchQuery', 'update:showSearchInput', 'toggleFilter', 'add']);

// Define the props for your global table
const props = defineProps({
  columns: {
    type: Array as () => Array<{
      key: string;
      label: string;
      sortable?: boolean;
      ordering?: string;
      type?: string;
    }>,
    required: true,
  },
  items: {
    type: Array as () => Array<{ id: number; [key: string]: any }>,
    default: () => [],
  },
  listUrl: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  hasPagination: {
    type: Boolean,
    default: true,
  },
  hasSearchBtn: {
    type: Boolean,
    default: true,
  },
  hasFilterBtn: {
    type: Boolean,
    default: true,
  },
  actions: {
    type: Array as () => Array<any>,
    default: () => [],
  },
  sortable: {
    type: Boolean,
    default: false,
  },
  reloadData: {
    type: Boolean,
    default: false,
  },
  urlParams: {
    type: Object,
    default: () => ({}),
  },
  showHeader: {
    type: Boolean,
    default: true,
  },
  showAddBtn: {
    type: Boolean,
    default: true,
  },

  actionBtnTitle: {
    type: String,
    default: '',
  },
  actionBtnLoading: {
    type: Boolean,
    default: false,
  },
  multiSelect: {
    type: Boolean,
    default: false,
  },
});

// Table state
const tableData = ref(props.items || []);
const pagination = ref({
  total: 0,
  next: null,
  previous: null,
  perPage: 10,
  page: 1,
});

const searchQuery = ref('');
const orderBy = ref('');
const sortOrder = ref<'asc' | 'desc' | null>(null);
const loadingData = ref(false);
const placeholderData = ref(false);
const showSearchInput = ref(false);

// URL Params for fetching
const urlParams = computed(() => props.urlParams || {});

watch(urlParams, () => {
  pagination.value.page = 1;
});

// Fetch data using the useFetch composable
onMounted(() => {
  if (props.listUrl) {
    fetchData();
  } else {
    tableData.value = props.items;
  }
});

watch(
    () => props.items,
    (newItems) => {
      if (!props.listUrl) {
        tableData.value = newItems;
      }
    },
    { immediate: true }
);


const fetchData = async () => {
  loadingData.value = true;
  const { data, isLoading, isSuccess, isPlaceholderData } = useFetch({
    queryKey: [props.listUrl, searchQuery, orderBy],
    queryFn: async () => {
      return InterceptorHelper.intercept(`${props.listUrl}/`, undefined, {
        page: pagination.value.page,
        page_size: pagination.value.perPage,
        search: searchQuery.value,
        ordering: orderBy.value,
        ...urlParams.value,
      });
    },
  });

  loadingData.value = isLoading.value;
  if (isSuccess) {
    tableData.value = data.value?.results || [];
    pagination.value.total = data.value?.count || 0;
    pagination.value.next = data.value?.next;
    pagination.value.previous = data.value?.previous;
    placeholderData.value = isPlaceholderData.value;
  }
};

// Pagination handlers
const prevPage = () => {
  pagination.value.page = Math.max(pagination.value.page - 1, 1);
  fetchData();
};

const nextPage = () => {
  if (pagination.value.next !== null) {
    pagination.value.page += 1;
    fetchData();
  }
};

export interface SortState {
  orderBy: string;
  sortOrder: "asc" | "desc" | undefined;
  sortedColumn: string;
}

const sortState = ref<SortState>({
  orderBy: "",
  sortOrder: undefined,
  sortedColumn: "",
});

const handleSort = (orderKey: string) => {
  if (
      sortState.value.sortOrder === "desc" &&
      sortState.value.sortedColumn === orderKey
  ) {
    sortState.value.orderBy = `-${orderKey?.replace(".", "__")}`;
    sortState.value.sortOrder = "asc";
  } else {
    sortState.value.orderBy = orderKey?.replace(".", "__");
    sortState.value.sortOrder = "desc";
    sortState.value.sortedColumn = orderKey;
  }
  fetchData();
};

// Search handler
const cancelSearch = () => {
  showSearchInput.value = false;
  searchQuery.value = '';
  fetchData();
};
const activeFilterSection = ref(false)
const toggleFilter = () => {
  activeFilterSection.value = !activeFilterSection.value
}
</script>

<template>
  <Box>
    <template #header v-if="showHeader">
      <PagesHeader
          :title="title"
          :totalItems="pagination.total"
          :hasSearchBtn="hasSearchBtn"
          :showSearchInput="showSearchInput"
          :searchQuery="searchQuery"
          :hasFilterBtn="hasFilterBtn"
          :activeFilterSection="activeFilterSection"
          :showAddBtn="showAddBtn"
          :actionBtnTitle="actionBtnTitle"
          :actionBtnLoading="actionBtnLoading"
          @update:searchQuery="searchQuery = $event"
          @update:showSearchInput="showSearchInput = $event"
          @toggleFilter="toggleFilter"
          @add="emits('add')"
      />
    </template>
    <transition name="out-in">
      <div v-if="activeFilterSection" class="mb-4">
        <slot name="filters" />
      </div>
    </transition>
    <!-- Table -->
    <table class="table-auto w-full ">
      <thead>

      <tr class="bg-tableHeader transition-all duration-500 ">
        <th v-for="(column, index) in columns" :key="index">
          <div class="flex w-full items-center gap-[0.315rem]">
          <span class="cursor-pointer" @click="column.sortable && handleSort(column.key)">
             <svg
                 xmlns="http://www.w3.org/2000/svg"
                 width="14"
                 height="14"
                 viewBox="0 0 14 14"
                 fill="none"
                 v-if="column?.sortable"
             >
              <path
                  d="M4.19371 0.478516L0.467041 4.20519H3.26204V7.93186H5.12538V4.20519H7.92038L4.19371 0.478516Z"
                  fill="#D5D5D5"
                  :class="{
                  'fill-[#636364]':
                    (sortState.sortedColumn === column.key ||
                      sortState.sortedColumn === column.ordering) &&
                    sortState.sortOrder === 'desc',
                }"
              />
              <path
                  d="M10.7155 9.79503V6.06836H8.85213V9.79503H6.05713L9.7838 13.5217L13.5105 9.79503H10.7155Z"
                  fill="#D5D5D5"
                  :class="{
                  'fill-[#636364]':
                    (sortState.sortedColumn === column.key ||
                      sortState.sortedColumn === column.ordering) &&
                    sortState.sortOrder === 'asc',
                }"
              />
            </svg>
          </span>
            <h6 class="text-xs text-black/60 font-light capitalize">
              {{ column.label }}
            </h6>
          </div>
        </th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(row, index) in tableData" :key="index">

        <td
            class="duration-300 max-w-[250px]"
            v-for="column in columns"
            :key="column.key"
            :class="{
            'py-6': !customClass,
          }"
        >
          <slot
              :name="`${column.key}`"
              v-bind="row"
          >
            <div class="flex gap-2 items-center *:!text-sm max-w-full">
              <p
                  v-if="column.type === 'rounded-char'"
                  class="text-sm capitalize text-black truncate"
              >
                {{ row[column.key] || "—" }}
              </p>

              <!-- Date Type -->
<!--              <p-->
<!--                  v-else-if="column.type === 'date'"-->
<!--                  class="text-xs capitalize text-black"-->
<!--              >-->
<!--                {{ changeDateFormat(row[column.key]) }}-->
<!--              </p>-->

              <!-- Boolean False -->
              <p
                  v-else-if="row[column.key] === false"
                  class="flex justify-start items-center w-full"
              >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 448 512"
                >
                  <path
                      fill="rgb(200, 15, 15)"
                      d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm79 143c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
                  />
                </svg>
              </p>

              <!-- Boolean True -->
              <p
                  v-else-if="row[column.key] === true"
                  class="flex justify-start items-center w-full"
              >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 448 512"
                >
                  <path
                      fill="#22c55e"
                      d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                  />
                </svg>
              </p>

              <!-- Tooltip -->
              <p
                  v-else-if="column.hasTooltip"
                  class="text-xs text-black truncate"
                  v-tooltip="`${row[column.key]}`"
              >
                {{ row[column.key] || "—" }}
              </p>

              <!-- Default -->
              <p
                  v-else
                  class="text-xs text-black truncate"
              >
                {{ row[column.key] || "—" }}
              </p>
            </div>
          </slot>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div
        class="pt-3 flex items-center gap-3 justify-between flex-col lg:flex-row"
        v-if="hasPagination && !loadingData"
    >
<!--      <small>-->
<!--        {{ $t('dataTable.pagination.total') }} <strong>{{ meta.totalCount || 0 }}</strong-->
<!--      >, {{ $t('dataTable.pagination.showed') }} <strong>{{ first }}</strong>-->
<!--        {{ $t('dataTable.pagination.to') }}-->
<!--        <strong>{{ to }}</strong>-->
<!--      </small>-->
      <Paginator
          :alwaysShow="true"
          :pageLinkSize="pagination.perPage"
          :rows="5"
          :first="1"
          :rowsPerPageOptions="[10, 25, 50, 100]"
          :totalRecords="pagination.total"
          class="px-0 bg-transparent"
          @page=""
      >
      </Paginator>
    </div>
  </Box>
</template>

<style scoped>
/* Add scoped styles for table, pagination, etc. */
</style>
