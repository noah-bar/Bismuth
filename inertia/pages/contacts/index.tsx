import { AppLayout } from '~/components/layouts/app-layout'
import { Paginated } from '~/types/paginated'
import { ReactNode } from 'react'
import { Box } from '~/components/shared/box'
import { SearchInput } from '~/components/shared/search-input'
import { ContactDataTable, ContactMenubar } from '~/features/contact'
import type { Contact } from '~/types/contact'

type IndexProps = {
  contacts: Paginated<Contact>
}
function Index({ contacts }: IndexProps) {
  return (
    <div className={'grid size-full grid-rows-[auto_1fr] gap-2'}>
      <Box>
        <div className={'max-w-[325px]'}>
          <SearchInput results={contacts.meta.total} />
        </div>
      </Box>
      <ContactDataTable data={contacts} />
    </div>
  )
}
Index.layout = (page: ReactNode) => <AppLayout header={<ContactMenubar />}>{page}</AppLayout>
export default Index
