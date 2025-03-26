import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'rentals'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      table.integer('client_id')
        .unsigned()
        .references('clients.id')
        .onDelete('CASCADE')
      
      table.integer('car_id')
        .unsigned()
        .references('cars.id')
        .onDelete('CASCADE')
      
      table.timestamp('rental_start').notNullable()
      table.timestamp('rental_end').notNullable()
      
      table.enum('status', ['pending', 'active', 'completed', 'cancelled'])
        .defaultTo('pending')
      
      table.decimal('total_value', 10, 2)
      table.boolean('commitment_term_signed').defaultTo(false)
      
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}