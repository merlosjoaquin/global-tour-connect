'use client'

import Link from 'next/link'
import { ArrowUpRight, TrendingUp, Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  convert,
  formatCurrency,
  getCurrency,
  getFxRate,
  type CurrencyCode,
} from '@/lib/fx-rates'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface BalanceCardProps {
  amountUSD: number
  displayCurrency: CurrencyCode
  pendingUSD?: number
  className?: string
  withdrawHref?: string
  onWithdraw?: () => void
}

export function BalanceCard({
  amountUSD,
  displayCurrency,
  pendingUSD = 0,
  className,
  withdrawHref,
  onWithdraw,
}: BalanceCardProps) {
  const currency = getCurrency(displayCurrency)
  const converted = convert(amountUSD, 'USD', displayCurrency)
  const rate = getFxRate('USD', displayCurrency)

  return (
    <Card
      className={cn(
        'relative overflow-hidden rounded-3xl border-0 bg-gradient-to-br from-primary to-primary/70 p-6 text-primary-foreground shadow-xl',
        className
      )}
    >
      {/* Decorative blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-white/5 blur-3xl"
      />

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium opacity-90">
          <Wallet className="h-4 w-4" aria-hidden="true" />
          <span>Tu saldo</span>
        </div>
        <span
          className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium backdrop-blur"
          aria-label={`Divisa de visualizacion ${currency.name}`}
        >
          <span aria-hidden="true">{currency.flag}</span>
          {displayCurrency}
        </span>
      </div>

      <div className="relative mt-6">
        <div className="text-4xl font-bold tracking-tight tabular-nums sm:text-5xl">
          {formatCurrency(converted, displayCurrency)}
        </div>
        <div className="mt-1 text-sm opacity-80">
          ≈ {formatCurrency(amountUSD, 'USD')} base
        </div>
      </div>

      <div className="relative mt-5 flex items-center gap-2 text-xs opacity-80">
        <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
        <span>
          1 USD = {rate.toFixed(displayCurrency === 'JPY' ? 2 : 4)}{' '}
          {displayCurrency}
        </span>
      </div>

      {pendingUSD > 0 && (
        <div className="relative mt-3 inline-flex rounded-lg bg-white/10 px-3 py-1.5 text-xs backdrop-blur">
          <span className="opacity-80">Pendiente de liberacion:&nbsp;</span>
          <span className="font-semibold">
            {formatCurrency(
              convert(pendingUSD, 'USD', displayCurrency),
              displayCurrency
            )}
          </span>
        </div>
      )}

      <div className="relative mt-6">
        {withdrawHref ? (
          <Button
            render={<Link href={withdrawHref} />}
            variant="secondary"
            className="w-full gap-2 bg-white text-primary hover:bg-white/90"
          >
            Retirar a banco
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={onWithdraw}
            variant="secondary"
            className="w-full gap-2 bg-white text-primary hover:bg-white/90"
          >
            Retirar a banco
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </Card>
  )
}
