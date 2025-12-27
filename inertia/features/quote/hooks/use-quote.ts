import { UpdateQuote } from '~/types/quote'
import { router } from '@inertiajs/react'
import { VisitOptions } from '@inertiajs/core'

export function useQuote() {
  const updateQuote = (id: number, quote: UpdateQuote, options?: VisitOptions) => {
    router.put(`/quotes/${id}`, quote, options)
  }

  return {
    updateQuote,
  }
}
