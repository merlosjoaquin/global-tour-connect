'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CurrencyCode } from '@/lib/fx-rates'

interface CurrencyState {
  /** Currency the user explicitly chose */
  preferredCurrency: CurrencyCode
  /** Currency auto-detected from location/IP/country */
  detectedCurrency: CurrencyCode | null
  /** Whether auto-detect is enabled */
  autoDetect: boolean
  setPreferredCurrency: (code: CurrencyCode) => void
  setDetectedCurrency: (code: CurrencyCode | null) => void
  setAutoDetect: (enabled: boolean) => void
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      preferredCurrency: 'USD',
      detectedCurrency: null,
      autoDetect: true,
      setPreferredCurrency: (code) => set({ preferredCurrency: code }),
      setDetectedCurrency: (code) => set({ detectedCurrency: code }),
      setAutoDetect: (enabled) => set({ autoDetect: enabled }),
    }),
    {
      name: 'gtc-currency-prefs',
    }
  )
)

/** Returns the currency currently used for display. */
export function useActiveCurrency(): CurrencyCode {
  const { preferredCurrency, detectedCurrency, autoDetect } =
    useCurrencyStore()
  if (autoDetect && detectedCurrency) return detectedCurrency
  return preferredCurrency
}
