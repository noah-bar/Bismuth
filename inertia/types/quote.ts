import { Company } from '~/types/company'
import { Contact } from '~/types/contact'

export enum QuoteStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
  CLOSED = 'closed',
}

export type QuoteItem = {
  title: string
  description?: string
  order: number
  price: number
}

export type Quote = {
  id: number
  title: string
  date: string
  currency: 'CHF' | 'EUR' | 'USD'
  status: QuoteStatus
  companyId: number
  company: Company
  contactId: number
  contact: Contact
  taxIncluded: boolean
  version: number
  items: QuoteItem[]
  totalPrice: number
  totalPriceWithVat: number
  createdAt: string
  updatedAt: string
}

export type CreateQuote = Omit<Quote, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateQuote = Partial<CreateQuote>
