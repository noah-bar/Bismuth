import { DateTime } from 'luxon'
import { BaseModel, beforeSave, belongsTo, column, scope } from '@adonisjs/lucid/orm'
import { withSearchable } from '#models/mixins/searchable'
import { withSortable } from '#models/mixins/sortable'
import { compose } from '@adonisjs/core/helpers'
import User from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Company from '#models/company'
import Contact from '#models/contact'
import { QuoteStatus } from '#enums/quote_status'

const Searchable = withSearchable([
  'title',
  'date',
  'offerTotalPrice',
  'company.name',
  'contact.fullName',
])
const Sortable = withSortable(
  ['title', 'date', 'offerTotalPrice', 'status', 'company.name', 'contact.fullName'],
  'title',
  'asc'
)

export default class Quote extends compose(BaseModel, Searchable, Sortable) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column.date()
  declare date: DateTime

  @column()
  declare version: number

  @column()
  declare currency: 'CHF' | 'EUR' | 'USD'

  @column()
  declare status: QuoteStatus

  @column()
  declare taxIncluded: boolean

  @column({
    prepare: (value: any) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  declare offerItems: Array<{
    title?: string
    description?: string
    price?: number
    order?: number
    [key: string]: any
  }>

  @column({
    prepare: (value: any) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  declare invoiceItems: Array<{
    title?: string
    description?: string
    price?: number
    order?: number
    [key: string]: any
  }>

  @column({
    consume: (value: string) => Number(value),
  })
  declare offerTotalPrice: number

  @column({
    consume: (value: string) => Number(value),
  })
  declare offerTotalPriceWithVat: number

  @column({
    consume: (value: string) => Number(value),
  })
  declare invoiceTotalPrice: number

  @column({
    consume: (value: string) => Number(value),
  })
  declare invoiceTotalPriceWithVat: number

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare companyId: number | null

  @belongsTo(() => Company)
  declare company: BelongsTo<typeof Company>

  @column()
  declare contactId: number

  @belongsTo(() => Contact)
  declare contact: BelongsTo<typeof Contact>

  @column()
  declare orderNumber: string

  @column()
  declare order: string

  @column.date()
  declare invoiceDate: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  public static async calculateTotalPrice(quote: Quote) {
    if (quote.$dirty.offerItems) {
      const subtotal = quote.offerItems.reduce((sum, item) => sum + (item.price || 0), 0)

      quote.offerTotalPrice = subtotal
      quote.offerTotalPriceWithVat = subtotal * 1.081
    }

    if (quote.$dirty.invoiceItems) {
      const subtotal = quote.invoiceItems.reduce((sum, item) => sum + (item.price || 0), 0)

      quote.invoiceTotalPrice = subtotal
      quote.invoiceTotalPriceWithVat = subtotal * 1.081
    }
  }

  public static filterByStatus = scope((query, status?: QuoteStatus) => {
    if (!status) {
      return query.whereIn('status', [
        QuoteStatus.DRAFT,
        QuoteStatus.SENT,
        QuoteStatus.ACCEPTED,
        QuoteStatus.COMPLETED,
      ])
    }

    return query.where('status', status)
  })
}
