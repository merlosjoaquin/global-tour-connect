'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ArrowRight, Globe2, MapPin, RefreshCw } from 'lucide-react'
import { getCurrency, type CurrencyCode } from '@/lib/fx-rates'
import { COUNTRIES, getCurrencyForCountry, type Country } from '@/lib/country-currency-map'
import { useCurrencyStore } from '@/stores/currency-store'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { CurrencySwitcher } from '@/components/currency/CurrencySwitcher'
import { DemoHeader } from '@/components/currency/DemoHeader'

export default function OnboardingCountryPage() {
  const router = useRouter()
  const { setPreferredCurrency, setDetectedCurrency } = useCurrencyStore()
  const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(null)
  const [detectedCode, setDetectedCode] = React.useState<CurrencyCode | null>(null)
  const [overrideCurrency, setOverrideCurrency] = React.useState<CurrencyCode | null>(null)
  const [showOverride, setShowOverride] = React.useState(false)

  const effectiveCurrency = overrideCurrency ?? detectedCode

  const handleSelect = (c: Country) => {
    setSelectedCountry(c)
    const code = getCurrencyForCountry(c.code)
    setDetectedCode(code)
    setOverrideCurrency(null)
    setShowOverride(false)
  }

  const handleContinue = () => {
    if (!effectiveCurrency) return
    setPreferredCurrency(effectiveCurrency)
    setDetectedCurrency(effectiveCurrency)
    toast.success('Country set!', {
      description: `Display currency: ${getCurrency(effectiveCurrency).name}`,
    })
    router.push('/dashboard')
  }

  return (
    <div className="min-h-dvh bg-muted/30">
      <DemoHeader title="Welcome" />
      <main className="mx-auto max-w-lg px-4 pb-24 pt-6 sm:pt-10">
        {/* Header */}
        <div className="mb-5 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <Globe2 className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Where are you from?
          </h1>
          <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">
            We&apos;ll show prices in your local currency for a smoother
            experience.
          </p>
        </div>

        {/* Country selector */}
        <Card className="overflow-hidden rounded-2xl p-0">
          <Command className="rounded-2xl">
            <div className="border-b px-1">
              <CommandInput placeholder="Search your country..." />
            </div>
            <CommandList className="max-h-56">
              <CommandEmpty>
                <span className="text-muted-foreground">
                  Country not found — you can choose a currency manually below.
                </span>
              </CommandEmpty>
              <CommandGroup>
                {COUNTRIES.map((c) => (
                  <CommandItem
                    key={c.code}
                    value={`${c.code} ${c.name}`}
                    onSelect={() => handleSelect(c)}
                    className="gap-2.5"
                  >
                    <span
                      className="text-lg leading-none"
                      aria-hidden="true"
                    >
                      {c.flag}
                    </span>
                    <span className="flex-1 text-sm font-medium">
                      {c.name}
                    </span>
                    {selectedCountry?.code === c.code && (
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </Card>

        {/* Detected currency card */}
        {selectedCountry && detectedCode && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Card className="mt-4 overflow-hidden rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-2xl">
                    {getCurrency(effectiveCurrency ?? 'USD').flag}
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Detected currency
                    </p>
                    <p className="mt-0.5 text-lg font-bold leading-tight">
                      {getCurrency(effectiveCurrency ?? 'USD').name}
                      <span className="ml-1.5 text-sm font-normal text-muted-foreground">
                        ({effectiveCurrency})
                      </span>
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowOverride(!showOverride)}
                  className="gap-1.5 text-xs"
                  aria-label="Change currency"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Change
                </Button>
              </div>

              {showOverride && (
                <div className="mt-3 animate-in fade-in slide-in-from-top-1 duration-200">
                  <CurrencySwitcher
                    value={overrideCurrency ?? detectedCode}
                    onChange={(v) => {
                      setOverrideCurrency(v)
                      setShowOverride(false)
                    }}
                  />
                </div>
              )}
            </Card>

            <Button
              onClick={handleContinue}
              className="mt-5 h-12 w-full gap-2 text-base"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Continue
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Hints */}
        {!selectedCountry && (
          <div className="mt-6 text-center">
            <div className="mx-auto max-w-xs text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">
                  45+ countries
                </span>{' '}
                supported. Pick yours to get started.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
