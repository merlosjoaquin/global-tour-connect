'use client'

import { use } from 'react'
import Link from 'next/link'
import { MapPin, Shield, Star, Award, Clock, Calendar, Globe } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { StarRating } from '@/components/star-rating'
import { PriceDisplay } from '@/components/currency/PriceDisplay'
import { getHostProfile, getServicesForHost, getReviewsForHost } from '@/lib/mock-data'
import { SERVICE_TYPES } from '@/lib/constants'
import { useTranslation } from '@/stores/language-store'
import type { ServiceType } from '@/types/database'

export default function HostProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { t } = useTranslation()

  const host = getHostProfile(id)

  if (!host) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-lg font-medium">{t('service.notFound')}</p>
          <Link href="/dashboard">
            <Button variant="link" className="text-teal-700 dark:text-teal-400 mt-2">
              {t('service.backToHome')}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const services = getServicesForHost(id)
  const reviews = getReviewsForHost(id)

  const memberSinceDate = new Date(host.created_at).toLocaleDateString('es', {
    year: 'numeric',
    month: 'long',
  })

  return (
    <div className="max-w-lg mx-auto pb-24">
      <div className="px-4 py-6 space-y-5">
        {/* Hero section */}
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-3">
            <AvatarImage src={host.avatar_url || ''} alt={host.full_name} />
            <AvatarFallback className="text-2xl">{host.full_name[0]}</AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-bold text-foreground">{host.full_name}</h1>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
            {host.badges.includes('verified') && (
              <Badge className="bg-teal-50 text-teal-800 dark:bg-teal-950/40 dark:text-teal-300 border-teal-200 dark:border-teal-800">
                <Shield className="h-3 w-3 mr-1" />
                {t('hostProfile.verified')}
              </Badge>
            )}
            {host.badges.includes('super_host') && (
              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 border-yellow-300 dark:border-yellow-800">
                <Award className="h-3 w-3 mr-1" />
                {t('hostProfile.superHost')}
              </Badge>
            )}
            {host.badges.includes('top_rated') && (
              <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border-purple-300 dark:border-purple-800">
                <Star className="h-3 w-3 mr-1" />
                {t('hostProfile.topRated')}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-foreground">{host.rating_avg}</span>
            <span>({host.total_reviews} {t('profile.reviews')})</span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{host.city}, {host.country}</span>
          </div>
        </div>

        {/* Bio card */}
        {host.bio && (
          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <h2 className="font-semibold mb-2 text-foreground">{t('hostProfile.bio')}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(`hostBios.${host.id}`) || host.bio}</p>
            </CardContent>
          </Card>
        )}

        {/* Details card */}
        <Card className="rounded-2xl">
          <CardContent className="p-4 space-y-3">
            <h2 className="font-semibold text-foreground">{t('hostProfile.details')}</h2>

            <div className="flex items-start gap-3">
              <Globe className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">{t('hostProfile.languages')}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {host.languages.map(lang => (
                    <Badge key={lang} variant="outline" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">{t('hostProfile.location')}</p>
                <p className="text-sm text-muted-foreground">{host.city}, {host.country}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">{t('hostProfile.memberSince')}</p>
                <p className="text-sm text-muted-foreground">{memberSinceDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services section */}
        <div>
          <h2 className="font-semibold mb-3 text-foreground">
            {t('hostProfile.services')} ({services.length})
          </h2>
          {services.length > 0 ? (
            <div className="space-y-3">
              {services.map(svc => {
                const typeInfo = SERVICE_TYPES[svc.type as ServiceType]
                return (
                  <Link key={svc.id} href={`/servicio/${svc.id}`}>
                    <Card className="rounded-2xl hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{typeInfo?.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <Badge className="mb-1 text-xs bg-teal-50 text-teal-800 dark:bg-teal-950/40 dark:text-teal-300 border-teal-200 dark:border-teal-800">
                              {typeInfo?.label}
                            </Badge>
                            <p className="font-medium text-foreground truncate">{t(`mapData.services.${svc.id}`) || svc.title}</p>
                            <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                              <PriceDisplay amountUSD={svc.price} size="sm" className="font-semibold text-teal-700 dark:text-teal-400" />
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {svc.duration_minutes} min
                              </span>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              <StarRating rating={svc.rating_avg} size="sm" />
                              <span className="text-xs text-muted-foreground ml-1">
                                ({svc.total_bookings} {t('hostProfile.bookings')})
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{t('hostProfile.noServices')}</p>
          )}
        </div>

        {/* Reviews section */}
        <div>
          <h2 className="font-semibold mb-3 text-foreground">
            {t('hostProfile.reviews')} ({reviews.length})
          </h2>
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
                        <p className="text-sm font-medium text-foreground">{review.reviewer?.full_name}</p>
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
            <p className="text-sm text-muted-foreground">{t('hostProfile.noReviews')}</p>
          )}
        </div>
      </div>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-16 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t dark:border-gray-800">
        <div className="max-w-lg mx-auto">
          <Link href="/solicitar">
            <Button
              className="w-full bg-teal-700 hover:bg-teal-600 rounded-full"
              size="lg"
            >
              {t('hostProfile.requestHost')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
