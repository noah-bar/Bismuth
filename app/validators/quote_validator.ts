import vine from '@vinejs/vine'
import { DateTime } from 'luxon'
import { QuoteStatus } from '#enums/quote_status'

export const createQuoteValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1),
    date: vine.date().transform((value) => DateTime.fromJSDate(value)),
    version: vine.number().positive().withoutDecimals(),
    currency: vine.enum(['CHF', 'EUR', 'USD']),
    status: vine.enum(Object.values(QuoteStatus)),
    taxIncluded: vine.boolean(),
    orderNumber: vine.string().trim().optional(),
    order: vine.file({ extnames: ['pdf'], size: '5mb' }).optional(),
    invoiceDate: vine
      .date()
      .transform((value) => DateTime.fromJSDate(value))
      .optional(),
    companyId: vine
      .number()
      .positive()
      .withoutDecimals()
      .exists(async (db, value) => {
        const user = await db.from('companies').where('id', value).first()
        return user !== null
      })
      .nullable(),
    contactId: vine
      .number()
      .positive()
      .withoutDecimals()
      .exists(async (db, value) => {
        if (!value) return true
        const user = await db.from('contacts').where('id', value).first()
        return user !== null
      }),
    items: vine.array(
      vine.object({
        title: vine.string().trim(),
        description: vine.string().trim().optional(),
        price: vine.number().positive().decimal([0, 2]),
        order: vine.number().withoutDecimals(),
      })
    ),
  })
)

export const updateQuoteValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1).optional(),
    date: vine
      .date()
      .transform((value) => DateTime.fromJSDate(value))
      .optional(),
    version: vine.number().positive().withoutDecimals().optional(),
    currency: vine.enum(['CHF', 'EUR', 'USD']).optional(),
    status: vine.enum(Object.values(QuoteStatus)).optional(),
    taxIncluded: vine.boolean().optional(),
    orderNumber: vine.string().trim().optional(),
    order: vine.file({ extnames: ['pdf'], size: '5mb' }).optional(),
    invoiceDate: vine
      .date()
      .transform((value) => DateTime.fromJSDate(value))
      .optional(),
    companyId: vine
      .number()
      .positive()
      .withoutDecimals()
      .exists(async (db, value) => {
        if (!value) return true
        const user = await db.from('companies').where('id', value).first()
        return user !== null
      })
      .nullable()
      .optional(),
    contactId: vine
      .number()
      .positive()
      .withoutDecimals()
      .exists(async (db, value) => {
        const user = await db.from('contacts').where('id', value).first()
        return user !== null
      })
      .optional(),
    items: vine
      .array(
        vine.object({
          title: vine.string().trim().minLength(1).optional(),
          description: vine.string().trim().optional(),
          price: vine.number().positive().decimal([0, 2]).optional(),
          order: vine.number().withoutDecimals().optional(),
        })
      )
      .optional(),
  })
)

export const quoteQueryValidator = vine.compile(
  vine.object({
    page: vine.number().positive().withoutDecimals().optional(),
    q: vine.string().trim().optional(),
    sort: vine.string().trim().optional(),
    direction: vine.enum(['asc', 'desc']).optional(),
    status: vine.enum(Object.values(QuoteStatus)).optional(),
  })
)
