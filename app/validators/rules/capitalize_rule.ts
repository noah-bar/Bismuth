import { FieldContext } from '@vinejs/vine/types'
import vine from '@vinejs/vine'

/**
 * Custom validation rule to capitalize the first letter of a string
 */
export const capitalizeRule = vine.createRule(
  (value: unknown, _options: undefined, field: FieldContext) => {
    if (typeof value !== 'string') {
      return
    }

    const capitalized = String(value).charAt(0).toUpperCase() + String(value).slice(1)
    field.mutate(capitalized, field)
  }
)
