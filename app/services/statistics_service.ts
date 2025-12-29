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

  public async getQuoteStatistics() {
    const userId = this.user.id

    const [sentQuotes, acceptedQuotes, completedQuotes, invoicedQuotes] = await Promise.all([
      Quote.query().where('user_id', userId).where('status', QuoteStatus.SENT),
      Quote.query().where('user_id', userId).where('status', QuoteStatus.ACCEPTED),
      Quote.query().where('user_id', userId).where('status', QuoteStatus.COMPLETED),
      Quote.query().where('user_id', userId).whereNotNull('invoice_date'),
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
