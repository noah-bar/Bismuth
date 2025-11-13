import { DateTime } from 'luxon'

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  createdAt: DateTime
  updatedAt: DateTime
}
