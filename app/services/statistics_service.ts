import Quote from '#models/quote'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { QuoteStatus } from '#enums/quote_status'

@inject()
export class StatisticsService {
  private user: User

  constructor(ctx: HttpContext) {
    this.user = ctx.auth.getUserOrFail()
  }

  public async getAvailableYears(): Promise<number[]> {
    const quotes = await Quote.query()
      .where('user_id', this.user.id)
      .select('date')
      .orderBy('date', 'desc')

    const years = new Set<number>()
    quotes.forEach((quote) => {
      if (quote.date) {
        years.add(quote.date.year)
      }
    })

    return Array.from(years).sort((a, b) => a - b)
  }

  public async getQuoteStatistics(year?: number) {
    const userId = this.user.id
    const currentYear = year || new Date().getFullYear()

    const startDate = `${currentYear}-01-01`
    const endDate = `${currentYear}-12-31`

    const [sentQuotes, acceptedQuotes, completedQuotes, invoicedQuotes] = await Promise.all([
      Quote.query()
        .where('user_id', userId)
        .where('status', QuoteStatus.SENT)
        .whereBetween('date', [startDate, endDate]),
      Quote.query()
        .where('user_id', userId)
        .where('status', QuoteStatus.ACCEPTED)
        .whereBetween('date', [startDate, endDate]),
      Quote.query()
        .where('user_id', userId)
        .where('status', QuoteStatus.COMPLETED)
        .whereBetween('date', [startDate, endDate]),
      Quote.query()
        .where('user_id', userId)
        .whereNotNull('invoice_date')
        .whereBetween('date', [startDate, endDate]),
    ])

    const calculateTotal = (quotes: Quote[]) => {
      return quotes.reduce((sum, quote) => {
        const price = quote.taxIncluded ? quote.totalPriceWithVat : quote.totalPrice
        return sum + price
      }, 0)
    }

    return {
      sent: {
        count: sentQuotes.length,
        total: calculateTotal(sentQuotes),
      },
      accepted: {
        count: acceptedQuotes.length,
        total: calculateTotal(acceptedQuotes),
      },
      completed: {
        count: completedQuotes.length,
        total: calculateTotal(completedQuotes),
      },
      invoiced: {
        count: invoicedQuotes.length,
        total: calculateTotal(invoicedQuotes),
      },
    }
  }
}
