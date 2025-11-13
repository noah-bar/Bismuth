import { DateTime } from 'luxon'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { withSearchable } from '#models/mixins/searchable'
import { withSortable } from '#models/mixins/sortable'

const Searchable = withSearchable(['name', 'address', 'postalCode', 'city'])
const Sortable = withSortable(['name', 'address', 'postalCode', 'city'], 'name', 'asc')

export default class Company extends compose(BaseModel, Searchable, Sortable) {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column()
  declare name: string

  @column()
  declare address: string

  @column()
  declare postalCode: string

  @column()
  declare city: string

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
