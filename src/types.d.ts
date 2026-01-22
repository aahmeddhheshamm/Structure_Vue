type TypePaggination = {
  page: number
  take: number
  itemsPerPage: number
  total: number
  pageCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

type TypeResponse = {
 results: Array<T>
 count: number
 next: string | null,
 previous: string | null
 message: string
}

type TypeResponseError = Partial<Error> & {
  message: string
}
