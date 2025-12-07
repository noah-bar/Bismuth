import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { QuoteService } from '#services/quote_service'
import {
  createQuoteValidator,
  updateQuoteValidator,
  quoteQueryValidator,
} from '#validators/quote_validator'
import { CompanyService } from '#services/company_service'
import { ContactService } from '#services/contact_service'
import Quote from '#models/quote'
import { DateTime } from 'luxon'
import { QuoteStatus } from '#enums/quote_status'

@inject()
export default class QuotesController {
  constructor(
    private service: QuoteService,
    private companyService: CompanyService,
    private contactService: ContactService
  ) {}

  public async index({ inertia, request }: HttpContext) {
    const { page, q, sort, direction, status } = await request.validateUsing(quoteQueryValidator)

    const quotes = await this.service
      .getQuotes()
      .preload('contact')
      .preload('company')
      .apply((scopes) => scopes.search(q))
      .apply((scopes) => scopes.sortBy(sort, direction))
      .apply((scopes) => scopes.filterByStatus(status))
      .paginate(page || 1, 100)

    return inertia.render('quotes/index', {
      quotes: quotes.serialize(),
      statuses: Object.values(QuoteStatus),
      q,
      sort,
      direction,
    })
  }

  public async show({ inertia, params }: HttpContext) {
    const quote = await this.service.getQuote(params.id)

    return inertia.render('quotes/show', {
      quote,
    })
  }

  public async create({ inertia }: HttpContext) {
    const companies = await this.companyService.getCompanies().select('id', 'name')
    const contacts = await this.contactService.getContacts().select('id', 'fullName')
    const quote = new Quote().fill({
      currency: 'CHF',
      status: QuoteStatus.DRAFT,
      taxIncluded: false,
      date: DateTime.local(),
      version: 1,
    })

    return inertia.render('quotes/create', {
      companies: companies.map((company) => company.serialize()),
      contacts: contacts.map((contact) => contact.serialize()),
      quote: quote.serialize(),
      statuses: Object.values(QuoteStatus),
    })
  }

  public async store({ response, request }: HttpContext) {
    const payload = await request.validateUsing(createQuoteValidator)
    await this.service.createQuote(payload)
    return response.redirect().toRoute('quotes.index')
  }

  public async edit({ inertia, params }: HttpContext) {
    const companies = await this.companyService.getCompanies().select('id', 'name')
    const contacts = await this.contactService.getContacts().select('id', 'fullName')

    const quote = await this.service.getQuote(params.id)

    return inertia.render('quotes/edit', {
      quote: quote.serialize(),
      companies: companies.map((company) => company.serialize()),
      contacts: contacts.map((contact) => contact.serialize()),
      statuses: Object.values(QuoteStatus),
    })
  }

  public async update({ response, request, params }: HttpContext) {
    const payload = await request.validateUsing(updateQuoteValidator)
    const quote = await this.service.updateQuote(params.id, payload)

    return response.redirect().toRoute('quotes.edit', { id: quote.id })
  }
}
