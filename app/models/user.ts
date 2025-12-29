import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, computed } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbRememberMeTokensProvider } from '@adonisjs/auth/session'
import router from '@adonisjs/core/services/router'
import { UploadService } from '#services/upload_service'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  static rememberMeTokens = DbRememberMeTokensProvider.forModel(User)

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare email: string

  @column()
  declare city: string

  @column()
  declare address: string

  @column()
  declare postalCode: string

  @column()
  declare phoneNumber: string

  @column()
  declare companyName: string

  @column()
  declare signature: string

  @column()
  declare companyIcon: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @computed()
  get signatureUrl(): string | null {
    if (!this.signature) return null
    return router.builder().params([this.signature]).make('drive.fs.serve')
  }

  @computed()
  get companyIconUrl(): string | null {
    if (!this.companyIcon) return null
    return router.builder().params([this.companyIcon]).make('drive.fs.serve')
  }

  @computed({ serializeAs: null })
  public async companyIconBase64(): Promise<string | null> {
    const uploadService = new UploadService()
    return this.companyIcon ? await uploadService.getFileAsBase64(this.companyIcon) : null
  }

  @computed({ serializeAs: null })
  public async signatureBase64(): Promise<string | null> {
    const uploadService = new UploadService()
    return uploadService.getFileAsBase64(this.signature)
  }
}
