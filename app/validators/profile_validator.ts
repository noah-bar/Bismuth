import vine from '@vinejs/vine'
import { capitalizeRule } from '#validators/rules/capitalize_rule'

export const updateProfileValidator = vine.compile(
  vine.object({
    address: vine.string().trim().use(capitalizeRule()).optional(),
    postalCode: vine.string().postalCode().trim().optional(),
    city: vine.string().trim().use(capitalizeRule()).optional(),
    phoneNumber: vine.string().mobile().trim().optional(),
    companyName: vine.string().trim().use(capitalizeRule()).optional(),
    companyIcon: vine.file({ extnames: ['png', 'jpg', 'jpeg', 'webp'], size: '5mb' }).optional(),
    signature: vine.file({ extnames: ['png', 'jpg', 'jpeg', 'webp'], size: '5mb' }).optional(),
  })
)
