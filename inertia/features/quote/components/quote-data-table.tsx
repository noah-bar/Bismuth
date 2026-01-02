import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableHead,
  DataTableHeader,
  DataTableRow,
} from '@/components/ui/data-table'
import { useConfirm } from '@/hooks/use-confirm'
import { useI18n } from '@/hooks/use-i18n'
import { Paginated } from '@/types/paginated'
import { router } from '@inertiajs/react'
import { Quote } from '~/types/quote'
import { SortableDataTableHead } from '~/components/ui/sortable-data-table-head'
import { formatDate } from '~/lib/utils'
import { QuoteStatusBadge } from './quote-status-badge'
import type { MouseEvent } from 'react'
import { ActionDropdownMenu } from '~/components/shared/action-dropdown-menu'

type QuoteDataTableProps = {
  className?: string
  data: Paginated<Quote>
}

export function QuoteDataTable({ data, className }: QuoteDataTableProps) {
  const { t } = useI18n()
  const { confirm } = useConfirm()

  const handleDelete = async (e: MouseEvent<HTMLDivElement>, quote: Quote) => {
    e.stopPropagation()

    if (await confirm()) {
      router.delete(`/quotes/${quote.id}`, {
        preserveState: true,
        preserveScroll: true,
      })
    }
  }

  const handleClick = (quote: Quote) => {
    router.visit(`/quotes/${quote.id}`)
  }

  const handleEdit = (e: MouseEvent<HTMLDivElement>, quote: Quote) => {
    e.stopPropagation()
    router.visit(`/quotes/${quote.id}/edit`)
  }

  return (
    <DataTable data={data} className={className}>
      <DataTableHeader>
        <DataTableRow>
          <SortableDataTableHead sortKey={'title'}>
            {t('features.quote.quote-data-table.headers.title')}
          </SortableDataTableHead>
          <SortableDataTableHead sortKey={'date'}>
            {t('features.quote.quote-data-table.headers.date')}
          </SortableDataTableHead>
          <SortableDataTableHead sortKey={'offerTotalPrice'}>
            {t('features.quote.quote-data-table.headers.totalPrice')}
          </SortableDataTableHead>
          <SortableDataTableHead sortKey={'company.name'}>
            {t('features.quote.quote-data-table.headers.company')}
          </SortableDataTableHead>
          <SortableDataTableHead sortKey={'contact.fullName'}>
            {t('features.quote.quote-data-table.headers.contact')}
          </SortableDataTableHead>
          <SortableDataTableHead sortKey={'status'}>
            {t('features.quote.quote-data-table.headers.status')}
          </SortableDataTableHead>
          <DataTableHead>{t('features.quote.quote-data-table.headers.actions')}</DataTableHead>
        </DataTableRow>
      </DataTableHeader>
      <DataTableBody>
        {data.data.map((quote) => (
          <DataTableRow key={quote.id} onClick={() => handleClick(quote)}>
            <DataTableCell>{quote.title}</DataTableCell>
            <DataTableCell>{formatDate(quote.date)}</DataTableCell>
            <DataTableCell>
              {quote.taxIncluded ? quote.offerTotalPriceWithVat : quote.offerTotalPrice}{' '}
              {quote.currency}
            </DataTableCell>
            <DataTableCell>{quote.company?.name}</DataTableCell>
            <DataTableCell>{quote.contact.fullName}</DataTableCell>
            <DataTableCell>
              <div className={'w-full flex justify-center items-center'}>
                {<QuoteStatusBadge status={quote.status} />}
              </div>
            </DataTableCell>
            <DataTableCell>
              <ActionDropdownMenu
                onEdit={(e) => handleEdit(e, quote)}
                onDelete={(e) => handleDelete(e, quote)}
              />
            </DataTableCell>
          </DataTableRow>
        ))}
      </DataTableBody>
    </DataTable>
  )
}
