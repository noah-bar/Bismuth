import { Infer } from '@vinejs/vine/types'
import { updateProfileValidator } from '#validators/profile_validator'
import User from '#models/user'
import { inject } from '@adonisjs/core'
import { UploadService } from '#services/upload_service'

@inject()
export class ProfileService {
  constructor(private uploadService: UploadService) {}

  public async updateProfile(
    profileOrId: number | User,
    data: Infer<typeof updateProfileValidator>
  ): Promise<User> {
    const { signature, companyIcon, ...rest } = data
    const profile =
      typeof profileOrId === 'number' ? await User.findOrFail(profileOrId) : profileOrId

    if (signature) {
      profile.signature = await this.uploadService.replaceImage(profile.signature, signature, {
        width: 100,
        fit: 'cover',
        quality: 90,
      })
    }

    if (companyIcon) {
      profile.companyIcon = await this.uploadService.replaceImage(
        profile.companyIcon,
        companyIcon,
        {
          height: 60,
          fit: 'cover',
          quality: 90,
        }
      )
    }

    return await profile.merge(rest).save()
  }
}
