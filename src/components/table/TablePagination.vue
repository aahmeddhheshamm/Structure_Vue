<script setup lang="ts">
const emits = defineEmits<{
  (e: 'prevPage'): void;
  (e: 'nextPage'): void;
  (e: 'update:perPage', value: number): void;
}>();

 withDefaults(defineProps<{
  tableData: any[];
  pageSizes?: number[];
  page?: number;
  perPage?: number;
  pagination: {};
}>(), {
  pageSizes: () => [10, 25, 50, 100],
  page: 1,
  perPage: 10
});

</script>

<template>
  <p class="text-xs font-normal text-black/60">
    {{ $t('pagination.showing') }} {{ tableData?.length }} {{ $t('pagination.resultsOf') }} {{ pagination?.total }} {{ $t('pagination.entries') }}
  </p>
  <div class="flex items-center gap-4">
    <p class="text-black font-normal">{{ $t('pagination.page') }}</p>
    <div class="flex items-center gap-[0.9rem]">
            <span class="cursor-pointer px-2 py-4" @click="emits('prevPage')">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="4"
                  height="6"
                  viewBox="0 0 4 6"
                  fill="none"
                  class="rtl:rotate-180"
              >
                <path
                    d="M3.5 5.03105L3.5 1.20527C3.5 0.778098 2.99894 0.547643 2.6746 0.825646L0.4429 2.73854C0.210094 2.93808 0.210094 3.29824 0.4429 3.49779L2.6746 5.41068C2.99894 5.68868 3.5 5.45823 3.5 5.03105Z"
                    :fill="page == 1 ? 'rgba(3,118,249,0.42)' : '#0376F9'"
                />
              </svg>
            </span>
      <div
          class="rounded-full text-[#fff] bg-primary-700 flex justify-center items-center font-normal text-sm px-2"
      >
        {{ page }} / {{ pagination?.lastPage }}
      </div>
      <span class="cursor-pointer px-2 py-4" @click="emits('nextPage')">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="4"
                  height="6"
                  viewBox="0 0 4 6"
                  fill="none"
                  class="rtl:rotate-180"
              >
                <path
                    d="M0.5 1.20527L0.5 5.03105C0.5 5.45823 1.00106 5.68868 1.3254 5.41068L3.5571 3.49779C3.78991 3.29824 3.78991 2.93808 3.5571 2.73854L1.3254 0.825646C1.00106 0.547643 0.5 0.778098 0.5 1.20527Z"
                    :fill="
                    page == Math.ceil(pagination?.total!! / perPage)
                      ? 'rgba(3,118,249,0.42)'
                      : '#0376F9'
                  "
                />
              </svg>
            </span>
    </div>
    <select
        :value="perPage"
        @change="e => emits('update:perPage', Number((e.target as HTMLSelectElement).value))"
        class="py-1 bg-white text-black px-3 text-sm border-0 outline-0 border-b-2 border-primary-700 focus:shadow-none focus:ring-0"
    >
      <option v-for="i in pageSizes">{{ i }}</option>
    </select>
  </div>
</template>

<style scoped>

</style>