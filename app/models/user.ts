import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Client from './client.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  @column({ 
    serializeAs: null, 
    prepare: (value) => hash.make(value) 
  })
  declare password: string

  @column()
  declare type: 'client' | 'admin' | 'superadmin' | 'support'

  @column()
  declare adminRole: 'content' | 'financial' | 'system' | null

  @column()
  declare status: 'active' | 'suspended' | 'pending'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => Client)
  declare client: HasOne<typeof Client>

  // Métodos de verificação
  public get isAdmin(): boolean {
    return this.type.includes('admin') || this.type === 'superadmin'
  }

  public get isSuperAdmin(): boolean {
    return this.type === 'superadmin'
  }

  public get isActive(): boolean {
    return this.status === 'active'
  }
}