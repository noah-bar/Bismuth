import vine from '@vinejs/vine'
import { capitalizeRule } from '#validators/rules/capitalize_rule'

export const createUserValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().minLength(1).maxLength(80).use(capitalizeRule()),
    lastName: vine.string().trim().minLength(1).maxLength(80).use(capitalizeRule()),
    email: vine
      .string()
      .email()
      .maxLength(254)
      .toLowerCase()
      .unique({ table: 'users', column: 'email', caseInsensitive: true }),
    city: vine.string().trim().maxLength(120).use(capitalizeRule()).optional(),
    address: vine.string().trim().maxLength(200).use(capitalizeRule()).optional(),
    postalCode: vine.string().trim().maxLength(20).optional(),
    phoneNumber: vine.string().trim().maxLength(30).optional(),
    companyName: vine.string().trim().maxLength(160).use(capitalizeRule()).optional(),
    password: vine.string().trim().minLength(8).maxLength(255),
    companyIcon: vine.file({ extnames: ['png', 'jpg', 'jpeg', 'webp'], size: '5mb' }).optional(),
    signature: vine.file({ extnames: ['png', 'jpg', 'jpeg', 'webp'], size: '5mb' }).optional(),
  })
)
