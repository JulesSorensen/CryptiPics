export interface PaginationMeta {
  itemsPerPage: number
  totalItems: number
  currentPage: number
  totalPages: number
  sortBy?: string[]
  filter?: {
    [key: string]: string
  }
}

export interface Paginated<T extends {}> {
  data: T[]
  meta: PaginationMeta
  links: {
    current: string
    next: string
    last: string
  }
}

export interface ApiFilters {
  limit?: number
  search?: string
  page?: number
}

export interface ApiError {
  statusCode: number
  error?: string
  message?: string
}

export const isApiError = (x: any): x is ApiError => {
  return typeof x.statusCode === 'number'
}
