import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo,  } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Client from './client.js'
import Car from './car.js'

export default class Rental extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare clientId: number

  @column()
  declare carId: number

  @column.dateTime()
  declare rentalStart: DateTime

  @column.dateTime()
  declare rentalEnd: DateTime

  @column()
  declare status: 'pending' | 'active' | 'completed' | 'cancelled'

  @column()
  declare totalValue: number

  @column()
  declare commitmentTermSigned: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>

  @belongsTo(() => Car)
  declare car: BelongsTo<typeof Car>

  // Método para calcular valor total do aluguel
  public calculateTotalValue(): number {
    if (!this.rentalStart || !this.rentalEnd) return 0
    
    const days = this.rentalEnd.diff(this.rentalStart, 'days').days
    return this.car.dailyRate * days
  }

  // Método para verificar se o termo de compromisso foi assinado
  public get isCommitmentTermSigned(): boolean {
    return this.commitmentTermSigned
  }
}