import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cars'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('model').notNullable()
      table.string('brand').notNullable()
      table.string('plate').unique().notNullable()
      table.boolean('is_available').defaultTo(true)
      table.decimal('daily_rate', 10, 2).notNullable()
      
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}