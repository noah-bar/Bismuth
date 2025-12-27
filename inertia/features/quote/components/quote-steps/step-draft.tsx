import { useI18n } from '~/hooks/use-i18n'
import { useState } from 'react'
import { DialogFooter } from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { ArrowLeftIcon, ArrowRightIcon, Loader2 } from 'lucide-react'
import { Quote, QuoteStatus } from '~/types/quote'
import { useQuote } from '~/features/quote/hooks/use-quote'

type StepDraftProps = { quote: Quote }
export function StepDraft({ quote }: StepDraftProps) {
  const { t } = useI18n()
  const { updateQuote } = useQuote()
  const [isLoading, setIsLoading] = useState(false)

  const handleNext = () => {
    updateQuote(
      quote.id,
      {
        status: QuoteStatus.SENT,
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
        <Button variant={'outline'} disabled={true}>
          {isLoading ? <Loader2 /> : <ArrowLeftIcon />}
          {t('components.quote-steps.previous-button')}
        </Button>
        <Button onClick={handleNext}>
          {t('components.quote-steps.next-button')}
          {isLoading ? <Loader2 /> : <ArrowRightIcon />}
        </Button>
      </div>
    </DialogFooter>
  )
}
