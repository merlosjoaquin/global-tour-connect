'use client'

import * as React from 'react'
import { toast } from 'sonner'
import {
  ArrowDownRight,
  ArrowRight,
  BadgeCheck,
  Banknote,
  Bitcoin,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Landmark,
  Loader2,
  Star,
  TrendingUp,
  Wallet,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  convert,
  formatCurrency,
  getFxRate,
  type CurrencyCode,
} from '@/lib/fx-rates'
import { getCountry } from '@/lib/country-currency-map'
import {
  MOCK_HOST_BALANCE,
  MOCK_PAYOUT_METHODS,
  MOCK_TRANSACTIONS,
  type MockPayoutMethod,
  type MockTransaction,
} from '@/lib/payments-mock-data'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { BalanceCard } from '@/components/currency/BalanceCard'
import { DemoHeader } from '@/components/currency/DemoHeader'
import { useTranslation } from '@/stores/language-store'

const METHOD_ICON: Record<MockPayoutMethod['type'], React.ReactNode> = {
  bank: <Landmark className="h-4 w-4" />,
  paypal: <Banknote className="h-4 w-4" />,
  wise: <ArrowRight className="h-4 w-4" />,
  usdt: <Bitcoin className="h-4 w-4" />,
}

const STATUS_STYLES: Record<
  MockTransaction['status'],
  { labelKey: string; className: string; icon: React.ReactNode }
> = {
  HELD: {
    labelKey: 'wallet.statusHeld',
    className:
      'bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-200',
    icon: <Clock3 className="h-3 w-3" />,
  },
  RELEASED: {
    labelKey: 'wallet.statusReleased',
    className:
      'bg-emerald-100 text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-200',
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
  PENDING: {
    labelKey: 'wallet.statusPending',
    className:
      'bg-slate-100 text-slate-900 dark:bg-slate-500/20 dark:text-slate-200',
    icon: <Clock3 className="h-3 w-3" />,
  },
}

export default function WalletPage() {
  const { t } = useTranslation()
  const balance = MOCK_HOST_BALANCE
  const hostCurrency = balance.payoutCurrency
  const [withdrawOpen, setWithdrawOpen] = React.useState(false)

  const monthEarnedUSD = MOCK_TRANSACTIONS.filter(
    (t) => t.status === 'RELEASED'
  ).reduce((acc, t) => acc + t.amountUSD * (1 - t.feePct), 0)
  const completedTours = MOCK_TRANSACTIONS.filter(
    (t) => t.status !== 'PENDING'
  ).length

  return (
    <div className="min-h-dvh bg-muted/30">
      <DemoHeader title={t('wallet.title')} backHref="/perfil" />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-6 sm:pt-10">
        <div className="mb-5">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {t('wallet.title')}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t('wallet.subtitle')}
          </p>
        </div>

        <BalanceCard
          amountUSD={balance.amountUSD}
          displayCurrency={hostCurrency}
          pendingUSD={balance.pendingUSD}
          onWithdraw={() => setWithdrawOpen(true)}
        />

        {/* Stats row */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          <StatCard
            icon={<TrendingUp className="h-4 w-4" />}
            label={t('wallet.thisMonth')}
            value={formatCurrency(
              convert(monthEarnedUSD, 'USD', hostCurrency),
              hostCurrency,
              { compact: true }
            )}
          />
          <StatCard
            icon={<CalendarDays className="h-4 w-4" />}
            label={t('wallet.completed')}
            value={`${completedTours}`}
            suffix={t('wallet.tours')}
          />
          <StatCard
            icon={<Star className="h-4 w-4" />}
            label={t('wallet.ratingLabel')}
            value="4.8"
            suffix="/ 5.0"
          />
        </div>

        {/* Tabs */}
        <div className="mt-6">
          <Tabs defaultValue="transactions">
            <TabsList className="w-full">
              <TabsTrigger value="transactions">{t('wallet.transactions')}</TabsTrigger>
              <TabsTrigger value="payouts">{t('wallet.withdrawals')}</TabsTrigger>
              <TabsTrigger value="analytics">{t('wallet.analytics')}</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions" className="mt-4">
              <div className="space-y-2.5">
                {MOCK_TRANSACTIONS.map((tx) => (
                  <TransactionRow
                    key={tx.id}
                    tx={tx}
                    hostCurrency={hostCurrency}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="payouts" className="mt-4">
              <Card className="rounded-2xl p-5">
                <h3 className="font-heading text-sm font-semibold">
                  {t('wallet.withdrawMethods')}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t('wallet.withdrawMethodsDesc')}
                </p>
                <div className="mt-3 space-y-2">
                  {MOCK_PAYOUT_METHODS.map((pm) => (
                    <div
                      key={pm.id}
                      className="flex items-center justify-between rounded-xl border bg-background p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="grid h-9 w-9 place-items-center rounded-lg bg-muted text-muted-foreground">
                          {METHOD_ICON[pm.type]}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{pm.label}</div>
                          <div className="text-sm text-muted-foreground">
                            {pm.detail}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {(pm.feePct * 100).toFixed(1)}% {t('wallet.commission')}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="mt-4">
              <Card className="rounded-2xl p-5">
                <h3 className="font-heading text-sm font-semibold">
                  {t('wallet.totalEarnings')}
                </h3>
                <div className="mt-3 text-3xl font-bold tabular-nums">
                  {formatCurrency(
                    convert(balance.lifetimeEarnedUSD, 'USD', hostCurrency),
                    hostCurrency
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatCurrency(balance.lifetimeEarnedUSD, 'USD')} {t('wallet.base')}
                </p>
                <div className="mt-4 grid grid-cols-7 gap-1.5">
                  {[40, 65, 45, 80, 55, 90, 72].map((h, i) => (
                    <div
                      key={i}
                      className="flex h-24 items-end rounded-md bg-muted"
                      aria-hidden="true"
                    >
                      <div
                        className="w-full rounded-md bg-primary transition-all"
                        style={{ height: `${h}%` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-2 grid grid-cols-7 gap-1.5 text-center text-xs text-muted-foreground">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                    <span key={i}>{d}</span>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <WithdrawDialog
        open={withdrawOpen}
        onOpenChange={setWithdrawOpen}
        balanceUSD={balance.amountUSD}
        hostCurrency={hostCurrency}
      />
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  suffix,
}: {
  icon: React.ReactNode
  label: string
  value: string
  suffix?: string
}) {
  return (
    <Card className="rounded-2xl p-3" size="sm">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <span className="text-primary">{icon}</span>
        <span className="truncate">{label}</span>
      </div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-lg font-bold tabular-nums leading-none">
          {value}
        </span>
        {suffix && (
          <span className="text-xs text-muted-foreground">{suffix}</span>
        )}
      </div>
    </Card>
  )
}

function TransactionRow({
  tx,
  hostCurrency,
}: {
  tx: MockTransaction
  hostCurrency: CurrencyCode
}) {
  const { t } = useTranslation()
  const status = STATUS_STYLES[tx.status]
  const country = getCountry(tx.touristCountry)
  const hostReceivesUSD = tx.amountUSD * (1 - tx.feePct)
  const hostReceives = formatCurrency(
    convert(hostReceivesUSD, 'USD', hostCurrency),
    hostCurrency
  )
  const touristPaid = formatCurrency(
    tx.amountTouristCurrency,
    tx.touristCurrency
  )

  return (
    <Card className="rounded-2xl p-4" size="sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="truncate text-sm font-medium">{tx.tourTitle}</h4>
            <span
              className={cn(
                'inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold uppercase tracking-wide',
                status.className
              )}
            >
              {status.icon}
              {t(status.labelKey)}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            {country && <span aria-hidden="true">{country.flag}</span>}
            <span className="truncate">{tx.touristName}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold tabular-nums text-emerald-700 dark:text-emerald-400">
            + {hostReceives}
          </div>
          <div className="mt-0.5 text-sm tabular-nums text-muted-foreground">
            {touristPaid}
          </div>
        </div>
      </div>
    </Card>
  )
}

function WithdrawDialog({
  open,
  onOpenChange,
  balanceUSD,
  hostCurrency,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  balanceUSD: number
  hostCurrency: CurrencyCode
}) {
  const { t } = useTranslation()
  const balanceInHost = convert(balanceUSD, 'USD', hostCurrency)
  const [amount, setAmount] = React.useState(() =>
    balanceInHost.toFixed(hostCurrency === 'JPY' ? 0 : 2)
  )
  const [method, setMethod] = React.useState<string>(MOCK_PAYOUT_METHODS[0].id)
  const [submitting, setSubmitting] = React.useState(false)
  const rate = getFxRate('USD', hostCurrency)
  const selectedMethod = MOCK_PAYOUT_METHODS.find((m) => m.id === method)!

  const amountNum = parseFloat(amount) || 0
  const feeAmount = amountNum * selectedMethod.feePct
  const receive = amountNum - feeAmount

  const handleSubmit = async () => {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSubmitting(false)
    onOpenChange(false)
    toast.success(t('wallet.withdrawRequested'), {
      description: formatCurrency(receive, hostCurrency) + ' ' + t('wallet.withdrawDesc').replace('{method}', selectedMethod.label),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowDownRight className="h-5 w-5 text-primary" />
            {t('wallet.withdrawFunds')}
          </DialogTitle>
          <DialogDescription>
            {t('wallet.availableBalance')}:{' '}
            <span className="font-semibold text-foreground">
              {formatCurrency(balanceInHost, hostCurrency)}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="wd-amount"
              className="mb-1.5 block text-sm font-medium"
            >
              {t('wallet.amount')} ({hostCurrency})
            </label>
            <Input
              id="wd-amount"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg font-semibold tabular-nums"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">
              {t('wallet.sendTo')}
            </label>
            <div className="space-y-1.5">
              {MOCK_PAYOUT_METHODS.map((pm) => {
                const selected = method === pm.id
                return (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setMethod(pm.id)}
                    aria-pressed={selected}
                    className={cn(
                      'flex w-full items-center justify-between rounded-xl border p-2.5 text-left transition-all',
                      'hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                      selected
                        ? 'border-primary bg-accent/40'
                        : 'border-border bg-background'
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="grid h-8 w-8 place-items-center rounded-lg bg-muted text-muted-foreground">
                        {METHOD_ICON[pm.type]}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{pm.label}</div>
                        <div className="text-sm text-muted-foreground">
                          {pm.detail}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {(pm.feePct * 100).toFixed(1)}%
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-1.5 rounded-xl bg-muted/60 p-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('wallet.estimatedRate')}</span>
              <span className="font-medium tabular-nums">
                1 USD ≈ {rate.toFixed(hostCurrency === 'JPY' ? 2 : 4)}{' '}
                {hostCurrency}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('wallet.commissionLabel')}</span>
              <span className="font-medium tabular-nums">
                − {formatCurrency(feeAmount, hostCurrency)}
              </span>
            </div>
            <div className="flex justify-between border-t pt-1.5">
              <span className="font-medium">{t('wallet.youReceive')}</span>
              <span className="font-bold tabular-nums">
                {formatCurrency(receive, hostCurrency)}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-800/40 dark:bg-amber-950/30 dark:text-amber-200">
            <BadgeCheck
              className="mt-0.5 h-4 w-4 shrink-0"
              aria-hidden="true"
            />
            <span>
              {t('wallet.rateDisclaimer')}
            </span>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={submitting}
            >
              {t('common.cancel')}
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={submitting || amountNum <= 0}
              className="flex-1 gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t('wallet.processing')}
                </>
              ) : (
                <>
                  <Wallet className="h-4 w-4" />
                  {t('common.confirm')}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
