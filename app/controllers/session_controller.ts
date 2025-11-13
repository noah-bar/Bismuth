import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class SessionController {
  public create({ inertia }: HttpContext) {
    return inertia.render('login/create', {})
  }

  public async store({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)

    await auth.use().login(user, true)

    return response.redirect().toRoute('companies.index')
  }

  public async destroy({ response, auth }: HttpContext) {
    await auth.use().logout()
    return response.redirect().toRoute('session.create')
  }
}
