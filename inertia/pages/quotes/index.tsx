import { AppLayout } from '~/components/layouts/app-layout'
import { Paginated } from '~/types/paginated'
import { ReactNode } from 'react'
import { Box } from '~/components/shared/box'
import { SearchInput } from '~/components/shared/search-input'
import { QuoteDataTable, QuoteMenubar } from '~/features/quote'
import type { Quote } from '~/types/quote'

type IndexProps = {
  quotes: Paginated<Quote>
}
function Index({ quotes }: IndexProps) {
  return (
    <div className={'grid size-full grid-rows-[auto_1fr] gap-2'}>
      <Box>
        <div className={'max-w-[325px]'}>
          <SearchInput results={quotes.meta.total} />
        </div>
      </Box>
      <QuoteDataTable data={quotes} />
    </div>
  )
}
Index.layout = (page: ReactNode) => <AppLayout header={<QuoteMenubar />}>{page}</AppLayout>
export default Index
