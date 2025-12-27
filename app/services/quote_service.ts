import Quote from '#models/quote'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { Infer } from '@vinejs/vine/types'
import { createQuoteValidator, updateQuoteValidator } from '#validators/quote_validator'
import { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import { UploadService } from '#services/upload_service'

@inject()
export class QuoteService {
  private user: User
  private uploadService: UploadService

  constructor(ctx: HttpContext) {
    this.user = ctx.auth.getUserOrFail()
    this.uploadService = new UploadService()
  }

  public getQuotes(): ModelQueryBuilderContract<typeof Quote> {
    return Quote.query().where('quotes.user_id', this.user.id)
  }

  public async getQuote(id: number): Promise<Quote> {
    return await Quote.query()
      .where('quotes.id', id)
      .where('quotes.user_id', this.user.id)
      .firstOrFail()
  }

  public async createQuote(data: Infer<typeof createQuoteValidator>): Promise<Quote> {
    const { order, ...rest } = data

    if (order) {
      await this.uploadService.uploadFile(order)
    }

    return await Quote.create({
      ...rest,
      userId: this.user.id,
    })
  }

  public async updateQuote(id: number, data: Infer<typeof updateQuoteValidator>): Promise<Quote> {
    const { order, ...rest } = data
    const quote = await this.getQuote(id)

    if (order) {
      quote.order = await this.uploadService.replaceFile(quote.order, order)
    }

    return await quote.merge(rest).save()
  }

  public async deleteQuote(id: number): Promise<void> {
    const quote = await this.getQuote(id)
    await quote.delete()
  }
}
