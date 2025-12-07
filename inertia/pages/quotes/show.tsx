import { QuoteMenubar, QuoteStatusBadge } from '~/features/quote'
import { ReactNode } from 'react'
import { AppLayout } from '~/components/layouts/app-layout'
import type { Quote } from '~/types/quote'
import { Box } from '~/components/shared/box'

type ShowProps = {
  quote: Quote
}
function Show({ quote }: ShowProps) {
  return (
    <Box className={"h-full"}>
      <div className={"flex justify-between items-center"}>
        <h1 className={'text-xl font-semibold'}>{quote.title}</h1>
        <QuoteStatusBadge status={quote.status}/>
      </div>
    </Box>
  )
}
Show.layout = (page: ReactNode) => <AppLayout header={<QuoteMenubar />}>{page}</AppLayout>
export default Show
