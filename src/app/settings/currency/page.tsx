'use client'

import * as React from 'react'
import { toast } from 'sonner'
import { Check, Info, Save } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getCurrency } from '@/lib/fx-rates'
import { useCurrencyStore } from '@/stores/currency-store'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { CurrencySwitcher } from '@/components/currency/CurrencySwitcher'
import { DemoHeader } from '@/components/currency/DemoHeader'

export default function CurrencySettingsPage() {
  const {
    preferredCurrency,
    detectedCurrency,
    autoDetect,
    setPreferredCurrency,
    setAutoDetect,
  } = useCurrencyStore()

  // Local draft state for the Save button
  const [draft, setDraft] = React.useState(preferredCurrency)
  const [draftAuto, setDraftAuto] = React.useState(autoDetect)
  const [saving, setSaving] = React.useState(false)

  const currency = getCurrency(draft)
  const dirty = draft !== preferredCurrency || draftAuto !== autoDetect

  const handleSave = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 600))
    setPreferredCurrency(draft)
    setAutoDetect(draftAuto)
    setSaving(false)
    toast.success('Preferencias guardadas', {
      description: `Divisa de visualizacion: ${currency.name} (${draft}).`,
    })
  }

  return (
    <div className="min-h-dvh bg-muted/30">
      <DemoHeader title="Divisa" backHref="/settings" />
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-6 sm:pt-10">
        <div className="mb-5">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Preferencias de divisa
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Controla como se muestran los precios y ganancias en la app.
          </p>
        </div>

        {/* Current currency */}
        <Card className="overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-5 ring-1 ring-primary/20">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Divisa de visualizacion actual
          </p>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-5xl leading-none" aria-hidden="true">
              {currency.flag}
            </span>
            <div>
              <div className="text-2xl font-bold tracking-tight">
                {draft}
                <span className="ml-2 text-base font-normal text-muted-foreground">
                  {currency.symbol}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {currency.name}
              </div>
            </div>
          </div>
        </Card>

        {/* Currency switcher */}
        <Card className="mt-4 rounded-2xl p-5">
          <h2 className="font-heading text-sm font-semibold">
            Cambiar divisa de visualizacion
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Busca y elige entre 12 divisas disponibles.
          </p>
          <div className="mt-3">
            <CurrencySwitcher value={draft} onChange={setDraft} />
          </div>
        </Card>

        {/* Auto-detect */}
        <Card className="mt-4 rounded-2xl p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h2 className="font-heading text-sm font-semibold">
                Detectar automaticamente por ubicacion
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Cuando esta activo, mostraremos los precios en tu divisa local
                detectada cuando viajes.
              </p>
              {detectedCurrency && (
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs">
                  <Check className="h-3 w-3 text-primary" aria-hidden="true" />
                  Detectada: {detectedCurrency}
                </div>
              )}
            </div>
            <Switch
              checked={draftAuto}
              onCheckedChange={setDraftAuto}
              aria-label="Detectar divisa automaticamente por ubicacion"
            />
          </div>
        </Card>

        {/* Info note */}
        <div className="mt-4 flex items-start gap-2.5 rounded-xl border bg-background p-4 text-xs leading-relaxed text-muted-foreground">
          <Info
            className="mt-0.5 h-4 w-4 shrink-0 text-primary"
            aria-hidden="true"
          />
          <p>
            Tu saldo se almacena en{' '}
            <span className="font-semibold text-foreground">USD</span>. La divisa
            de visualizacion solo afecta como se muestran los montos — la conversion
            real ocurre al momento del retiro, a la tasa de mercado vigente.
          </p>
        </div>

        {/* Save */}
        <div
          className={cn(
            'sticky bottom-4 mt-6 flex justify-end transition-opacity',
            dirty ? 'opacity-100' : 'pointer-events-none opacity-0'
          )}
        >
          <div className="flex items-center gap-2 rounded-full border bg-background/95 p-1.5 pl-4 shadow-lg backdrop-blur">
            <span className="text-xs text-muted-foreground">
              Tienes cambios sin guardar
            </span>
            <Button onClick={handleSave} disabled={saving} className="gap-1.5">
              {saving ? (
                <>
                  <Save className="h-4 w-4 animate-pulse" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Guardar preferencias
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
