import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { TabsContent } from '@radix-ui/react-tabs'
import { Box } from '~/components/shared/box'
import { useI18n } from '~/hooks/use-i18n'

type QuoteTabsProps = {
  className?: string
}
export function QuoteTabs({ className }: QuoteTabsProps) {
  const { t } = useI18n()

  return (
    <Box className={className}>
      <Tabs defaultValue={'offer'}>
        <TabsList>
          <TabsTrigger value="offer">{t('features.quote.quote-tabs.tabs.offer')}</TabsTrigger>
          <TabsTrigger value="order">{t('features.quote.quote-tabs.tabs.order')}</TabsTrigger>
          <TabsTrigger value="invoice">{t('features.quote.quote-tabs.tabs.invoice')}</TabsTrigger>
        </TabsList>
        <TabsContent value={'offer'}></TabsContent>
      </Tabs>
    </Box>
  )
}
