import type { HttpContext } from '@adonisjs/core/http'
import { createCompanyValidator, updateCompanyValidator } from '#validators/company_validator'
import { inject } from '@adonisjs/core'
import { CompanyService } from '#services/company_service'

@inject()
export default class CompaniesController {
  constructor(private service: CompanyService) {}

  public async index({ inertia, request }: HttpContext) {
    const { page, q, sort, direction } = request.qs()

    const companies = await this.service
      .getCompanies()
      .apply((scopes) => scopes.search(q))
      .apply((scopes) => scopes.sortBy(sort, direction))
      .paginate(page || 1, 100)

    return inertia.render('companies/index', {
      companies: companies.serialize(),
      q,
      sort,
      direction,
    })
  }

  public create({ inertia }: HttpContext) {
    return inertia.render('companies/create')
  }

  public async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createCompanyValidator)
    await this.service.createCompany(payload)

    return response.redirect().toRoute('companies.index')
  }

  public async edit({ inertia, params }: HttpContext) {
    const company = await this.service.getCompany(params.id)

    return inertia.render('companies/edit', {
      company: company.serialize(),
    })
  }

  public async update({ params, request, response }: HttpContext) {
    const company = await this.service.getCompany(params.id)
    const payload = await request.validateUsing(updateCompanyValidator)
    await this.service.updateCompany(company.id, payload)

    return response.redirect().toRoute('companies.edit', { id: company.id })
  }

  public async destroy({ params, response }: HttpContext) {
    await this.service.deleteCompany(params.id)
    return response.redirect().toRoute('companies.index')
  }
}
