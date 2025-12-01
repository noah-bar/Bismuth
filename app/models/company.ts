import { DateTime } from 'luxon'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { withSearchable } from '#models/mixins/searchable'
import { withSortable } from '#models/mixins/sortable'
import User from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

const Searchable = withSearchable(['name', 'address', 'postalCode', 'city'])
const Sortable = withSortable(['name', 'address', 'postalCode', 'city'], 'name', 'asc')

export default class Company extends compose(BaseModel, Searchable, Sortable) {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare name: string

  @column()
  declare address: string

  @column()
  declare postalCode: string

  @column()
  declare city: string

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
