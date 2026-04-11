'use client'

import { create } from 'zustand'
import { MOCK_HOST_BALANCE } from '@/lib/payments-mock-data'
import type { CurrencyCode } from '@/lib/fx-rates'

interface WalletState {
  amountUSD: number
  pendingUSD: number
  lifetimeEarnedUSD: number
  payoutCurrency: CurrencyCode
  /** Deduct a withdrawal from the available balance */
  withdraw: (amountInHostCurrency: number, hostCurrencyToUSDRate: number) => void
}

export const useWalletStore = create<WalletState>((set) => ({
  amountUSD: MOCK_HOST_BALANCE.amountUSD,
  pendingUSD: MOCK_HOST_BALANCE.pendingUSD,
  lifetimeEarnedUSD: MOCK_HOST_BALANCE.lifetimeEarnedUSD,
  payoutCurrency: MOCK_HOST_BALANCE.payoutCurrency,
  withdraw: (amountInHostCurrency, hostCurrencyToUSDRate) =>
    set((state) => {
      const deductUSD = amountInHostCurrency / hostCurrencyToUSDRate
      const newAmountUSD = Math.max(0, state.amountUSD - deductUSD)
      return { amountUSD: newAmountUSD }
    }),
}))
