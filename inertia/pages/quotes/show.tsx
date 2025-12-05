import { QuoteMenubar } from '~/features/quote'
import { ReactNode } from 'react'
import { AppLayout } from '~/components/layouts/app-layout'
import type { Quote } from '~/types/quote'

type ShowProps = {
  quote: Quote
}
function Show({ quote }: ShowProps) {
  return (
    <div>

    </div>
  )
}
Show.layout = (page: ReactNode) => <AppLayout header={<QuoteMenubar />}>{page}</AppLayout>
export default Show
