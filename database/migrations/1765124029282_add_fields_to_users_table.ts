import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('address')
      table.string('phone_number')
      table.string('city')
      table.string('company_name')
      table.string('postal_code')
      table.string('company_icon')
      table.string('signature')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('address')
      table.dropColumn('phone_number')
      table.dropColumn('city')
      table.dropColumn('company_name')
      table.dropColumn('postal_code')
      table.dropColumn('company_icon')
      table.dropColumn('signature')
    })
  }
}
