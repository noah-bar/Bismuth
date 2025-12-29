import { Infer } from '@vinejs/vine/types'
import { updateProfileValidator } from '#validators/profile_validator'
import User from '#models/user'
import { inject } from '@adonisjs/core'
import { UploadService } from '#services/upload_service'
import { ImageService } from '#services/image_service'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import { ResizeOptions } from 'sharp'

@inject()
export class ProfileService {
  constructor(
    private uploadService: UploadService,
    private imageService: ImageService
  ) {}

  public async updateProfile(
    profileOrId: number | User,
    data: Infer<typeof updateProfileValidator>
  ): Promise<User> {
    const { signature, companyIcon, ...rest } = data
    const profile =
      typeof profileOrId === 'number' ? await User.findOrFail(profileOrId) : profileOrId

    if (signature) {
      profile.signature = await this.processAndUploadImage(signature, profile.signature, {
        width: 100,
      })
    }

    if (companyIcon) {
      profile.companyIcon = await this.processAndUploadImage(companyIcon, profile.companyIcon, {
        height: 100,
      })
    }

    return await profile.merge(rest).save()
  }

  private async processAndUploadImage(
    file: MultipartFile,
    existingPath: string,
    options: ResizeOptions
  ): Promise<string> {
    const buffer = await this.uploadService.toBuffer(file)
    const resizedImage = await this.imageService.resize(buffer, options)
    const webpImage = await this.imageService.toWebp(resizedImage)
    return await this.uploadService.replaceBuffer(existingPath, webpImage, 'webp')
  }
}
