import type { HttpContext } from '@adonisjs/core/http'
import { createContactValidator, updateContactValidator } from '#validators/contact_validator'
import { ContactService } from '#services/contact_service'
import { inject } from '@adonisjs/core'

@inject()
export default class ContactsController {
  constructor(private service: ContactService) {}

  public async index({ inertia, request }: HttpContext) {
    const { page, q, sort, direction } = request.qs()

    const contacts = await this.service
      .getContacts()
      .apply((scopes) => scopes.search(q))
      .apply((scopes) => scopes.sortBy(sort, direction))
      .paginate(page || 1, 100)

    return inertia.render('contacts/index', {
      contacts: contacts.serialize(),
      q,
      sort,
      direction,
    })
  }

  public create({ inertia }: HttpContext) {
    return inertia.render('contacts/create')
  }

  public async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createContactValidator)
    await this.service.createContact(payload)

    return response.redirect().toRoute('contacts.index')
  }

  public async edit({ inertia, params }: HttpContext) {
    const contact = await this.service.getContact(params.id)

    return inertia.render('contacts/edit', {
      contact: contact.serialize(),
    })
  }

  public async update({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(updateContactValidator)
    const contact = await this.service.updateContact(params.id, payload)

    return response.redirect().toRoute('contacts.edit', { id: contact.id })
  }

  public async destroy({ params, response }: HttpContext) {
    await this.service.deleteContact(params.id)
    return response.redirect().toRoute('contacts.index')
  }
}
