import { MultipartFile } from '@adonisjs/core/bodyparser'
import { cuid } from '@adonisjs/core/helpers'
import fs from 'node:fs/promises'
import drive from '@adonisjs/drive/services/main'

export class UploadService {
  public async toBuffer(file: MultipartFile): Promise<Buffer<ArrayBufferLike>> {
    return await fs.readFile(file.tmpPath!)
  }

  public async uploadFile(file: MultipartFile): Promise<string> {
    const fileName = `uploads/${cuid()}.${file.extname}`
    await file.moveToDisk(fileName)

    return fileName
  }

  public async uploadBuffer(buffer: Buffer<ArrayBufferLike>, extname: string) {
    const disk = drive.use()
    const fileName = `uploads/${cuid()}.${extname}`
    await disk.put(fileName, buffer)
    return fileName
  }

  public async deleteFile(fileName: string): Promise<boolean> {
    const disk = drive.use()
    try {
      await disk.delete(fileName)
      return true
    } catch (error) {
      return false
    }
  }

  public async replaceFile(oldFileName: string, newFile: MultipartFile): Promise<string> {
    const newFileName = await this.uploadFile(newFile)
    await this.deleteFile(oldFileName)
    return newFileName
  }

  public async replaceBuffer(
    oldFileName: string,
    buffer: Buffer<ArrayBufferLike>,
    extname: string
  ): Promise<string> {
    const newFileName = await this.uploadBuffer(buffer, extname)
    await this.deleteFile(oldFileName)
    return newFileName
  }

  public async getFileAsBase64(fileName: string): Promise<string> {
    const disk = drive.use()
    const content = await disk.getBytes(fileName)
    const buffer = Buffer.from(content)
    const base64 = buffer.toString('base64')

    const extname = fileName.split('.').pop()?.toLowerCase()
    const mimeType = `image/${extname}`

    return `data:${mimeType};base64,${base64}`
  }
}
