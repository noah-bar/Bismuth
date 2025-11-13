export type Paginated<T> = {
  data: T[]
  meta: {
    currentPage: number
    firstPage: number
    firstPageUrl: string
    lastPage: number
    lastPageUrl: string
    nextPageUrl: string | null
    perPage: number
    previousPageUrl: string | null
    total: number
  }
}
