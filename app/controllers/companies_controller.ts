import type { HttpContext } from '@adonisjs/core/http'
import Company from '#models/company'
import { createCompanyValidator, updateCompanyValidator } from '#validators/company_validator'

export default class CompaniesController {
  public async index({ inertia, request }: HttpContext) {
    const { page, q, sort, direction } = request.qs()

    const companies = await Company.query()
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
    await Company.create(payload)

    return response.redirect().toRoute('companies.index')
  }

  public async edit({ inertia, params }: HttpContext) {
    const company = await Company.findOrFail(params.id)

    return inertia.render('companies/edit', {
      company: company.serialize(),
    })
  }

  public async update({ params, request, response }: HttpContext) {
    const company = await Company.findOrFail(params.id)
    const payload = await request.validateUsing(updateCompanyValidator)
    await company.merge(payload).save()

    return response.redirect().toRoute('companies.edit', { id: company.id })
  }

  public async destroy({ params, response }: HttpContext) {
    const company = await Company.findOrFail(params.id)
    await company.delete()
    return response.redirect().toRoute('companies.index')
  }
}
