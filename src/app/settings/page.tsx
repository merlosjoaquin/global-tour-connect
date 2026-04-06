'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Card, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import {
  ArrowLeft,
  ChevronRight,
  Coins,
  Globe,
  Moon,
  Sun,
  Check,
} from 'lucide-react'
import { useCurrencyStore } from '@/stores/currency-store'
import { getCurrency } from '@/lib/fx-rates'

const LANGUAGES = [
  { code: 'es', label: 'Espanol', flag: '\uD83C\uDDEA\uD83C\uDDF8' },
  { code: 'en', label: 'English', flag: '\uD83C\uDDFA\uD83C\uDDF8' },
  { code: 'fr', label: 'Francais', flag: '\uD83C\uDDEB\uD83C\uDDF7' },
  { code: 'pt', label: 'Portugues', flag: '\uD83C\uDDE7\uD83C\uDDF7' },
  { code: 'ja', label: '\u65E5\u672C\u8A9E', flag: '\uD83C\uDDEF\uD83C\uDDF5' },
  { code: 'zh', label: '\u4E2D\u6587', flag: '\uD83C\uDDE8\uD83C\uDDF3' },
]

export default function SettingsPage() {
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()
  const { preferredCurrency } = useCurrencyStore()
  const currency = getCurrency(preferredCurrency)
  const [mounted, setMounted] = useState(false)
  const [selectedLang, setSelectedLang] = useState('es')

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('gtc_app_language')
    if (saved) setSelectedLang(saved)
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'

  const handleLangChange = (code: string) => {
    setSelectedLang(code)
    localStorage.setItem('gtc_app_language', code)
    const lang = LANGUAGES.find((l) => l.code === code)
    toast.success(`Idioma cambiado a ${lang?.label}`, {
      description: 'Los cambios se aplicaran en la proxima carga.',
    })
  }

  return (
    <div className="min-h-dvh bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2 max-w-lg mx-auto">
        <button
          onClick={() => router.back()}
          className="p-1.5 rounded-full hover:bg-muted transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft className="h-5 w-5 text-muted-foreground" />
        </button>
        <h1 className="text-lg font-bold">Configuracion</h1>
      </div>

      <div className="max-w-lg mx-auto px-4 pb-8 space-y-4">
        {/* Currency section */}
        <Link href="/settings/currency">
          <Card className="rounded-2xl hover:bg-muted/50 transition-colors cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center shrink-0">
                <Coins className="h-5 w-5 text-teal-700 dark:text-teal-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">Divisa preferida</p>
                <p className="text-xs text-muted-foreground">
                  {currency.flag} {currency.name} ({preferredCurrency})
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
            </CardContent>
          </Card>
        </Link>

        {/* Dark mode section */}
        <Card className="rounded-2xl">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-950/40 flex items-center justify-center shrink-0">
              {mounted && isDark ? (
                <Moon className="h-5 w-5 text-purple-700 dark:text-purple-400" />
              ) : (
                <Sun className="h-5 w-5 text-purple-700 dark:text-purple-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">Modo nocturno</p>
              <p className="text-xs text-muted-foreground">
                {mounted ? (isDark ? 'Activado' : 'Desactivado') : '...'}
              </p>
            </div>
            {mounted && (
              <Switch
                checked={isDark}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                aria-label="Cambiar modo nocturno"
              />
            )}
          </CardContent>
        </Card>

        {/* Language section */}
        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center shrink-0">
                <Globe className="h-5 w-5 text-blue-700 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-sm">Idioma de la app</p>
                <p className="text-xs text-muted-foreground">
                  {LANGUAGES.find((l) => l.code === selectedLang)?.label}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLangChange(lang.code)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all text-left ${
                    selectedLang === lang.code
                      ? 'border-teal-700 bg-teal-50 dark:bg-teal-950/30 dark:border-teal-600'
                      : 'border-border hover:border-muted-foreground/30'
                  }`}
                >
                  <span className="text-lg leading-none" aria-hidden="true">
                    {lang.flag}
                  </span>
                  <span className="text-sm font-medium flex-1">{lang.label}</span>
                  {selectedLang === lang.code && (
                    <Check className="h-3.5 w-3.5 text-teal-700 dark:text-teal-400" />
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
