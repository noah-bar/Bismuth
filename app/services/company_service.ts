import Company from '#models/company'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { Infer } from '@vinejs/vine/types'
import { createCompanyValidator, updateCompanyValidator } from '#validators/company_validator'
import { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'

@inject()
export class CompanyService {
  private user: User

  constructor(ctx: HttpContext) {
    this.user = ctx.auth.getUserOrFail()
  }

  public getCompanies(): ModelQueryBuilderContract<typeof Company> {
    return Company.query().where('userId', this.user.id)
  }

  public async getCompany(id: number): Promise<Company> {
    return await Company.query().where('id', id).where('userId', this.user.id).firstOrFail()
  }

  public async createCompany(company: Infer<typeof createCompanyValidator>): Promise<Company> {
    return await Company.create({
      ...company,
      userId: this.user.id,
    })
  }

  public async updateCompany(
    id: number,
    data: Infer<typeof updateCompanyValidator>
  ): Promise<Company> {
    const company = await this.getCompany(id)
    return await company.merge(data).save()
  }

  public async deleteCompany(id: number): Promise<void> {
    const company = await this.getCompany(id)
    await company.delete()
  }
}
