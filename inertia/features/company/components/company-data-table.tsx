import { Button } from '@/components/ui/button'
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableHead,
  DataTableHeader,
  DataTableRow,
} from '@/components/ui/data-table'
import { SortableDataTableHead } from '@/components/ui/sortable-data-table-head'
import { useConfirm } from '@/hooks/use-confirm'
import { useI18n } from '@/hooks/use-i18n'
import { Paginated } from '@/types/paginated'
import { Link, router } from '@inertiajs/react'
import { EditIcon, TrashIcon } from 'lucide-react'
import { Company } from '~/types/company'

type CompanyDataTableProps = {
  className?: string
  data: Paginated<Company>
}

export function CompanyDataTable({ data, className }: CompanyDataTableProps) {
  const { t } = useI18n()
  const { confirm } = useConfirm()

  const handleDelete = async (id: number) => {
    if (await confirm()) {
      router.delete(`/companies/${id}`, {
        preserveState: true,
        preserveScroll: true,
      })
    }
  }

  return (
    <DataTable data={data} className={className}>
      <DataTableHeader>
        <DataTableRow>
          <SortableDataTableHead sortKey={'name'}>
            {t('features.company.company-data-table.headers.name')}
          </SortableDataTableHead>
          <SortableDataTableHead sortKey={'address'}>
            {t('features.company.company-data-table.headers.address')}
          </SortableDataTableHead>
          <SortableDataTableHead sortKey={'postalCode'}>
            {t('features.company.company-data-table.headers.postalCode')}
          </SortableDataTableHead>
          <SortableDataTableHead sortKey={'city'}>
            {t('features.company.company-data-table.headers.city')}
          </SortableDataTableHead>
          <DataTableHead>{t('features.company.company-data-table.headers.actions')}</DataTableHead>
        </DataTableRow>
      </DataTableHeader>
      <DataTableBody>
        {data.data.map((company) => (
          <DataTableRow key={company.id}>
            <DataTableCell>{company.name}</DataTableCell>
            <DataTableCell>{company.address}</DataTableCell>
            <DataTableCell>{company.postalCode}</DataTableCell>
            <DataTableCell>{company.city}</DataTableCell>
            <DataTableCell>
              <div className={'flex gap-2 w-full justify-center items-center'}>
                <Button size={'icon'} variant={'ghost'} onClick={() => handleDelete(company.id)}>
                  <TrashIcon />
                </Button>
                <Button size={'icon'} variant={'ghost'} asChild>
                  <Link href={`/companies/${company.id}/edit`}>
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
