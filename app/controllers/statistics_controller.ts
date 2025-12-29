import type { HttpContext } from '@adonisjs/core/http'

export default class StatisticsController {
  public async index({ inertia }: HttpContext) {
    return inertia.render('statistics/index', {})
  }
}
