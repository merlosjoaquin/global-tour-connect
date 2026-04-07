'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { translations, type Language } from '@/lib/translations'

interface LanguageState {
  language: Language
  setLanguage: (lang: Language) => void
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'es',
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'gtc_app_language',
    }
  )
)

/**
 * Returns a `t(key)` function that resolves dot-separated keys
 * against the current language's translation map.
 * Falls back to Spanish if the key is missing.
 */
export function useTranslation() {
  const { language } = useLanguageStore()

  const t = (key: string): string => {
    const parts = key.split('.')
    // Try current language first
    let value: unknown = translations[language]
    for (const part of parts) {
      if (value && typeof value === 'object' && part in value) {
        value = (value as Record<string, unknown>)[part]
      } else {
        value = undefined
        break
      }
    }
    if (typeof value === 'string') return value

    // Fallback to Spanish
    let fallback: unknown = translations.es
    for (const part of parts) {
      if (fallback && typeof fallback === 'object' && part in fallback) {
        fallback = (fallback as Record<string, unknown>)[part]
      } else {
        return key // Return the key itself if not found in fallback either
      }
    }
    return typeof fallback === 'string' ? fallback : key
  }

  return { t, language }
}
