import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'quotes'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.decimal('offer_total_price_with_vat').defaultTo(0)
      table.string('order_number')
      table.string('order')
      table.date('invoice_date')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('offer_total_price_with_vat')
      table.dropColumn('order_number')
      table.dropColumn('order')
      table.dropColumn('invoice_date')
    })
  }
}
