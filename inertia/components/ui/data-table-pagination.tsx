import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination,
} from '@/components/ui/pagination'
import { Paginated } from '@/types/paginated'

type PaginationProps = {
  data: Paginated<unknown>
  maxPages?: number
}

export function DataTablePagination({ data, maxPages = 5 }: PaginationProps) {
  const { currentPage, lastPage, previousPageUrl, nextPageUrl } = data.meta

  const getVisiblePages = () => {
    if (lastPage <= maxPages) {
      return Array.from({ length: lastPage }, (_, i) => i + 1)
    }

    const sidePages = Math.floor((maxPages - 3) / 2)
    const pages: (number | 'ellipsis')[] = []

    pages.push(1)

    let start = Math.max(2, currentPage - sidePages)
    let end = Math.min(lastPage - 1, currentPage + sidePages)

    if (currentPage <= sidePages + 1) {
      end = Math.min(lastPage - 1, maxPages - 1)
    } else if (currentPage >= lastPage - sidePages) {
      start = Math.max(2, lastPage - maxPages + 2)
    }

    if (start > 2) {
      pages.push('ellipsis')
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (end < lastPage - 1) {
      pages.push('ellipsis')
    }

    if (lastPage > 1) {
      pages.push(lastPage)
    }

    return pages
  }

  const visiblePages = getVisiblePages()

  const getPageUrl = (page: number) => {
    if (typeof window === 'undefined') return '#'

    const url = new URL(window.location.href)
    url.searchParams.set('page', page.toString())
    return url.pathname + url.search
  }

  return (
    <Pagination className={'border border-border border-t-0 py-2 rounded-b'}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious disabled={!previousPageUrl} href={previousPageUrl || '#'} />
        </PaginationItem>

        {visiblePages.map((pageNumber, index) => {
          if (pageNumber === 'ellipsis') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }

          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink isActive={pageNumber === currentPage} href={getPageUrl(pageNumber)}>
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNext disabled={!nextPageUrl} href={nextPageUrl || '#'} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
