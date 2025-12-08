import { DateTime } from 'luxon'

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  postalCode: string
  phoneNumber: string
  companyName: string
  signature: string
  signatureUrl: string
  companyIcon: string
  companyIconUrl: string
  createdAt: DateTime
  updatedAt: DateTime
}

export type UpdateProfile = Partial<
  Omit<
    User,
    'signature' | 'signatureUrl' | 'companyIcon' | 'companyIconUrl' | 'createdAt' | 'updatedAt'
  > & {
    signature?: File
    companyIcon?: File
  }
>
