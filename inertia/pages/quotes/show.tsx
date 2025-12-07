import { QuoteMenubar, QuoteStatusBadge, QuoteTabs } from '~/features/quote'
import { ReactNode, useTransition } from 'react'
import { AppLayout } from '~/components/layouts/app-layout'
import type { Quote } from '~/types/quote'
import { Box } from '~/components/shared/box'
import { Button } from '~/components/ui/button'
import { ArrowRightIcon, DownloadIcon } from 'lucide-react'
import { downloadPdf } from '~/lib/utils'
import { Spinner } from '~/components/ui/spinner'

type ShowProps = {
  quote: Quote
}
function Show({ quote }: ShowProps) {
  const [isDownloading, startIsDownloading] = useTransition()
  const handleDownloadPdf = () => {
    startIsDownloading(async () => await downloadPdf(`/quotes/${quote.id}/offer`, quote.title))
  }

  return (
    <div className={'h-full flex flex-col gap-2'}>
      <Box className={'flex justify-between items-center'}>
        <h1 className={'text-xl font-semibold'}>{quote.title}</h1>
        <QuoteStatusBadge status={quote.status} />
      </Box>
      <QuoteTabs className={'flex-1'} quote={quote} />
      <Box className={'flex justify-between items-center'}>
        <Button size={'icon'} onClick={handleDownloadPdf}>
          {isDownloading ? <Spinner /> : <DownloadIcon />}
        </Button>
        <Button size={'icon'} variant={'outline'}>
          <ArrowRightIcon />
        </Button>
      </Box>
    </div>
  )
}
Show.layout = (page: ReactNode) => <AppLayout header={<QuoteMenubar />}>{page}</AppLayout>
export default Show
