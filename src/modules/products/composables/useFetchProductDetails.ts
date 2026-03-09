import useFetch from '@/composables/useFetch'
import {apiGetProductDetails} from '../api'

export function useFetchProductDetails(id: string) {
  const {
    data,
    isFetching,
    isSuccess,
    isLoading,
    refetch
  } = useFetch({
    queryKey: ['product'],
    queryFn: async () => {
      return apiGetProductDetails(id)
    }
  })

  return {
    data,
    isFetching,
    isSuccess,
    isLoading,
    refetch
  }
}
