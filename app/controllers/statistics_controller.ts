import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { StatisticsService } from '#services/statistics_service'

@inject()
export default class StatisticsController {
  constructor(private service: StatisticsService) {}

  public async index({ inertia }: HttpContext) {
    const quoteStatistics = await this.service.getQuoteStatistics()

    return inertia.render('statistics/index', {
      quoteStatistics,
    })
  }
}
