import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Company from '#models/company'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { compose } from '@adonisjs/core/helpers'
import { withSearchable } from '#models/mixins/searchable'
import { withSortable } from '#models/mixins/sortable'
import User from '#models/user'

const Searchable = withSearchable(['firstName', 'lastName', 'email'])
const Sortable = withSortable(['firstName', 'lastName', 'email'], 'email', 'asc')

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
  declare email: string

  @column()
  declare companyId: number

  @column()
  declare userId: number

  @belongsTo(() => Company)
  declare company: BelongsTo<typeof Company>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
