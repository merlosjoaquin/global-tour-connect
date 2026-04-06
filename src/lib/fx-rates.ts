/**
 * FX Rates — Mock conversion rates with USD as base currency.
 * All rates are "1 USD = X {currency}".
 * For MVP / Kickstarter demo only — NOT live rates.
 */

export type CurrencyCode =
  | 'USD' | 'EUR' | 'GBP' | 'JPY' | 'ARS' | 'BRL'
  | 'MXN' | 'CAD' | 'AUD' | 'CHF' | 'CNY' | 'INR'

export interface Currency {
  code: CurrencyCode
  name: string
  symbol: string
  flag: string
  /** Typical decimals for display (JPY = 0, most = 2) */
  decimals: number
}

export const CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar',        symbol: '$',   flag: '🇺🇸', decimals: 2 },
  { code: 'EUR', name: 'Euro',             symbol: '€',   flag: '🇪🇺', decimals: 2 },
  { code: 'GBP', name: 'British Pound',    symbol: '£',   flag: '🇬🇧', decimals: 2 },
  { code: 'JPY', name: 'Japanese Yen',     symbol: '¥',   flag: '🇯🇵', decimals: 0 },
  { code: 'ARS', name: 'Argentine Peso',   symbol: '$',   flag: '🇦🇷', decimals: 2 },
  { code: 'BRL', name: 'Brazilian Real',   symbol: 'R$',  flag: '🇧🇷', decimals: 2 },
  { code: 'MXN', name: 'Mexican Peso',     symbol: '$',   flag: '🇲🇽', decimals: 2 },
  { code: 'CAD', name: 'Canadian Dollar',  symbol: 'CA$', flag: '🇨🇦', decimals: 2 },
  { code: 'AUD', name: 'Australian Dollar',symbol: 'A$',  flag: '🇦🇺', decimals: 2 },
  { code: 'CHF', name: 'Swiss Franc',      symbol: 'Fr',  flag: '🇨🇭', decimals: 2 },
  { code: 'CNY', name: 'Chinese Yuan',     symbol: '¥',   flag: '🇨🇳', decimals: 2 },
  { code: 'INR', name: 'Indian Rupee',     symbol: '₹',   flag: '🇮🇳', decimals: 2 },
]

/** 1 USD = X {currency} — hardcoded mock rates */
export const FX_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 157.2,
  ARS: 1015.5,
  BRL: 5.42,
  MXN: 17.15,
  CAD: 1.37,
  AUD: 1.52,
  CHF: 0.88,
  CNY: 7.24,
  INR: 83.4,
}

export function getCurrency(code: CurrencyCode): Currency {
  const c = CURRENCIES.find((x) => x.code === code)
  if (!c) throw new Error(`Unknown currency: ${code}`)
  return c
}

/** Returns how many `to` units you get for 1 `from` unit. */
export function getFxRate(from: CurrencyCode, to: CurrencyCode): number {
  if (from === to) return 1
  // Convert from -> USD -> to
  const fromRate = FX_RATES[from]
  const toRate = FX_RATES[to]
  return toRate / fromRate
}

/** Convert amount from one currency to another */
export function convert(
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode
): number {
  return amount * getFxRate(from, to)
}

/** Format a number in a given currency using Intl */
export function formatCurrency(
  amount: number,
  code: CurrencyCode,
  opts: { showSymbol?: boolean; compact?: boolean } = {}
): string {
  const { showSymbol = true, compact = false } = opts
  const currency = getCurrency(code)
  const formatter = new Intl.NumberFormat('en-US', {
    style: showSymbol ? 'currency' : 'decimal',
    currency: code,
    minimumFractionDigits: currency.decimals,
    maximumFractionDigits: currency.decimals,
    notation: compact ? 'compact' : 'standard',
  })
  return formatter.format(amount)
}

/** Convenience: convert from USD to target currency and format */
export function formatFromUSD(
  amountUSD: number,
  target: CurrencyCode,
  opts?: { showSymbol?: boolean; compact?: boolean }
): string {
  const converted = convert(amountUSD, 'USD', target)
  return formatCurrency(converted, target, opts)
}
