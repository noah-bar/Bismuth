import { AppLayout } from '@/components/layouts/app-layout'
import { JSX, ReactNode } from 'react'
import { QuoteForm } from '@/features/quote'
import { Box } from '@/components/shared/box'
import { UpdateQuote } from '~/types/quote'

type EditProps = { quote: UpdateQuote }
function Edit({ quote }: EditProps): JSX.Element {
  return (
    <Box className={'size-full'}>
      <QuoteForm data={quote} />
    </Box>
  )
}

Edit.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>
export default Edit
