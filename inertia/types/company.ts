export type Company = {
  id: number
  name: string
  address: string
  postalCode: string
  city: string
  createdAt: string
  updatedAt: string
}

export type CreateCompany = Omit<Company, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateCompany = Partial<CreateCompany>
