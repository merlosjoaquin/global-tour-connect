'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  MapPin, Star, Award, Settings,
  LogOut, ChevronRight, Globe, Shield, PlusCircle
} from 'lucide-react'
import { useTranslation } from '@/stores/language-store'
import { PriceDisplay } from '@/components/currency/PriceDisplay'
import type { Profile } from '@/types/database'

export default function PerfilPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const supabase = createClient()
  const { t } = useTranslation()

  const BADGE_INFO: Record<string, { label: string; color: string }> = {
    verified: { label: t('profile.verified'), color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' },
    super_host: { label: t('profile.superHost'), color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300' },
    top_rated: { label: t('profile.topRated'), color: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' },
    explorer_10: { label: t('profile.explorer10'), color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300' },
  }

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
        if (data) setProfile(data as unknown as Profile)
      } else {
        setProfile({
          id: 'demo-user',
          full_name: 'Usuario Demo',
          avatar_url: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Demo',
          bio: 'Explorador y anfitrion demo. Viajando por el mundo, conectando con locales.',
          languages: ['Espanol', 'Ingles', 'Portugues'],
          city: 'Ciudad de Mexico',
          country: 'Mexico',
          is_host: true,
          is_explorer: true,
          rating_avg: 4.5,
          total_reviews: 12,
          badges: ['verified', 'explorer_10'],
          created_at: '2024-01-01T00:00:00Z',
        })
      }
    }
    loadProfile()
  }, [supabase])

  const hostEarnings = 128.50

  async function handleLogout() {
    document.cookie = 'gtc_demo=; path=/; max-age=0'
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-muted-foreground">{t('common.loadingProfile')}</div>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
      {/* Profile header */}
      <div className="flex flex-col items-center text-center">
        <Avatar className="h-24 w-24 mb-3">
          <AvatarImage src={profile.avatar_url || ''} alt={profile.full_name} />
          <AvatarFallback className="text-2xl">{profile.full_name[0]}</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold">{profile.full_name}</h2>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
          <MapPin className="h-3.5 w-3.5" />
          <span>{profile.city}, {profile.country}</span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{profile.rating_avg}</span>
          <span className="text-sm text-muted-foreground">({profile.total_reviews} {t('profile.reviews')})</span>
        </div>
      </div>

      {/* Badges */}
      {profile.badges.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2">
          {profile.badges.map(badge => {
            const info = BADGE_INFO[badge]
            return info ? (
              <Badge key={badge} className={`${info.color} border-0 rounded-full`}>
                <Award className="h-3 w-3 mr-1" />
                {info.label}
              </Badge>
            ) : null
          })}
        </div>
      )}

      {/* Languages */}
      <Card className="rounded-2xl">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="h-4 w-4 text-teal-700 dark:text-teal-400" />
            <span className="font-medium text-sm">{t('profile.languages')}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {profile.languages.map(lang => (
              <Badge key={lang} variant="outline" className="text-sm rounded-full">{lang}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Wallet (if host) */}
      {profile.is_host && (
        <Card className="rounded-2xl bg-gradient-to-r from-teal-700 to-emerald-700 text-white">
          <CardContent className="p-4">
            <p className="text-sm text-white/80 mb-1">{t('profile.hostEarnings')}</p>
            <PriceDisplay amountUSD={hostEarnings} size="lg" className="text-white" />
            <p className="text-sm text-white/60 mt-1">{t('profile.availableForWithdraw')}</p>
            <Link href="/wallet">
              <Button size="sm" className="mt-3 bg-white/20 hover:bg-white/30 text-white rounded-full">
                {t('profile.withdrawFunds')}
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Publish new service */}
      <Link href="/publicar" className="block">
        <Card className="rounded-2xl border-dashed border-2 border-teal-200 dark:border-teal-800 hover:border-teal-400 dark:hover:border-teal-600 transition-colors">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center shrink-0">
              <PlusCircle className="h-5 w-5 text-teal-700 dark:text-teal-400" />
            </div>
            <div>
              <p className="font-medium text-sm">{t('profile.publishNewService')}</p>
              <p className="text-sm text-muted-foreground">{t('profile.publishNewServiceDesc')}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
          </CardContent>
        </Card>
      </Link>

      <Separator />

      {/* Menu items */}
      <div className="space-y-1">
        <Link href="/settings" className="flex items-center justify-between px-3 py-3 rounded-2xl hover:bg-muted transition-colors">
          <div className="flex items-center gap-3">
            <Settings className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm">{t('profile.settingsLink')}</span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </Link>
        <Link href="/dashboard" className="flex items-center justify-between px-3 py-3 rounded-2xl hover:bg-muted transition-colors">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm">{t('profile.identityVerification')}</span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-muted transition-colors text-left text-red-600 dark:text-red-400"
        >
          <LogOut className="h-5 w-5" />
          <span className="text-sm">{t('profile.logout')}</span>
        </button>
      </div>
    </div>
  )
}
