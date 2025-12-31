import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'quotes'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.decimal('invoice_total_price_with_vat').defaultTo(0)
      table.decimal('invoice_total_price').defaultTo(0)
      table.json('invoice_items').defaultTo('[]')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('invoice_total_price_with_vat')
      table.dropColumn('invoice_total_price')
      table.dropColumn('invoice_items')
    })
  }
}
