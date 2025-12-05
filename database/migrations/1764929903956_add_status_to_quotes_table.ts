import { BaseSchema } from '@adonisjs/lucid/schema'
import { QuoteStatus } from '#enums/quote_status'

export default class extends BaseSchema {
  protected tableName = 'quotes'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('status', Object.values(QuoteStatus)).defaultTo('draft').notNullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('status')
    })
  }
}
