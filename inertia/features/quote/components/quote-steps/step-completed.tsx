import { DialogFooter } from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { ArrowLeftIcon, ArrowRightIcon, Loader2 } from 'lucide-react'
import { useI18n } from '~/hooks/use-i18n'
import { useState } from 'react'
import { Quote, QuoteStatus } from '~/types/quote'
import { useQuote } from '~/features/quote/hooks/use-quote'

type StepCompletedProps = { quote: Quote }
export function StepCompleted({ quote }: StepCompletedProps) {
  const { t } = useI18n()
  const [isLoading, setIsLoading] = useState(false)
  const { updateQuote } = useQuote()

  const handlePrevious = () => {
    updateQuote(
      quote.id,
      {
        status: QuoteStatus.ACCEPTED,
      },
      {
        onStart: () => setIsLoading(true),
        onFinish: () => setIsLoading(false),
      }
    )
  }

  const handleNext = () => {
    updateQuote(
      quote.id,
      {
        status: QuoteStatus.CLOSED,
      },
      {
        onStart: () => setIsLoading(true),
        onFinish: () => setIsLoading(false),
      }
    )
  }

  return (
    <DialogFooter>
      <div className={'flex w-full justify-between'}>
        <Button variant={'outline'} onClick={handlePrevious}>
          {isLoading ? <Loader2 /> : <ArrowLeftIcon />}
          {t('components.quote-steps.previous-button')}
        </Button>
        <Button onClick={handleNext}>
          {t('components.quote-steps.close-button')}
          {isLoading ? <Loader2 /> : <ArrowRightIcon />}
        </Button>
      </div>
    </DialogFooter>
  )
}
