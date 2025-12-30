import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { TabsContent } from '@radix-ui/react-tabs'
import { Box } from '~/components/shared/box'
import { useI18n } from '~/hooks/use-i18n'
import { Quote, QuoteStatus } from '~/types/quote'

type QuoteTabsProps = {
  className?: string
  quote: Quote
}
export function QuoteTabs({ className, quote }: QuoteTabsProps) {
  const { t } = useI18n()

  const invoiceDisabled = [
    QuoteStatus.DRAFT,
    QuoteStatus.REJECTED,
    QuoteStatus.SENT,
    QuoteStatus.ACCEPTED,
  ].includes(quote.status)

  return (
    <Box className={className}>
      <Tabs defaultValue={'offer'} className="h-full flex flex-col">
        <TabsList className={'mx-auto'}>
          <TabsTrigger value="offer">{t('features.quote.quote-tabs.tabs.offer')}</TabsTrigger>
          <TabsTrigger value="order" disabled={!quote.order}>
            {t('features.quote.quote-tabs.tabs.order')}
          </TabsTrigger>
          <TabsTrigger value="invoice" disabled={invoiceDisabled}>
            {t('features.quote.quote-tabs.tabs.invoice')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value={'offer'} className="flex-1 flex justify-center">
          <iframe
            src={`/quotes/${quote.id}/offer`}
            className="w-full max-w-198.5 h-full border rounded p-4 bg-white"
            title="Aperçu du devis"
          />
        </TabsContent>
        <TabsContent value={'order'} className="flex-1 flex justify-center">
          {quote.order && (
            <iframe
              src={`/uploads/${quote.order}`}
              className="w-full h-full border rounded p-4 bg-white"
              title="Aperçu de la commande"
            />
          )}
        </TabsContent>
        <TabsContent value={'invoice'} className="flex-1 flex justify-center">
          {!invoiceDisabled && (
            <iframe
              src={`/quotes/${quote.id}/invoice`}
              className="w-full max-w-198.5 h-full border rounded p-4 bg-white"
              title="Aperçu de la facture"
            />
          )}
        </TabsContent>
      </Tabs>
    </Box>
  )
}
