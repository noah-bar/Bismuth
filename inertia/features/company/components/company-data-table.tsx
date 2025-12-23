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
import { router } from '@inertiajs/react'
import { Company } from '~/types/company'
import { ActionDropdownMenu } from '~/components/shared/action-dropdown-menu'
import { MouseEvent } from 'react'

type CompanyDataTableProps = {
  className?: string
  data: Paginated<Company>
}

export function CompanyDataTable({ data, className }: CompanyDataTableProps) {
  const { t } = useI18n()
  const { confirm } = useConfirm()

  const handleEdit = (e: MouseEvent<HTMLDivElement>, company: Company) => {
    e.stopPropagation()
    router.visit(`/companies/${company.id}/edit`)
  }

  const handleDelete = async (e: MouseEvent<HTMLDivElement>, company: Company) => {
    e.stopPropagation()

    if (await confirm()) {
      router.delete(`/companies/${company.id}`, {
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
              <ActionDropdownMenu
                onEdit={(e) => handleEdit(e, company)}
                onDelete={(e) => handleDelete(e, company)}
              />
            </DataTableCell>
          </DataTableRow>
        ))}
      </DataTableBody>
    </DataTable>
  )
}
