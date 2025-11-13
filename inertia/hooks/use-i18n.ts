import { usePage } from '@inertiajs/react'

export type I18nContext = {
  locale: string
  translations: Record<string, string>
  supportedLocales: string[]
}

export function useI18n() {
  const props = usePage().props
  const i18n = props.i18n as I18nContext

  const t = (key: string, fallback?: string) => {
    return i18n.translations[key] ?? fallback ?? key
  }

  return {
    t,
  }
}
