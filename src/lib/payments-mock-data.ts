/**
 * Mock data for payments / multi-currency MVP demo.
 * All amounts stored as USD base — converted to display currency at render time.
 */

import type { CurrencyCode } from './fx-rates'

export type TransactionStatus = 'HELD' | 'RELEASED' | 'PENDING'

export interface MockTransaction {
  id: string
  tourTitle: string
  touristName: string
  touristCountry: string // ISO code
  touristCurrency: CurrencyCode
  /** Amount the tourist paid in their own currency (original) */
  amountTouristCurrency: number
  /** Canonical amount in USD (what the platform stores) */
  amountUSD: number
  status: TransactionStatus
  createdAt: string // ISO
  feePct: number // Global Tour fee, e.g. 0.02
}

export interface MockTour {
  id: string
  title: string
  imageUrl: string
  hostName: string
  hostAvatar: string
  durationMin: number
  dateISO: string
  priceUSD: number
  city: string
  rating: number
}

export interface MockPayoutMethod {
  id: string
  type: 'bank' | 'paypal' | 'wise' | 'usdt'
  label: string
  detail: string
  /** FX cost estimate applied on withdraw */
  feePct: number
}

export interface MockHostBalance {
  /** Canonical balance in USD */
  amountUSD: number
  /** Host preferred payout currency */
  payoutCurrency: CurrencyCode
  pendingUSD: number
  lifetimeEarnedUSD: number
}

export const MOCK_HOST_BALANCE: MockHostBalance = {
  amountUSD: 1234.56,
  payoutCurrency: 'MXN',
  pendingUSD: 215.0,
  lifetimeEarnedUSD: 8742.3,
}

export const MOCK_TOURS: MockTour[] = [
  {
    id: 'tour-1',
    title: 'Hidden Food Tour in Condesa',
    imageUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    hostName: 'Carlos Mendez',
    hostAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Carlos',
    durationMin: 180,
    dateISO: '2026-05-12T18:00:00Z',
    priceUSD: 48.0,
    city: 'Mexico City',
    rating: 4.8,
  },
  {
    id: 'tour-2',
    title: 'Gothic Quarter Photo Walk',
    imageUrl:
      'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80',
    hostName: 'Maria Garcia',
    hostAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Maria',
    durationMin: 120,
    dateISO: '2026-05-20T10:00:00Z',
    priceUSD: 65.0,
    city: 'Barcelona',
    rating: 4.9,
  },
  {
    id: 'tour-3',
    title: 'Shibuya Night Translation Companion',
    imageUrl:
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80',
    hostName: 'Takeshi Yamamoto',
    hostAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Takeshi',
    durationMin: 240,
    dateISO: '2026-06-02T19:00:00Z',
    priceUSD: 90.0,
    city: 'Tokyo',
    rating: 4.7,
  },
]

export const MOCK_TRANSACTIONS: MockTransaction[] = [
  {
    id: 'tx-1',
    tourTitle: 'Hidden Food Tour in Condesa',
    touristName: 'Anna Schmidt',
    touristCountry: 'DE',
    touristCurrency: 'EUR',
    amountTouristCurrency: 44.16,
    amountUSD: 48.0,
    status: 'RELEASED',
    createdAt: '2026-04-01T14:22:00Z',
    feePct: 0.02,
  },
  {
    id: 'tx-2',
    tourTitle: 'City Welcome Walk',
    touristName: 'Liam O\u2019Connor',
    touristCountry: 'IE',
    touristCurrency: 'EUR',
    amountTouristCurrency: 27.6,
    amountUSD: 30.0,
    status: 'RELEASED',
    createdAt: '2026-03-28T09:15:00Z',
    feePct: 0.02,
  },
  {
    id: 'tx-3',
    tourTitle: 'Sunset Rooftop Tour',
    touristName: 'Yuki Tanaka',
    touristCountry: 'JP',
    touristCurrency: 'JPY',
    amountTouristCurrency: 9432,
    amountUSD: 60.0,
    status: 'HELD',
    createdAt: '2026-04-03T20:01:00Z',
    feePct: 0.02,
  },
  {
    id: 'tx-4',
    tourTitle: 'Local Markets Photo Walk',
    touristName: 'Sophie Laurent',
    touristCountry: 'FR',
    touristCurrency: 'EUR',
    amountTouristCurrency: 59.8,
    amountUSD: 65.0,
    status: 'RELEASED',
    createdAt: '2026-03-20T11:40:00Z',
    feePct: 0.02,
  },
  {
    id: 'tx-5',
    tourTitle: 'Historic Downtown Walk',
    touristName: 'Michael Brown',
    touristCountry: 'US',
    touristCurrency: 'USD',
    amountTouristCurrency: 35.0,
    amountUSD: 35.0,
    status: 'PENDING',
    createdAt: '2026-04-04T16:05:00Z',
    feePct: 0.02,
  },
  {
    id: 'tx-6',
    tourTitle: 'Street Food Adventure',
    touristName: 'Priya Sharma',
    touristCountry: 'IN',
    touristCurrency: 'INR',
    amountTouristCurrency: 3336,
    amountUSD: 40.0,
    status: 'RELEASED',
    createdAt: '2026-03-15T13:30:00Z',
    feePct: 0.02,
  },
  {
    id: 'tx-7',
    tourTitle: 'Bondi Coastal Hike',
    touristName: 'James Wilson',
    touristCountry: 'AU',
    touristCurrency: 'AUD',
    amountTouristCurrency: 83.6,
    amountUSD: 55.0,
    status: 'HELD',
    createdAt: '2026-04-02T07:45:00Z',
    feePct: 0.02,
  },
]

export const MOCK_PAYOUT_METHODS: MockPayoutMethod[] = [
  {
    id: 'pm-bank',
    type: 'bank',
    label: 'Bank Transfer',
    detail: 'BBVA ****4521',
    feePct: 0.005,
  },
  {
    id: 'pm-paypal',
    type: 'paypal',
    label: 'PayPal',
    detail: 'carlos@example.com',
    feePct: 0.02,
  },
  {
    id: 'pm-wise',
    type: 'wise',
    label: 'Wise',
    detail: 'Multi-currency account',
    feePct: 0.008,
  },
  {
    id: 'pm-usdt',
    type: 'usdt',
    label: 'USDT (TRC20)',
    detail: '0x****...a3f9',
    feePct: 0.003,
  },
]
