import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date, locale: string = 'fr-CH'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(dateObj)
}

export async function downloadPdf(url: string, title: string) {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/pdf',
    },
  })

  if (response.ok) {
    const blob = await response.blob()
    const uri = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = uri
    a.download = `${title}.pdf`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(uri)
    document.body.removeChild(a)
  }
}

export const sanitizeFormData = <T extends Record<string, any>>(data: T): T => {
  return Object.fromEntries(
    Object.entries(data || {}).map(([key, value]) => [
      key,
      value === null || value === undefined ? '' : value,
    ])
  ) as T
}
