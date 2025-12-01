import vine from '@vinejs/vine'

export const createContactValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim(),
    lastName: vine.string().trim(),
    email: vine.string().email().toLowerCase().trim(),
  })
)

export const updateContactValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().optional(),
    lastName: vine.string().trim().optional(),
    email: vine.string().email().trim().toLowerCase().optional(),
  })
)
