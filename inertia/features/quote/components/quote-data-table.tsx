import { Button } from '@/components/ui/button'
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
import { Link, router } from '@inertiajs/react'
import { EditIcon, TrashIcon } from 'lucide-react'
import { Quote } from '~/types/quote'
import { SortableDataTableHead } from '~/components/ui/sortable-data-table-head'
import { formatDate } from '~/lib/utils'

type QuoteDataTableProps = {
  className?: string
  data: Paginated<Quote>
}

export function QuoteDataTable({ data, className }: QuoteDataTableProps) {
  const { t } = useI18n()
  const { confirm } = useConfirm()

  const handleDelete = async (id: number) => {
    if (await confirm()) {
      router.delete(`/quotes/${id}`, {
        preserveState: true,
        preserveScroll: true,
      })
    }
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
          <SortableDataTableHead sortKey={'totalPrice'}>
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
          <DataTableRow key={quote.id}>
            <DataTableCell>{quote.title}</DataTableCell>
            <DataTableCell>{formatDate(quote.date)}</DataTableCell>
            <DataTableCell>
              {quote.totalPrice} {quote.currency}
            </DataTableCell>
            <DataTableCell>{quote.company.name}</DataTableCell>
            <DataTableCell>{quote.contact.fullName}</DataTableCell>
            <DataTableCell>{t(`features.quote.status.${quote.status}`)}</DataTableCell>
            <DataTableCell>
              <div className={'flex gap-2 w-full justify-center items-center'}>
                <Button size={'icon'} variant={'ghost'} onClick={() => handleDelete(quote.id)}>
                  <TrashIcon />
                </Button>
                <Button size={'icon'} variant={'ghost'} asChild>
                  <Link href={`/quotes/${quote.id}/edit`}>
                    <EditIcon />
                  </Link>
                </Button>
              </div>
            </DataTableCell>
          </DataTableRow>
        ))}
      </DataTableBody>
    </DataTable>
  )
}
