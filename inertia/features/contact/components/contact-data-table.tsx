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
import { Contact } from '~/types/contact'
import { ActionDropdownMenu } from '~/components/shared/action-dropdown-menu'
import { MouseEvent } from 'react'

type ContactDataTableProps = {
  className?: string
  data: Paginated<Contact>
}

export function ContactDataTable({ data, className }: ContactDataTableProps) {
  const { t } = useI18n()
  const { confirm } = useConfirm()

  const handleEdit = async (e: MouseEvent<HTMLDivElement>, contact: Contact) => {
    e.stopPropagation()
    router.visit(`/contacts/${contact.id}/edit`)
  }

  const handleDelete = async (e: MouseEvent<HTMLDivElement>, contact: Contact) => {
    e.stopPropagation()

    if (await confirm()) {
      router.delete(`/contacts/${contact.id}`, {
        preserveState: true,
        preserveScroll: true,
      })
    }
  }

  return (
    <DataTable data={data} className={className}>
      <DataTableHeader>
        <DataTableRow>
          <SortableDataTableHead sortKey={'fullName'}>
            {t('features.contact.contact-data-table.headers.fullName')}
          </SortableDataTableHead>
          <SortableDataTableHead sortKey={'email'}>
            {t('features.contact.contact-data-table.headers.email')}
          </SortableDataTableHead>
          <DataTableHead>{t('features.contact.contact-data-table.headers.actions')}</DataTableHead>
        </DataTableRow>
      </DataTableHeader>
      <DataTableBody>
        {data.data.map((contact) => (
          <DataTableRow key={contact.id}>
            <DataTableCell>{contact.fullName}</DataTableCell>
            <DataTableCell>{contact.email}</DataTableCell>
            <DataTableCell>
              <ActionDropdownMenu
                onEdit={(e) => handleEdit(e, contact)}
                onDelete={(e) => handleDelete(e, contact)}
              />
            </DataTableCell>
          </DataTableRow>
        ))}
      </DataTableBody>
    </DataTable>
  )
}
