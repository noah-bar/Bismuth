import { Paginated } from '@/types/paginated'
import { cn } from '@/lib/utils'
import { DataTablePagination } from './data-table-pagination'
import { ComponentProps, ReactNode } from 'react'
import {
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './table'
import { Box } from '@/components/shared/box'

type DataTableProps<T = unknown> = {
  data?: Paginated<T>
  children: ReactNode
  className?: string
}

export function DataTable<T = unknown>({ data, children, className }: DataTableProps<T>) {
  return (
    <Box
      className={cn(
        'min-h-0 size-full grid text-center',
        data ? 'grid-rows-[1fr_auto]' : '',
        className
      )}
    >
      <div className={'relative w-full overflow-auto border border-border rounded-t'}>
        <table className={'w-full caption-bottom text-sm'}>{children}</table>
      </div>
      {data && <DataTablePagination data={data} />}
    </Box>
  )
}

type DataTableHeaderProps = ComponentProps<'thead'>
export function DataTableHeader({ className, children, ...props }: DataTableHeaderProps) {
  return (
    <TableHeader className={cn('sticky top-0 z-10 bg-muted h-12', className)} {...props}>
      {children}
    </TableHeader>
  )
}

type DataTableHeadProps = ComponentProps<'th'>
export function DataTableHead({ className, children, ...props }: DataTableHeadProps) {
  return (
    <TableHead className={cn('text-center', className)} {...props}>
      {children}
    </TableHead>
  )
}

// Re-export table components with DataTable prefix
export const DataTableBody = TableBody
export const DataTableFooter = TableFooter
export const DataTableRow = TableRow
export const DataTableCell = TableCell
export const DataTableCaption = TableCaption
