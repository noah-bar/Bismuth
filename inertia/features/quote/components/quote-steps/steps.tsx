import { Quote, QuoteStatus } from '~/types/quote'
import { StepDraft } from '~/features/quote/components/quote-steps/step-draft'
import { StepSent } from '~/features/quote/components/quote-steps/step-sent'
import { StepAccepted } from '~/features/quote/components/quote-steps/step-accepted'
import { StepCompleted } from '~/features/quote/components/quote-steps/step-completed'

type StepsProps = { quote: Quote }
export function Steps({ quote }: StepsProps) {
  switch (quote.status) {
    case QuoteStatus.DRAFT:
      return <StepDraft quote={quote} />
    case QuoteStatus.SENT:
      return <StepSent quote={quote} />
    case QuoteStatus.ACCEPTED:
      return <StepAccepted quote={quote} />
    case QuoteStatus.COMPLETED:
      return <StepCompleted quote={quote} />
  }
}
