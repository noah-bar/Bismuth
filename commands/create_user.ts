import { BaseCommand, args } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import * as crypto from 'node:crypto'
import User from '#models/user'

export default class CreateUser extends BaseCommand {
  static commandName = 'create:user'
  static description = 'Create a new user'

  static options: CommandOptions = {
    startApp: true,
  }

  @args.string()
  declare firstName: string

  @args.string()
  declare lastName: string

  @args.string({
    parse(value) {
      return value.toLowerCase().trim()
    },
  })
  declare email: string

  @args.string({ required: false })
  declare password?: string

  async run() {
    const { createUserValidator } = await import('#validators/user_validator')
    const plainPassword = this.password ?? crypto.randomBytes(16).toString('base64url')

    try {
      const payload = await createUserValidator.validate({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: plainPassword,
      })

      const user = await User.create({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: plainPassword,
      })

      this.logger.success(`✅ User created (#${user.id})`)
      this.logger.info(`📧 Email: ${user.email}`)
      this.logger.warning(`🔑 Password (show once): ${plainPassword}`)
    } catch (error) {
      this.logger.error('❌ Validation failed')
      for (const msg of error?.messages ?? []) {
        this.logger.error(`- ${msg.field}: ${msg.message}`)
      }
      await this.terminate()
    }
  }
}
