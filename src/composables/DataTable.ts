//@ts-ignore
import { ref, computed } from 'vue'
//@ts-ignore
import type { IDataTableMeta } from '@types'
import type { PageState } from 'primevue'
//@ts-ignore
// import useCrudOperations from './composables/useCrudOperations.js'

// const { getData, loading: loadingData } = useCrudOperations()
export { loadingData } //for loading data
export const data = ref<any[]>([])
export const meta = ref<IDataTableMeta>({
  page: 1,
  rows: 10, //per-page
  totalCount: 0,
  optionalParams: {},
})
//pagination information ex:-Total results 0, Show results from 0 To 0
export const first = computed<number>(() => {
  let first = meta.value.page * meta?.value?.rows - (meta?.value?.rows - 1)
  if (!data?.value?.length) {
    return 0
  }
  return first
})
export const to = computed<number>(() => {
  let to = meta.value.page * meta?.value?.rows
  if (to > meta.value.totalCount) {
    to = meta.value.totalCount
  }
  return to
})
const currentUrl = ref<string>('')
export function setUrl(url: string): void {
  currentUrl.value = url
}
//pagination
export async function onChangePage(newMeta: PageState): Promise<void> {
  let newPage = newMeta.page + 1
  let newRows = newMeta.rows
  if (meta.value.page === newPage && meta.value.rows === newRows) {
    return
  }
  meta.value.page = newPage
  meta.value.rows = newRows
  // await fetchData()
}
export function handleOptionalParams(): Record<string, any> {
  return {
    ...meta.value.optionalParams,
  }
}
//get data
// export async function fetchData(): Promise<void> {
//   if (!currentUrl.value) {
//     return
//   }
//   if (meta.value.page < 1) {
//     meta.value.page = 1
//   }
//   data.value = []
//   selected.value = []
//   await getData(currentUrl.value, {
//     params: {
//       page: meta.value.page,
//       per_page: meta.value.rows,
//       ...handleOptionalParams(),
//     },
//     //@ts-ignore
//     onSuccess: (responseData) => {
//       if (responseData) {
//         if (
//           !responseData.data?.length &&
//           responseData.pagination?.current_page &&
//           responseData.pagination?.current_page > 1 &&
//           meta.value.page &&
//           meta.value.page > 1
//         ) {
//           meta.value.page--
//           fetchData()
//         }
//         if (responseData.data && Array.isArray(responseData.data) && responseData.data.length) {
//           data.value = responseData.data
//         }
//         meta.value.page = responseData.pagination?.current_page ?? 1
//         meta.value.totalCount = responseData.pagination?.total ?? 1
//       }
//     },
//     //@ts-ignore
//     onError: (_) => {
//
//     },
//   })
// }
export const visibleFilters = ref<boolean>(false)
export const selected = ref<any[]>([])
export const selectAll = computed({
  get: (): boolean => {
    return data.value?.length ? selected.value.length === data.value.length : false
  },
  set: (value: boolean): void => {
    const newSelected: any[] = []
    if (value) {
      data.value.forEach((row: any) => {
        //@ts-ignore
        if (typeof row === 'object' && Object.hasOwn(row, 'id')) {
          newSelected.push(row.id)
        }
      })
    }
    selected.value = newSelected
  },
})
export const emptyData = computed<boolean>(() => !data?.value?.length)
export function resetTable(): void {
  selected.value = []
  visibleFilters.value = false
  setUrl('')
  meta.value = {
    page: 1,
    rows: 10,
    totalCount: 0,
    optionalParams: {},
  }
  data.value = []
}
