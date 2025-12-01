import { AppLayout } from '~/components/layouts/app-layout'
import { CompanyDataTable, CompanyMenubar } from '~/features/company'
import { Paginated } from '~/types/paginated'
import { ReactNode } from 'react'
import { Box } from '~/components/shared/box'
import { SearchInput } from '~/components/shared/search-input'
import { Company } from '~/types/company'

type IndexProps = {
  companies: Paginated<Company>
}
function Index({ companies }: IndexProps) {
  return (
    <div className={'grid size-full grid-rows-[auto_1fr] gap-2'}>
      <Box>
        <div className={'max-w-[325px]'}>
          <SearchInput results={companies.meta.total} />
        </div>
      </Box>
      <CompanyDataTable data={companies} />
    </div>
  )
}
Index.layout = (page: ReactNode) => <AppLayout header={<CompanyMenubar />}>{page}</AppLayout>
export default Index
