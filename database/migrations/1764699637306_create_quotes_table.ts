import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'quotes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title')
      table.date('date')
      table.integer('version')
      table.string('currency').checkIn(['CHF', 'EUR', 'USD'])
      table.boolean('tax_included')
      table.json('offer_items')
      table.decimal('offer_total_price').defaultTo(0)
      table.integer('user_id')
      table.integer('company_id')
      table.integer('contact_id')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
