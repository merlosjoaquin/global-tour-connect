'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Loader2, Compass, Home } from 'lucide-react'
import { LANGUAGES } from '@/lib/constants'

type Role = 'explorer' | 'host' | null

const SWIPE_THRESHOLD = 50

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [role, setRole] = useState<Role>(null)
  const [ready, setReady] = useState(false)

  // Redirect to country selection if user hasn't picked a country/currency yet
  useEffect(() => {
    const prefs = localStorage.getItem('gtc-currency-prefs')
    if (!prefs) {
      router.replace('/onboarding/country')
    } else {
      setReady(true)
    }
  }, [router])

  const [fullName, setFullName] = useState('')
  const [bio, setBio] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [selectedLangs, setSelectedLangs] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchEndX.current = e.touches[0].clientX
  }

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const onTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) < SWIPE_THRESHOLD) return
    if (diff > 0 && step === 1 && role) setStep(2)  // swipe left → next (only if role selected)
    if (diff < 0 && step === 2) setStep(1)           // swipe right → back
  }

  function toggleLang(lang: string) {
    setSelectedLangs(prev =>
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    )
  }

  function handleComplete() {
    setLoading(true)
    try {
      localStorage.setItem('gtc_user_role', role as string)
      localStorage.setItem(
        'gtc_user_profile',
        JSON.stringify({ fullName, bio, city, country, languages: selectedLangs })
      )
      toast.success('Perfil completado!')
      if (role === 'host') {
        router.push('/publicar')
      } else {
        router.push('/dashboard')
      }
    } catch {
      toast.error('Error al guardar perfil')
    } finally {
      setLoading(false)
    }
  }

  if (!ready) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Cargando...</div>
      </div>
    )
  }

  return (
    <div
      style={{ touchAction: 'pan-y' }}
      className="min-h-dvh flex flex-col items-center justify-center px-4 py-8"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="w-full max-w-md">
        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2].map(s => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                s <= step ? 'bg-teal-700' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Step 1 — Choose role */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center space-y-1">
              <h1 className="text-xl font-bold">Como quieres comenzar?</h1>
              <p className="text-sm text-muted-foreground">Siempre podras cambiar despues</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Explorer card */}
              <button
                type="button"
                onClick={() => setRole('explorer')}
                className={`flex flex-col items-center text-center gap-3 p-6 rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
                  role === 'explorer'
                    ? 'border-teal-700 bg-teal-700/5 shadow-md'
                    : 'border-border bg-card hover:border-teal-700/40'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors ${
                    role === 'explorer' ? 'bg-teal-700 text-white' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <Compass className="h-7 w-7" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Quiero explorar</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-snug">
                    Busca anfitriones y reserva experiencias
                  </p>
                </div>
              </button>

              {/* Host card */}
              <button
                type="button"
                onClick={() => setRole('host')}
                className={`flex flex-col items-center text-center gap-3 p-6 rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
                  role === 'host'
                    ? 'border-teal-700 bg-teal-700/5 shadow-md'
                    : 'border-border bg-card hover:border-teal-700/40'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors ${
                    role === 'host' ? 'bg-teal-700 text-white' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <Home className="h-7 w-7" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Quiero ser anfitrion</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-snug">
                    Ofrece servicios y gana dinero
                  </p>
                </div>
              </button>
            </div>

            <Button
              onClick={() => setStep(2)}
              className="w-full bg-teal-700 hover:bg-teal-600 rounded-full"
              disabled={!role}
            >
              Siguiente
            </Button>
          </div>
        )}

        {/* Step 2 — Profile data */}
        {step === 2 && (
          <Card className="rounded-2xl animate-in fade-in slide-in-from-right-4 duration-300">
            <CardHeader>
              <CardTitle>Completa tu perfil</CardTitle>
              <CardDescription>
                Estos datos ayudan a otros usuarios a conocerte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Tu nombre"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="bio">Bio corta</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  placeholder="Cuentanos algo sobre ti..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="city">Ciudad</Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="Ej: CDMX"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="country">Pais</Label>
                  <Input
                    id="country"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    placeholder="Ej: Mexico"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Idiomas que hablas</Label>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map(lang => (
                    <Badge
                      key={lang}
                      variant={selectedLangs.includes(lang) ? 'default' : 'outline'}
                      className={`cursor-pointer text-sm py-1.5 px-3 ${
                        selectedLangs.includes(lang)
                          ? 'bg-teal-700 hover:bg-teal-600'
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => toggleLang(lang)}
                    >
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 rounded-full"
                >
                  Atras
                </Button>
                <Button
                  onClick={handleComplete}
                  className="flex-1 bg-teal-700 hover:bg-teal-600 rounded-full"
                  disabled={loading || !fullName || !city || selectedLangs.length === 0}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Completar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
