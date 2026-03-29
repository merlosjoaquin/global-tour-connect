'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Loader2, MapPin } from 'lucide-react'
import { LANGUAGES } from '@/lib/constants'

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [fullName, setFullName] = useState('')
  const [bio, setBio] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [selectedLangs, setSelectedLangs] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  function toggleLang(lang: string) {
    setSelectedLangs(prev =>
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    )
  }

  async function handleComplete() {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast.info('Modo demo - perfil guardado localmente')
        router.push('/dashboard')
        return
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          bio,
          city,
          country,
          languages: selectedLangs,
          is_explorer: true,
        })
        .eq('id', user.id)

      if (error) throw error
      toast.success('Perfil completado!')
      router.push('/dashboard')
    } catch (err: unknown) {
      const error = err as { message?: string }
      toast.error(error.message || 'Error al guardar perfil')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100dvh-4rem)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                s <= step ? 'bg-teal-700' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Sobre ti</CardTitle>
              <CardDescription>Cuentanos un poco sobre ti</CardDescription>
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
              <Button
                onClick={() => setStep(2)}
                className="w-full bg-teal-700 hover:bg-teal-600 rounded-full"
                disabled={!fullName}
              >
                Siguiente
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>
                <MapPin className="inline h-5 w-5 mr-1" />
                Tu ubicacion
              </CardTitle>
              <CardDescription>Donde te encuentras</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="city">Ciudad</Label>
                <Input
                  id="city"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder="Ej: Ciudad de Mexico"
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
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1 rounded-full">
                  Atras
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-teal-700 hover:bg-teal-600 rounded-full"
                  disabled={!city}
                >
                  Siguiente
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Idiomas que hablas</CardTitle>
              <CardDescription>Selecciona todos los que apliquen</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1 rounded-full">
                  Atras
                </Button>
                <Button
                  onClick={handleComplete}
                  className="flex-1 bg-teal-700 hover:bg-teal-600 rounded-full"
                  disabled={loading || selectedLangs.length === 0}
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
