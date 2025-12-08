import { MultipartFile } from '@adonisjs/core/bodyparser'
import app from '@adonisjs/core/services/app'
import { cuid } from '@adonisjs/core/helpers'
import * as fs from 'node:fs'
import sharp from 'sharp'

export interface ImageResizeOptions {
  width?: number
  height?: number
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside'
  quality?: number
}

export class UploadService {
  private baseUploadPath = 'storage/uploads'

  public async uploadFile(file: MultipartFile): Promise<string> {
    const uploadPath = app.makePath(this.baseUploadPath)
    const fileName = `${cuid()}.${file.extname}`

    await file.move(uploadPath, {
      name: fileName,
    })

    if (!file.isValid) {
      throw new Error(`Failed to upload file: ${file.errors.map((e) => e.message).join(', ')}`)
    }

    return fileName
  }

  public async deleteFile(fileName: string | null | undefined): Promise<void> {
    if (!fileName) {
      return
    }

    const filePath = app.makePath(this.baseUploadPath, fileName)

    if (!fs.existsSync(filePath)) {
      return
    }

    try {
      fs.unlinkSync(filePath)
    } catch (error) {
      console.error(`Failed to delete file ${fileName}:`, error)
    }
  }

  public async replaceFile(
    oldFileName: string | null | undefined,
    newFile: MultipartFile
  ): Promise<string> {
    const newFileName = await this.uploadFile(newFile)
    await this.deleteFile(oldFileName)
    return newFileName
  }

  public async uploadImage(file: MultipartFile, options: ImageResizeOptions = {}): Promise<string> {
    const uploadPath = app.makePath(this.baseUploadPath)
    const fileName = `${cuid()}.webp`
    const outputPath = `${uploadPath}/${fileName}`

    const { width, height, fit = 'contain', quality = 90 } = options

    await file.move(uploadPath, {
      name: `temp_${cuid()}.${file.extname}`,
    })

    if (!file.isValid) {
      throw new Error(`Failed to upload file: ${file.errors.map((e) => e.message).join(', ')}`)
    }

    const tempFilePath = file.filePath!

    try {
      await sharp(tempFilePath).resize(width, height, { fit }).webp({ quality }).toFile(outputPath)

      fs.unlinkSync(tempFilePath)
    } catch (error) {
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath)
      }
      throw new Error(`Failed to process image: ${error.message}`)
    }

    return fileName
  }

  public async replaceImage(
    oldFileName: string | null | undefined,
    newFile: MultipartFile,
    options?: ImageResizeOptions
  ): Promise<string> {
    const newFileName = await this.uploadImage(newFile, options)
    await this.deleteFile(oldFileName)
    return newFileName
  }

  public fileExists(fileName: string | null | undefined): boolean {
    if (!fileName) {
      return false
    }

    const filePath = app.makePath(this.baseUploadPath, fileName)
    return fs.existsSync(filePath)
  }

  public getFilePath(fileName: string): string {
    return app.makePath(this.baseUploadPath, fileName)
  }
}
