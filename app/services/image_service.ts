import sharp from 'sharp'

export class ImageService {
  public async resize(
    buffer: Buffer<ArrayBufferLike>,
    options: sharp.ResizeOptions
  ): Promise<Buffer<ArrayBufferLike>> {
    return await sharp(buffer).resize(options).toBuffer()
  }

  public async toWebp(buffer: Buffer<ArrayBufferLike>): Promise<Buffer<ArrayBufferLike>> {
    return await sharp(buffer).webp({ quality: 90 }).toBuffer()
  }
}
