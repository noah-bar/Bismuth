import { DialogFooter } from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { ArrowLeftIcon, ArrowRightIcon, Loader2 } from 'lucide-react'
import { useI18n } from '~/hooks/use-i18n'
import { useState } from 'react'
import { Quote, QuoteStatus, UpdateQuote } from '~/types/quote'
import { useQuote } from '~/features/quote/hooks/use-quote'
import { FormControl } from '~/components/shared/form-control'
import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'
import { useForm } from '@inertiajs/react'

type StepAcceptedProps = { quote: Quote }
export function StepAccepted({ quote }: StepAcceptedProps) {
  const { t } = useI18n()
  const { updateQuote } = useQuote()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<UpdateQuote>({
    invoiceDate: quote.invoiceDate || new Date().toISOString().split('T')[0],
    status: QuoteStatus.COMPLETED,
  })

  const handlePrevious = () => {
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

  const handleNext = () => {
    form.put(`/quotes/${quote.id}`, {
      onStart: () => setIsLoading(true),
      onFinish: () => setIsLoading(false),
    })
  }

  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <FormControl error={form.errors.order}>
          <Label htmlFor={'invoiceDate'}>{t('components.quote-steps.step-accepted.date')}</Label>
          <Input
            id={'invoiceDate'}
            type={'date'}
            value={form.data.invoiceDate}
            onChange={(e) => form.setData('invoiceDate', e.target.value)}
          />
        </FormControl>
      </div>
      <DialogFooter>
        <div className={'flex w-full justify-between'}>
          <Button variant={'outline'} onClick={handlePrevious}>
            {isLoading ? <Loader2 /> : <ArrowLeftIcon />}
            {t('components.quote-steps.previous-button')}
          </Button>
          <Button onClick={handleNext} disabled={!form.data.invoiceDate}>
            {t('components.quote-steps.next-button')}
            {isLoading ? <Loader2 /> : <ArrowRightIcon />}
          </Button>
        </div>
      </DialogFooter>
    </>
  )
}
