import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const createQuoteValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1),
    date: vine.date().transform((value) => DateTime.fromJSDate(value)),
    version: vine.number().positive().withoutDecimals(),
    currency: vine.enum(['CHF', 'EUR', 'USD']),
    taxIncluded: vine.boolean(),
    companyId: vine
      .number()
      .positive()
      .withoutDecimals()
      .exists(async (db, value) => {
        const user = await db.from('companies').where('id', value).first()
        return user !== null
      }),
    contactId: vine
      .number()
      .positive()
      .withoutDecimals()
      .exists(async (db, value) => {
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
    taxIncluded: vine.boolean().optional(),
    companyId: vine
      .number()
      .positive()
      .withoutDecimals()
      .exists(async (db, value) => {
        const user = await db.from('companies').where('id', value).first()
        return user !== null
      })
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
