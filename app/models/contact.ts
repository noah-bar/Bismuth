import { DateTime } from 'luxon'
import { BaseModel, beforeSave, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { compose } from '@adonisjs/core/helpers'
import { withSearchable } from '#models/mixins/searchable'
import { withSortable } from '#models/mixins/sortable'
import User from '#models/user'

const Searchable = withSearchable(['firstName', 'lastName', 'fullName', 'email'])
const Sortable = withSortable(['firstName', 'lastName', 'fullName', 'email'], 'email', 'asc')

export default class Contact extends compose(BaseModel, Searchable, Sortable) {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare fullName: string

  @column()
  declare email: string

  @column()
  declare companyId: number

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @beforeSave()
  public static async calculateFullName(contact: Contact) {
    if (contact.$dirty.firstName || contact.$dirty.lastName) {
      contact.fullName = `${contact.firstName} ${contact.lastName}`
    }
  }
}
