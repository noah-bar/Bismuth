export type QuoteStatisticItem = {
  count: number
  total: number
}

export type QuoteStatistics = {
  sent: QuoteStatisticItem
  accepted: QuoteStatisticItem
  completed: QuoteStatisticItem
  invoiced: QuoteStatisticItem
}
