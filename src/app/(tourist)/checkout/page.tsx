'use client'

import * as React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { toast } from 'sonner'
import {
  Calendar,
  Clock,
  CreditCard,
  Loader2,
  Lock,
  MapPin,
  ShieldCheck,
  Smartphone,
  Star,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  convert,
  formatCurrency,
  getCurrency,
} from '@/lib/fx-rates'
import { MOCK_TOURS, MOCK_HOST_BALANCE } from '@/lib/payments-mock-data'
import { useActiveCurrency } from '@/stores/currency-store'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { DemoHeader } from '@/components/currency/DemoHeader'
import { CurrencyBadge } from '@/components/currency/CurrencyBadge'
import { useTranslation } from '@/stores/language-store'

type PaymentMethod = 'card-visa' | 'card-master' | 'card-amex' | 'apple' | 'google'

const PAYMENT_METHODS: Array<{
  id: PaymentMethod
  label: string
  subKey?: string
  sub?: string
  icon: React.ReactNode
}> = [
  { id: 'card-visa',   label: 'Visa',        sub: '•••• 4242', icon: <CreditCard className="h-4 w-4" /> },
  { id: 'card-master', label: 'Mastercard',  sub: '•••• 8891', icon: <CreditCard className="h-4 w-4" /> },
  { id: 'card-amex',   label: 'American Express', sub: '•••• 1002', icon: <CreditCard className="h-4 w-4" /> },
  { id: 'apple',       label: 'Apple Pay',   sub: 'Touch ID', icon: <Smartphone className="h-4 w-4" /> },
  { id: 'google',      label: 'Google Pay',  subKey: 'checkout.linkedAccount', icon: <Smartphone className="h-4 w-4" /> },
]

const FEE_PCT = 0.02

export default function CheckoutPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const tour = MOCK_TOURS[0]
  const active = useActiveCurrency()
  const hostCurrency = MOCK_HOST_BALANCE.payoutCurrency
  const [method, setMethod] = React.useState<PaymentMethod>('card-visa')
  const [loading, setLoading] = React.useState(false)

  const basePriceUSD = tour.priceUSD
  const feeUSD = basePriceUSD * FEE_PCT
  const totalUSD = basePriceUSD + feeUSD

  const baseDisplay = formatCurrency(convert(basePriceUSD, 'USD', active), active)
  const feeDisplay = formatCurrency(convert(feeUSD, 'USD', active), active)
  const totalDisplay = formatCurrency(convert(totalUSD, 'USD', active), active)
  const hostReceives = formatCurrency(
    convert(basePriceUSD, 'USD', hostCurrency),
    hostCurrency
  )
  const activeC = getCurrency(active)

  const handlePay = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 3000))
    setLoading(false)
    toast.success(t('checkout.paymentConfirmed'), {
      description: t('checkout.paymentConfirmedDesc').replace('{amount}', totalDisplay),
    })
    setTimeout(() => router.push('/dashboard'), 600)
  }

  return (
    <div className="min-h-dvh bg-muted/30">
      <DemoHeader title={t('checkout.title')} backHref="/dashboard" />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-6 sm:pt-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {t('checkout.confirmAndPay')}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t('checkout.reviewTour')}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
          {/* LEFT: Tour summary + Payment methods */}
          <div className="space-y-5">
            {/* Tour card */}
            <Card className="overflow-hidden rounded-2xl p-0">
              <div className="flex flex-col sm:flex-row">
                <div className="relative h-44 w-full sm:h-auto sm:w-40 sm:shrink-0">
                  <Image
                    src={tour.imageUrl}
                    alt={tour.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 160px"
                    unoptimized
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-heading text-base font-semibold leading-tight">
                      {tour.title}
                    </h2>
                    <span className="flex shrink-0 items-center gap-1 text-sm font-medium">
                      <Star
                        className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                        aria-hidden="true"
                      />
                      {tour.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    {tour.city}
                    <span aria-hidden="true">·</span>
                    <span>{t('rating.with')} {tour.hostName}</span>
                  </div>
                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-2 text-xs">
                    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1">
                      <Calendar className="h-3 w-3" aria-hidden="true" />
                      {format(new Date(tour.dateISO), 'MMM d, yyyy · HH:mm')}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {tour.durationMin} min
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Payment methods */}
            <Card className="rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-base font-semibold">
                  {t('checkout.paymentMethod')}
                </h2>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3" aria-hidden="true" />
                  {t('checkout.encrypted')}
                </span>
              </div>
              <div className="mt-3 grid gap-2">
                {PAYMENT_METHODS.map((pm) => {
                  const selected = method === pm.id
                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setMethod(pm.id)}
                      aria-pressed={selected}
                      className={cn(
                        'flex items-center justify-between rounded-xl border bg-background p-3 text-left transition-all',
                        'hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
                        selected
                          ? 'border-primary bg-accent/40 ring-2 ring-primary/20'
                          : 'border-border'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            'grid h-9 w-9 place-items-center rounded-lg',
                            selected
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          )}
                        >
                          {pm.icon}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{pm.label}</div>
                          <div className="text-xs text-muted-foreground">
                            {pm.subKey ? t(pm.subKey) : pm.sub}
                          </div>
                        </div>
                      </div>
                      <span
                        aria-hidden="true"
                        className={cn(
                          'grid h-4 w-4 place-items-center rounded-full border-2 transition-colors',
                          selected
                            ? 'border-primary bg-primary'
                            : 'border-border'
                        )}
                      >
                        {selected && (
                          <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                        )}
                      </span>
                    </button>
                  )
                })}
              </div>
            </Card>
          </div>

          {/* RIGHT: Price summary */}
          <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <Card className="rounded-2xl p-5">
              <h2 className="font-heading text-base font-semibold">
                {t('checkout.priceBreakdown')}
              </h2>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <span>{t('checkout.payingIn')}</span>
                <CurrencyBadge code={active} />
              </div>

              <div className="mt-4 space-y-2.5 text-sm">
                <Row label={t('checkout.tourPrice')} value={baseDisplay} />
                <Row
                  label={
                    <span className="inline-flex items-center gap-1">
                      {t('checkout.gtcCommission')}
                      <span className="text-xs text-muted-foreground">
                        (2%)
                      </span>
                    </span>
                  }
                  value={feeDisplay}
                />
              </div>

              <Separator className="my-4" />

              <div className="flex items-baseline justify-between">
                <span className="font-semibold">{t('checkout.totalLabel')}</span>
                <span className="text-xl font-bold tabular-nums">
                  {totalDisplay}
                </span>
              </div>

              <div className="mt-4 rounded-xl bg-muted/60 p-3 text-xs leading-relaxed text-muted-foreground">
                <p>
                  {t('checkout.payingInCurrency')}{' '}
                  <span className="font-semibold text-foreground">
                    {activeC.name} ({active})
                  </span>
                  . {t('checkout.hostReceives')}{' '}
                  <span className="font-semibold text-foreground">
                    {hostReceives}
                  </span>{' '}
                  {t('checkout.inCurrency')} {hostCurrency}.
                </p>
              </div>

              <Button
                onClick={handlePay}
                disabled={loading}
                className="mt-4 h-11 w-full text-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t('wallet.processing')}
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" aria-hidden="true" />
                    {t('checkout.confirmAndPayBtn')} {totalDisplay}
                  </>
                )}
              </Button>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                {t('checkout.escrowNote')}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

function Row({
  label,
  value,
}: {
  label: React.ReactNode
  value: string
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium tabular-nums">{value}</span>
    </div>
  )
}
