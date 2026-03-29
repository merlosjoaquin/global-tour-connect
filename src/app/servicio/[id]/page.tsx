'use client'

import { use, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  MapPin, Clock, Star, Share2, Heart, ChevronLeft, ChevronRight,
  Shield
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { StarRating } from '@/components/star-rating'
import { getServiceWithHost, MOCK_REVIEWS } from '@/lib/mock-data'
import { SERVICE_TYPES } from '@/lib/constants'

export default function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [currentPhoto, setCurrentPhoto] = useState(0)
  const [liked, setLiked] = useState(false)

  const service = getServiceWithHost(id)

  if (!service) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-lg font-medium">Servicio no encontrado</p>
          <Button render={<Link href="/explorar" />} variant="link" className="text-teal-700 mt-2">
            Volver a explorar
          </Button>
        </div>
      </div>
    )
  }

  const host = service.host!
  const typeInfo = SERVICE_TYPES[service.type]
  const reviews = MOCK_REVIEWS.filter(r => r.reviewee_id === service.host_id)

  return (
    <div className="max-w-lg mx-auto pb-24">
      {/* Photo carousel */}
      <div className="relative h-72 bg-muted">
        {service.photos.length > 0 ? (
          <>
            <Image
              src={service.photos[currentPhoto]}
              alt={service.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            {service.photos.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentPhoto(p => Math.max(0, p - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setCurrentPhoto(p => Math.min(service.photos.length - 1, p + 1))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {service.photos.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i === currentPhoto ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-6xl">
            {typeInfo.emoji}
          </div>
        )}

        {/* Top actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setLiked(!liked)}
            className="w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow"
          >
            <Heart className={`h-5 w-5 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </button>
          <button className="w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow">
            <Share2 className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 space-y-4">
        {/* Header */}
        <div>
          <Badge className="mb-2 bg-teal-50 text-teal-800 border-teal-200">
            {typeInfo.emoji} {typeInfo.label}
          </Badge>
          <h1 className="text-2xl font-bold">{service.title}</h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-foreground">{service.rating_avg}</span>
              <span>({service.total_bookings} reservas)</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{service.address}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Price & duration */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-3xl font-bold text-teal-700">${service.price}</span>
            <span className="text-sm text-muted-foreground ml-1">USD</span>
            {service.type === 'language_assistant' && (
              <span className="text-sm text-muted-foreground"> /min</span>
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{service.duration_minutes} min</span>
          </div>
        </div>

        <Separator />

        {/* Description */}
        <div>
          <h2 className="font-semibold mb-2">Descripcion</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {service.description}
          </p>
        </div>

        <Separator />

        {/* Host profile */}
        <div>
          <h2 className="font-semibold mb-3">Tu anfitrion</h2>
          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={host.avatar_url || ''} alt={host.full_name} />
                  <AvatarFallback className="text-lg">{host.full_name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{host.full_name}</p>
                    {host.badges.includes('verified') && (
                      <Shield className="h-4 w-4 text-teal-700" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span>{host.rating_avg}</span>
                    <span>({host.total_reviews} resenas)</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {host.city}, {host.country}
                  </p>
                </div>
              </div>
              {host.bio && (
                <p className="text-sm text-muted-foreground mt-3">{host.bio}</p>
              )}
              <div className="flex flex-wrap gap-1 mt-3">
                {host.languages.map(lang => (
                  <Badge key={lang} variant="outline" className="text-xs">
                    {lang}
                  </Badge>
                ))}
              </div>
              {host.badges.includes('super_host') && (
                <Badge className="mt-2 bg-yellow-100 text-yellow-800 border-yellow-300">
                  Super Anfitrion
                </Badge>
              )}
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Reviews */}
        <div>
          <h2 className="font-semibold mb-3">Resenas</h2>
          {reviews.length > 0 ? (
            <div className="space-y-3">
              {reviews.map(review => (
                <Card key={review.id} className="rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={review.reviewer?.avatar_url || ''} />
                        <AvatarFallback>{review.reviewer?.full_name?.[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{review.reviewer?.full_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(review.created_at).toLocaleDateString('es')}
                        </p>
                      </div>
                      <StarRating rating={review.rating} size="sm" />
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Aun no hay resenas para este servicio.</p>
          )}
        </div>
      </div>

      {/* Fixed bottom CTA — simplified */}
      <div className="fixed bottom-16 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <div className="flex-1">
            <span className="text-2xl font-bold text-teal-700">${service.price}</span>
            <span className="text-sm text-muted-foreground ml-1">USD</span>
          </div>
          <Button
            onClick={() => router.push(`/reserva/${service.id}`)}
            className="bg-teal-700 hover:bg-teal-600 px-8 rounded-full"
            size="lg"
          >
            Reservar
          </Button>
        </div>
      </div>
    </div>
  )
}
