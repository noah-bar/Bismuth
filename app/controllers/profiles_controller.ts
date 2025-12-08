import type { HttpContext } from '@adonisjs/core/http'
import { editProfile } from '#abilities/main'
import User from '#models/user'
import { updateProfileValidator } from '#validators/profile_validator'
import { inject } from '@adonisjs/core'
import { ProfileService } from '#services/profile_service'

@inject()
export default class ProfilesController {
  constructor(private service: ProfileService) {}

  public async edit({ inertia, bouncer, params }: HttpContext) {
    const profile = await User.findOrFail(params.id)
    await bouncer.authorize(editProfile, profile)
    return inertia.render('profiles/edit', { profile })
  }

  public async update({ bouncer, params, request, response }: HttpContext) {
    const profile = await User.findOrFail(params.id)
    await bouncer.authorize(editProfile, profile)
    const payload = await request.validateUsing(updateProfileValidator)
    await this.service.updateProfile(profile, payload)

    return response.redirect().toRoute('profiles.edit', { id: profile.id })
  }
}
