'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  convert,
  formatCurrency,
  type CurrencyCode,
} from '@/lib/fx-rates'
import { useActiveCurrency } from '@/stores/currency-store'

interface PriceDisplayProps {
  /** Canonical amount stored in USD */
  amountUSD: number
  /** Force a target currency; otherwise uses active currency */
  targetCurrency?: CurrencyCode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Show the USD base as a small secondary line */
  showBase?: boolean
  className?: string
  /** Animate the number when it changes */
  animate?: boolean
}

const SIZE_CLASSES: Record<NonNullable<PriceDisplayProps['size']>, string> = {
  sm: 'text-sm font-medium',
  md: 'text-lg font-semibold',
  lg: 'text-2xl font-bold tracking-tight',
  xl: 'text-4xl font-bold tracking-tight',
}

export function PriceDisplay({
  amountUSD,
  targetCurrency,
  size = 'md',
  showBase = false,
  className,
  animate = true,
}: PriceDisplayProps) {
  const active = useActiveCurrency()
  const target = targetCurrency ?? active
  const converted = convert(amountUSD, 'USD', target)
  const formatted = formatCurrency(converted, target)

  // Small tick animation when value/currency changes
  const [key, setKey] = useState(0)
  useEffect(() => {
    if (!animate) return
    setKey((k) => k + 1)
  }, [formatted, animate])

  return (
    <span
      className={cn('inline-flex flex-col leading-tight', className)}
      aria-label={`${formatted}${target !== 'USD' ? `, equivalent to ${formatCurrency(amountUSD, 'USD')}` : ''}`}
    >
      <span
        key={key}
        className={cn(
          SIZE_CLASSES[size],
          animate && 'animate-in fade-in slide-in-from-bottom-1 duration-300'
        )}
      >
        {formatted}
      </span>
      {showBase && target !== 'USD' && (
        <span className="text-xs font-normal text-muted-foreground">
          {formatCurrency(amountUSD, 'USD')} base
        </span>
      )}
    </span>
  )
}
