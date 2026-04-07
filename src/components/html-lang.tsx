'use client'

import { useEffect } from 'react'
import { useLanguageStore } from '@/stores/language-store'

/**
 * Client component that keeps <html lang="..."> in sync with the language store.
 * Runs after hydration to avoid SSR mismatch.
 */
export function HtmlLangSync() {
  const { language } = useLanguageStore()

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  return null
}
