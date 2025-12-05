import Quote from '#models/quote'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { Infer } from '@vinejs/vine/types'
import { createQuoteValidator, updateQuoteValidator } from '#validators/quote_validator'
import { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'

@inject()
export class QuoteService {
  private user: User

  constructor(ctx: HttpContext) {
    this.user = ctx.auth.getUserOrFail()
  }

  public getQuotes(): ModelQueryBuilderContract<typeof Quote> {
    return Quote.query().where('userId', this.user.id)
  }

  public async getQuote(id: number): Promise<Quote> {
    return await Quote.query().where('id', id).where('userId', this.user.id).firstOrFail()
  }

  public async createQuote(quote: Infer<typeof createQuoteValidator>): Promise<Quote> {
    return await Quote.create({
      ...quote,
      userId: this.user.id,
    })
  }

  public async updateQuote(id: number, data: Infer<typeof updateQuoteValidator>): Promise<Quote> {
    const quote = await this.getQuote(id)
    return await quote.merge(data).save()
  }

  public async deleteQuote(id: number): Promise<void> {
    const quote = await this.getQuote(id)
    await quote.delete()
  }
}
