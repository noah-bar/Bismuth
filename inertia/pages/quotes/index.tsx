import { AppLayout } from '~/components/layouts/app-layout'
import { Paginated } from '~/types/paginated'
import { ReactNode } from 'react'
import { Box } from '~/components/shared/box'
import { SearchInput } from '~/components/shared/search-input'
import { QuoteDataTable, QuoteMenubar, QuoteStatusFilterSelect } from '~/features/quote'
import { Quote, QuoteStatus } from '~/types/quote'

type IndexProps = {
  quotes: Paginated<Quote>
  statuses: QuoteStatus[]
}
function Index({ quotes }: IndexProps) {
  return (
    <div className={'grid size-full grid-rows-[auto_1fr] gap-2'}>
      <Box className={'flex gap-4'}>
        <div className={'max-w-[325px]'}>
          <SearchInput results={quotes.meta.total} />
        </div>
        <div>
          <QuoteStatusFilterSelect />
        </div>
      </Box>
      <QuoteDataTable data={quotes} />
    </div>
  )
}
Index.layout = (page: ReactNode) => <AppLayout header={<QuoteMenubar />}>{page}</AppLayout>
export default Index
