import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { StatisticsService } from '#services/statistics_service'

@inject()
export default class StatisticsController {
  constructor(private service: StatisticsService) {}

  public async index({ inertia, request }: HttpContext) {
    const year = request.input('year')
    const yearNumber = year ? Number.parseInt(year, 10) : undefined

    const [quoteStatistics, availableYears] = await Promise.all([
      this.service.getQuoteStatistics(yearNumber),
      this.service.getAvailableYears(),
    ])

    return inertia.render('statistics/index', {
      quoteStatistics,
      availableYears,
      selectedYear: yearNumber || new Date().getFullYear(),
    })
  }
}
