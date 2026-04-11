'use client'

import Link from 'next/link'
import { ArrowLeft, Globe } from 'lucide-react'
import { CurrencySwitcher } from '@/components/currency/CurrencySwitcher'
import { ThemeToggle } from '@/components/theme-toggle'
import { useCurrencyStore } from '@/stores/currency-store'

interface DemoHeaderProps {
  title?: string
  backHref?: string
}

export function DemoHeader({ title, backHref }: DemoHeaderProps) {
  const { preferredCurrency, setPreferredCurrency, setAutoDetect } = useCurrencyStore()

  const handleCurrencyChange = (code: Parameters<typeof setPreferredCurrency>[0]) => {
    setPreferredCurrency(code)
    setAutoDetect(false)
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-3 px-4">
        <div className="flex min-w-0 items-center gap-2">
          {backHref && (
            <Link
              href={backHref}
              aria-label="Back"
              className="grid h-8 w-8 place-items-center rounded-full hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            </Link>
          )}
          <Link
            href="/dashboard"
            aria-label="Home"
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Globe className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="hidden sm:inline">Aditly</span>
          </Link>
          {title && (
            <>
              <span
                aria-hidden="true"
                className="hidden text-muted-foreground sm:inline"
              >
                /
              </span>
              <span className="truncate text-sm font-medium text-muted-foreground">
                {title}
              </span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <CurrencySwitcher
            value={preferredCurrency}
            onChange={handleCurrencyChange}
            compact
            align="end"
          />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
