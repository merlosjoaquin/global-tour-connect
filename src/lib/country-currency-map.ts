/**
 * Maps ISO 3166-1 alpha-2 country code → currency code supported by the app.
 * For countries whose local currency is not in our supported list, we fall
 * back to the most logical alternative (USD or EUR).
 */

import type { CurrencyCode } from './fx-rates'

export interface Country {
  code: string // ISO alpha-2
  name: string
  flag: string
  currency: CurrencyCode
}

export const COUNTRIES: Country[] = [
  { code: 'US', name: 'United States',    flag: '🇺🇸', currency: 'USD' },
  { code: 'CA', name: 'Canada',           flag: '🇨🇦', currency: 'CAD' },
  { code: 'MX', name: 'Mexico',           flag: '🇲🇽', currency: 'MXN' },
  { code: 'GB', name: 'United Kingdom',   flag: '🇬🇧', currency: 'GBP' },
  { code: 'IE', name: 'Ireland',          flag: '🇮🇪', currency: 'EUR' },
  { code: 'FR', name: 'France',           flag: '🇫🇷', currency: 'EUR' },
  { code: 'DE', name: 'Germany',          flag: '🇩🇪', currency: 'EUR' },
  { code: 'ES', name: 'Spain',            flag: '🇪🇸', currency: 'EUR' },
  { code: 'IT', name: 'Italy',            flag: '🇮🇹', currency: 'EUR' },
  { code: 'PT', name: 'Portugal',         flag: '🇵🇹', currency: 'EUR' },
  { code: 'NL', name: 'Netherlands',      flag: '🇳🇱', currency: 'EUR' },
  { code: 'BE', name: 'Belgium',          flag: '🇧🇪', currency: 'EUR' },
  { code: 'AT', name: 'Austria',          flag: '🇦🇹', currency: 'EUR' },
  { code: 'GR', name: 'Greece',           flag: '🇬🇷', currency: 'EUR' },
  { code: 'FI', name: 'Finland',          flag: '🇫🇮', currency: 'EUR' },
  { code: 'CH', name: 'Switzerland',      flag: '🇨🇭', currency: 'CHF' },
  { code: 'SE', name: 'Sweden',           flag: '🇸🇪', currency: 'EUR' },
  { code: 'NO', name: 'Norway',           flag: '🇳🇴', currency: 'EUR' },
  { code: 'DK', name: 'Denmark',          flag: '🇩🇰', currency: 'EUR' },
  { code: 'PL', name: 'Poland',           flag: '🇵🇱', currency: 'EUR' },
  { code: 'CZ', name: 'Czech Republic',   flag: '🇨🇿', currency: 'EUR' },
  { code: 'JP', name: 'Japan',            flag: '🇯🇵', currency: 'JPY' },
  { code: 'CN', name: 'China',            flag: '🇨🇳', currency: 'CNY' },
  { code: 'KR', name: 'South Korea',      flag: '🇰🇷', currency: 'USD' },
  { code: 'IN', name: 'India',            flag: '🇮🇳', currency: 'INR' },
  { code: 'SG', name: 'Singapore',        flag: '🇸🇬', currency: 'USD' },
  { code: 'HK', name: 'Hong Kong',        flag: '🇭🇰', currency: 'USD' },
  { code: 'TH', name: 'Thailand',         flag: '🇹🇭', currency: 'USD' },
  { code: 'ID', name: 'Indonesia',        flag: '🇮🇩', currency: 'USD' },
  { code: 'PH', name: 'Philippines',      flag: '🇵🇭', currency: 'USD' },
  { code: 'VN', name: 'Vietnam',          flag: '🇻🇳', currency: 'USD' },
  { code: 'AU', name: 'Australia',        flag: '🇦🇺', currency: 'AUD' },
  { code: 'NZ', name: 'New Zealand',      flag: '🇳🇿', currency: 'AUD' },
  { code: 'BR', name: 'Brazil',           flag: '🇧🇷', currency: 'BRL' },
  { code: 'AR', name: 'Argentina',        flag: '🇦🇷', currency: 'ARS' },
  { code: 'CL', name: 'Chile',            flag: '🇨🇱', currency: 'USD' },
  { code: 'CO', name: 'Colombia',         flag: '🇨🇴', currency: 'USD' },
  { code: 'PE', name: 'Peru',             flag: '🇵🇪', currency: 'USD' },
  { code: 'UY', name: 'Uruguay',          flag: '🇺🇾', currency: 'USD' },
  { code: 'ZA', name: 'South Africa',     flag: '🇿🇦', currency: 'USD' },
  { code: 'EG', name: 'Egypt',            flag: '🇪🇬', currency: 'USD' },
  { code: 'MA', name: 'Morocco',          flag: '🇲🇦', currency: 'EUR' },
  { code: 'AE', name: 'UAE',              flag: '🇦🇪', currency: 'USD' },
  { code: 'TR', name: 'Turkey',           flag: '🇹🇷', currency: 'EUR' },
  { code: 'IL', name: 'Israel',           flag: '🇮🇱', currency: 'USD' },
]

export function getCurrencyForCountry(countryCode: string): CurrencyCode {
  const c = COUNTRIES.find((x) => x.code === countryCode.toUpperCase())
  return c?.currency ?? 'USD'
}

export function getCountry(countryCode: string): Country | undefined {
  return COUNTRIES.find((x) => x.code === countryCode.toUpperCase())
}
