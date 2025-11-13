import vine from '@vinejs/vine'

export const createCompanyValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    address: vine.string().trim(),
    postalCode: vine.string().trim(),
    city: vine.string().trim(),
  })
)

export const updateCompanyValidator = vine.compile(
  vine.object({
    name: vine.string().trim().optional(),
    address: vine.string().trim().optional(),
    postalCode: vine.string().trim().optional(),
    city: vine.string().trim().optional(),
  })
)
