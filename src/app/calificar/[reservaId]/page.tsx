'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { StarRating } from '@/components/star-rating'
import { toast } from 'sonner'
import { Loader2, CheckCircle, ThumbsUp } from 'lucide-react'
import { MOCK_BOOKINGS, MOCK_SERVICES, MOCK_PROFILES } from '@/lib/mock-data'
import { SERVICE_TYPES } from '@/lib/constants'

export default function CalificarPage({ params }: { params: Promise<{ reservaId: string }> }) {
  const { reservaId } = use(params)
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const booking = MOCK_BOOKINGS.find(b => b.id === reservaId)
  const service = booking ? MOCK_SERVICES.find(s => s.id === booking.service_id) : null
  const host = booking ? MOCK_PROFILES.find(p => p.id === booking.host_id) : null

  if (!booking || !service || !host) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-muted-foreground">Reserva no encontrada</p>
      </div>
    )
  }

  async function handleSubmit() {
    if (rating === 0) {
      toast.error('Selecciona una calificacion')
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setSubmitted(true)
    toast.success('Gracias por tu calificacion!')
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-12">
        <Card>
          <CardContent className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold">Gracias por tu resena!</h2>
            <p className="text-sm text-muted-foreground">
              Tu opinion ayuda a otros exploradores y motiva a los anfitriones.
            </p>
            <div className="flex items-center justify-center gap-1 my-4">
              <StarRating rating={rating} size="lg" />
            </div>
            <Button onClick={() => router.push('/dashboard')} className="bg-teal-700 hover:bg-teal-600">
              Volver al dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const typeInfo = SERVICE_TYPES[service.type]

  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
      {/* Service summary */}
      <Card>
        <CardContent className="p-4 flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={host.avatar_url || ''} />
            <AvatarFallback>{host.full_name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold text-sm">{service.title}</p>
            <p className="text-xs text-muted-foreground">con {host.full_name}</p>
            <p className="text-xs text-muted-foreground">{typeInfo.emoji} {typeInfo.label}</p>
          </div>
        </CardContent>
      </Card>

      {/* Rating form */}
      <Card>
        <CardHeader>
          <CardTitle>Como fue tu experiencia?</CardTitle>
          <CardDescription>Tu opinion es importante para la comunidad</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Star rating */}
          <div className="text-center space-y-2">
            <Label>Calificacion general</Label>
            <div className="flex justify-center">
              <StarRating rating={rating} size="lg" interactive onRatingChange={setRating} />
            </div>
            <p className="text-sm text-muted-foreground">
              {rating === 0 && 'Toca una estrella para calificar'}
              {rating === 1 && 'Muy mala experiencia'}
              {rating === 2 && 'Podria mejorar'}
              {rating === 3 && 'Aceptable'}
              {rating === 4 && 'Buena experiencia!'}
              {rating === 5 && 'Excelente!'}
            </p>
          </div>

          {/* Quick tags */}
          {rating > 0 && (
            <div className="space-y-2">
              <Label>Que te gusto? (opcional)</Label>
              <div className="flex flex-wrap gap-2">
                {['Puntualidad', 'Conocimiento', 'Simpatia', 'Precio justo', 'Unica experiencia'].map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setComment(prev => prev ? `${prev}, ${tag.toLowerCase()}` : tag)}
                    className="px-3 py-1.5 text-xs rounded-full border hover:bg-teal-50 hover:border-teal-300 transition-colors"
                  >
                    <ThumbsUp className="h-3 w-3 inline mr-1" />
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Comment */}
          <div className="space-y-1">
            <Label htmlFor="comment">Comentario (opcional)</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Cuenta tu experiencia con detalle..."
              rows={4}
            />
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-teal-700 hover:bg-teal-600 rounded-full"
            disabled={loading || rating === 0}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Enviar calificacion
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
