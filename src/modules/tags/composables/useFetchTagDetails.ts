import useFetch from '@/composables/useFetch'
import {apiGetTagDetails} from '../api'

export function useFetchTagDetails(id: string) {
  const {
    data,
    isFetching,
    isSuccess,
    isLoading,
    refetch
  } = useFetch({
    queryKey: ['tag-details'],
    queryFn: async () => {
      return apiGetTagDetails(id)
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
