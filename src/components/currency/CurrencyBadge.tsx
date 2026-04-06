'use client'

import { cn } from '@/lib/utils'
import { getCurrency, type CurrencyCode } from '@/lib/fx-rates'

interface CurrencyBadgeProps {
  code: CurrencyCode
  className?: string
  showName?: boolean
}

export function CurrencyBadge({
  code,
  className,
  showName = false,
}: CurrencyBadgeProps) {
  const currency = getCurrency(code)
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium',
        className
      )}
      aria-label={`${currency.name} (${code})`}
    >
      <span aria-hidden="true">{currency.flag}</span>
      <span>{code}</span>
      {showName && (
        <span className="text-muted-foreground">· {currency.name}</span>
      )}
    </span>
  )
}
