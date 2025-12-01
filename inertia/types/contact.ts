export type Contact = {
  id: number
  firstName: string
  lastName: string
  email: string
  createdAt: string
  updatedAt: string
}

export type CreateContact = Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateContact = Partial<CreateContact>
