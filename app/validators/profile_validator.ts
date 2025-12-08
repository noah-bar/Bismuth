import vine from '@vinejs/vine'

export const updateProfileValidator = vine.compile(
  vine.object({
    address: vine.string().trim().optional(),
    postalCode: vine.string().postalCode().trim().optional(),
    city: vine.string().trim().optional(),
    phoneNumber: vine.string().mobile().trim().optional(),
    companyName: vine.string().trim().optional(),
    companyIcon: vine.file({ extnames: ['png', 'jpg', 'jpeg', 'webp'], size: '5mb' }).optional(),
    signature: vine.file({ extnames: ['png', 'jpg', 'jpeg', 'webp'], size: '5mb' }).optional(),
  })
)
