import { AppLayout } from '@/components/layouts/app-layout'
import { JSX, ReactNode } from 'react'
import { QuoteForm } from '@/features/quote'
import { Box } from '@/components/shared/box'
import { CreateQuote } from '~/types/quote'

type CreateProps = { quote: CreateQuote }
function Create({ quote }: CreateProps): JSX.Element {
  return (
    <Box className={'size-full'}>
      <QuoteForm data={quote} />
    </Box>
  )
}

Create.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>
export default Create
