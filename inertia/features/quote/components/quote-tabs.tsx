import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { TabsContent } from '@radix-ui/react-tabs'
import { Box } from '~/components/shared/box'
import { useI18n } from '~/hooks/use-i18n'
import type { Quote } from '~/types/quote'

type QuoteTabsProps = {
  className?: string
  quote: Quote
}
export function QuoteTabs({ className, quote }: QuoteTabsProps) {
  const { t } = useI18n()

  return (
    <Box className={className}>
      <Tabs defaultValue={'offer'} className="h-full flex flex-col">
        <TabsList>
          <TabsTrigger value="offer">{t('features.quote.quote-tabs.tabs.offer')}</TabsTrigger>
          <TabsTrigger value="order">{t('features.quote.quote-tabs.tabs.order')}</TabsTrigger>
          <TabsTrigger value="invoice">{t('features.quote.quote-tabs.tabs.invoice')}</TabsTrigger>
        </TabsList>
        <TabsContent value={'offer'} className="flex-1 mt-4">
          <iframe
            src={`/quotes/${quote.id}/offer`}
            className="w-full h-full border-0 rounded p-4 bg-white"
            title="Aperçu du devis"
          />
        </TabsContent>
        <TabsContent value={'order'}></TabsContent>
        <TabsContent value={'invoice'}></TabsContent>
      </Tabs>
    </Box>
  )
}
