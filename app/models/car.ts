import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type {HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Rental from './rental.js'

export default class Car extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare model: string

  @column()
  declare brand: string

  @column()
  declare plate: string

  @column()
  declare isAvailable: boolean

  @column()
  declare dailyRate: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Rental)
  declare rentals: HasMany<typeof Rental>

  // Método para verificar disponibilidade
  public get availability(): boolean {
    return this.isAvailable
  }
}