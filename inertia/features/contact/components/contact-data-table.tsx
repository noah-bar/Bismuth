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
import { Contact } from '~/types/contact'

type ContactDataTableProps = {
  className?: string
  data: Paginated<Contact>
}

export function ContactDataTable({ data, className }: ContactDataTableProps) {
  const { t } = useI18n()
  const { confirm } = useConfirm()

  const handleDelete = async (id: number) => {
    if (await confirm()) {
      router.delete(`/contacts/${id}`, {
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
              <div className={'flex gap-2 w-full justify-center items-center'}>
                <Button size={'icon'} variant={'ghost'} onClick={() => handleDelete(contact.id)}>
                  <TrashIcon />
                </Button>
                <Button size={'icon'} variant={'ghost'} asChild>
                  <Link href={`/contacts/${contact.id}/edit`}>
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
