import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'contacts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('first_name')
      table.string('last_name')
      table.string('full_name')
      table.string('email')
      table.integer('user_id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
