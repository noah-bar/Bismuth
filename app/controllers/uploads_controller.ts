import type { HttpContext } from '@adonisjs/core/http'
import { sep, normalize } from 'node:path'
import { UploadService } from '#services/upload_service'
import { inject } from '@adonisjs/core'

@inject()
export default class UploadsController {
  private PATH_TRAVERSAL_REGEX = /(?:^|[\\/])\.\.(?:[\\/]|$)/

  constructor(private service: UploadService) {}

  public async show({ request, response }: HttpContext) {
    const filePath = request.param('*').join(sep)
    const normalizedPath = normalize(filePath)

    if (this.PATH_TRAVERSAL_REGEX.test(normalizedPath)) {
      return response.badRequest('Malformed path')
    }

    const absolutePath = this.service.getFilePath(normalizedPath)

    return response.download(absolutePath)
  }
}
