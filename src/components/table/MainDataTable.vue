<script setup lang="ts">
import { ref, computed, watch, watchEffect } from "vue";
import draggable from 'vuedraggable'
import useFetch from "@/composables/useFetch";
import Box from "@/components/UI/Box.vue";
import PagesHeader from "@/components/UI/PagesHeader.vue";
import { changeDateFormat } from "@/utils";
import InterceptorHelper from "@/InterceptorHelper";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import SpinnerLoading from "@/components/UI/SpinnerLoading.vue";
import TablePagination from "@/components/table/TablePagination.vue";

/* ===================== EMITS ===================== */

const emits = defineEmits([
  "update:searchQuery",
  "update:showSearchInput",
  "toggleFilter",
  "addActionBtn",
  "reorder"
]);

/* ===================== PROPS ===================== */

const props = defineProps({
  columns: { type: Array, required: true },
  items: { type: Array, default: () => [] },
  listUrl: { type: String, default: "" },

  title: String,
  hasPagination: { type: Boolean, default: true },
  hasSearchBtn: { type: Boolean, default: true },
  hasFilterBtn: { type: Boolean, default: true },
  actions: { type: Array, default: () => [] },

  urlParams: { type: Object, default: () => ({}) },
  showHeader: { type: Boolean, default: true },
  showAddBtn: { type: Boolean, default: true },
  showActionIcons: { type: Boolean, default: false },
  actionBtnTitle: String,
  actionBtnLoading: Boolean,
  sortable: { type: Boolean, default: false }
});

/* ===================== STATE ===================== */

const tableData = ref<any[]>([]);
const searchQuery = ref("");
const showSearchInput = ref(false);
const activeFilterSection = ref(false);

const page = ref(1);
const perPage = ref(10);
const pageSizes = [10, 25, 50, 100];
const pagination = ref({
  total: 0,
  lastPage: 1,
});

const orderBy = ref('')
const sortOrder = ref<'asc' | 'desc'>()
const sortedColumn = ref('')

/* ===================== MODE ===================== */

const isApiMode = computed(() => !!props.listUrl);

/* ===================== FETCH (API MODE ONLY) ===================== */

const { data, isLoading, isSuccess } = useFetch({
  enabled: isApiMode,
  queryKey: computed(() => [
    props.listUrl,
    page.value,
    perPage.value,
    searchQuery.value,
    orderBy.value,
    props.urlParams,
  ]),
  queryFn: async () => {
    return InterceptorHelper.intercept(props.listUrl, undefined, {
      page: page.value,
      per_page: perPage.value,
      search: searchQuery.value,
      ordering: orderBy.value,
      ...props.urlParams,
    });
  },
});

/* ===================== SYNC DATA ===================== */

watchEffect(() => {
  if (!isApiMode.value) {
    tableData.value = props.items;
    return;
  }

  if (isSuccess.value && data.value) {
    tableData.value = data.value.data;
    const p = data.value?.meta;
    // const p = data.value?.pagination;
    pagination.value = {
      total: p.total,
      lastPage: p.last_page,
    };
  }
});

/* ===================== WATCHERS ===================== */

watch(
    () => props.items,
    (val) => {
      if (!isApiMode.value) {
        tableData.value = val;
      }
    },
    { immediate: true }
);

watch([searchQuery, perPage, () => props.urlParams], () => {
  page.value = 1;
});

/* ===================== PAGINATION ===================== */

const nextPage = () => {
  if (page.value < pagination.value.lastPage) page.value++;
};

const prevPage = () => {
  if (page.value > 1) page.value--;
};

const toggleFilter = () => {
  activeFilterSection.value = !activeFilterSection.value;
};

const handlePerPageUpdate = (val: number) => {
  perPage.value = val;
  page.value = 1;
};

/* ===================== SORT ===================== */

const handleSort = (orderKey: string) => {
  if (sortOrder.value === 'desc' && sortedColumn.value === orderKey) {
    orderBy.value = `${orderKey?.replace('.', '__')}`
    sortOrder.value = 'asc'
  } else {
    orderBy.value = orderKey?.replace('.', '__')
    sortOrder.value = 'desc'
    sortedColumn.value = orderKey
  }
};

/* ===================== DRAG ===================== */

// Define drag options
const dragOptions = ref({
  animation: 200,
  group: 'description',
  disabled: !props.sortable,
  ghostClass: 'ghost'
})

// Define component-data if necessary
const componentData = ref({
  tag: 'tbody',
  name: 'flip-list',
  type: 'transition'
})

const reorderData = () => {
  emits(
      'reorder',
      tableData.value.map((data) => data.id)
  )
}
</script>

<template>
  <Box>
    <!-- Table Header-->
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
          @add="emits('addActionBtn')"
      />
    </template>

    <!-- Table Filter-->
    <transition name="fade" mode="out-in">
      <div v-if="activeFilterSection" class="mb-4">
        <slot name="filters" />
      </div>
    </transition>

    <!-- Table Body-->
    <div class="overflow-x-auto">
      <table  class="w-full">
        <thead>
          <tr class="bg-tableHeader transition-all duration-500 ">
            <th v-for="(column, index) in columns" :key="index">
              <div class="flex w-full items-center gap-[0.315rem]">
              <span class="cursor-pointer" @click="handleSort(column.ordering ? column.ordering : column.key)">
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
                         (sortedColumn === column.key || sortedColumn === column.ordering) &&
                            sortOrder === 'desc',
                    }"
                  />
                  <path
                      d="M10.7155 9.79503V6.06836H8.85213V9.79503H6.05713L9.7838 13.5217L13.5105 9.79503H10.7155Z"
                      fill="#D5D5D5"
                      :class="{
                      'fill-[#636364]':
                        (sortedColumn === column.key || sortedColumn === column.ordering) &&
                            sortOrder === 'asc',
                    }"
                  />
                </svg>
              </span>
                <h6 class="text-sm text-black/60 font-medium capitalize truncate">
                  {{ $t(column.label) }}
                </h6>
              </div>
            </th>
            <th
                v-if="showActionIcons || actions?.length"
                class="end-0 bg-tableHeader transition-all duration-500"
            >
              <h6 class="text-sm text-black/60 font-medium capitalize">actions</h6>
            </th>
          </tr>
        </thead>

        <tbody v-if="isLoading && columns">
          <tr>
          <td
              :colspan="`${columns.length + 1}`"
              class="p-6"
          >
          <span class="flex justify-center items-center">
            <SpinnerLoading></SpinnerLoading>
          </span>
          </td>
        </tr>
        </tbody>

        <tbody v-else-if="!tableData?.length && columns">
          <tr>
          <td
              :colspan="`${columns.length + 1}`"
              class="p-6 text-center"
          >
            <span class="text-sm text-neural-300">{{ $t('noRecordsFound') }}</span>
          </td>
        </tr>
        </tbody>

        <draggable
            v-else
            @change="reorderData"
            v-model="tableData"
            item-key="id"
            tag="tbody"
            class="list-group"
            :component-data="componentData"
            v-bind="dragOptions"
        >
          <template #item="{ element, index }">

            <tr :class="['whitespace-nowrap', { 'cursor-all-scroll': sortable }]">
              <td
                class="duration-300 max-w-[250px] py-6"
                v-for="column in columns"
                :key="column.key"
            >
              <slot
                  :name="`${column.key}`"
                  v-bind="element"
              >
                <div class="flex gap-2 items-center *:!text-sm max-w-full">

                  <!-- Date Type -->
                  <p
                      v-if="column.type === 'date'"
                      class="text-xs capitalize text-black truncate"
                  >
                    {{ changeDateFormat(element[column.key]) }}
                  </p>

                  <!-- Boolean False -->
                  <p
                      v-else-if="element[column.key] === false"
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
                      v-else-if="element[column.key] === true"
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
                      v-tooltip="`${element[column.key]}`"
                  >
                    {{ element[column.key] || "—" }}
                  </p>

                  <!-- Default -->
                  <p
                      v-else
                      class="text-xs text-black truncate"
                  >
                    {{ element[column.key] || "—" }}
                  </p>
                </div>
              </slot>
            </td>
              <td v-if="showActionIcons">
                <slot name="actions" v-bind="element"></slot>
              </td>
              <td v-else-if="actions?.length"
                  class="end-0"
              >
                <Menu as="div">
                  <MenuButton
                      class="relative p-2 flex items-center justify-center w-full"
                  >
                    <svg
                        class="flex-none size-4 hs-dropdown-open:text-white text-gray-600 dark:text-neutral-500 hs-dropdown-open:dark:text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg>

                    <transition
                        enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95"
                        enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95"
                    >
                      <MenuItems  v-if="actions?.length"
                                  class="absolute top-0 ltr:right-0 rtl:left-0 mt-2 w-48 z-50 bg-white rounded-xl shadow-xl focus:outline-none"
                      >
                        <MenuItem
                            class=""
                            v-for="action in actions"
                            :key="action.key"
                            v-slot="{ active }"
                        >
                          <button
                              @click="action.action(element)"
                              class="w-full flex items-center gap-3 px-4 py-2 text-sm text-left"
                              :class="active ? 'bg-primary-50' : ''"
                          >
                        <span
                            class="w-4"
                            v-if="action.icon"
                            v-html="action.icon"
                        />
                            <span>{{ action.text }}</span>
                          </button>
                        </MenuItem>
                      </MenuItems>
                    </transition>
                  </MenuButton>
                </Menu>
              </td>
            </tr>
          </template>

        </draggable>

      </table>
    </div>

    <!-- Pagination -->
    <div
          class="pt-3 flex items-center gap-3 justify-between flex-col lg:flex-row"
          v-if="hasPagination && !isLoading && tableData?.length"
      >
        <TablePagination :tableData="tableData" :page="page" :perPage="perPage" :pageSizes="pageSizes" :pagination="pagination" @prevPage="prevPage" @nextPage="nextPage" @update:perPage="handlePerPageUpdate"/>
      </div>

  </Box>
</template>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(50px);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-out;
}
</style>
