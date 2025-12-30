import vine from '@vinejs/vine'
import { capitalizeRule } from '#validators/rules/capitalize_rule'

export const updateProfileValidator = vine.compile(
  vine.object({
    address: vine.string().trim().use(capitalizeRule()).nullable().optional(),
    postalCode: vine.string().postalCode().trim().nullable().optional(),
    city: vine.string().trim().use(capitalizeRule()).nullable().optional(),
    phoneNumber: vine.string().mobile().trim().nullable().optional(),
    companyName: vine.string().trim().use(capitalizeRule()).nullable().optional(),
    companyIcon: vine.file({ extnames: ['png', 'jpg', 'jpeg', 'webp'], size: '5mb' }).optional(),
    signature: vine.file({ extnames: ['png', 'jpg', 'jpeg', 'webp'], size: '5mb' }).optional(),
    currentPassword: vine.string().optional().requiredIfExists('newPassword'),
    newPassword: vine
      .string()
      .minLength(8)
      .confirmed()
      .optional()
      .requiredIfExists('currentPassword'),
  })
)
