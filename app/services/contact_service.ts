import Contact from '#models/contact'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { Infer } from '@vinejs/vine/types'
import { createContactValidator, updateContactValidator } from '#validators/contact_validator'
import { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'

@inject()
export class ContactService {
  private user: User

  constructor(ctx: HttpContext) {
    this.user = ctx.auth.getUserOrFail()
  }

  public getContacts(): ModelQueryBuilderContract<typeof Contact> {
    return Contact.query().where('userId', this.user.id).orderBy('firstName').orderBy('lastName')
  }

  public async getContact(id: number): Promise<Contact> {
    return await Contact.query().where('id', id).where('userId', this.user.id).firstOrFail()
  }

  public async createContact(contact: Infer<typeof createContactValidator>): Promise<Contact> {
    return await Contact.create({
      ...contact,
      userId: this.user.id,
    })
  }

  public async updateContact(
    id: number,
    data: Infer<typeof updateContactValidator>
  ): Promise<Contact> {
    const contact = await this.getContact(id)
    return await contact.merge(data).save()
  }

  public async deleteContact(id: number): Promise<void> {
    const contact = await this.getContact(id)
    await contact.delete()
  }
}
