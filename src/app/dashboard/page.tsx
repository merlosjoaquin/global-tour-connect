'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  MapPin, Star, Calendar, Plus, ArrowRight, Clock
} from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { MOCK_SERVICES, MOCK_BOOKINGS, MOCK_PROFILES } from '@/lib/mock-data'
import { SERVICE_TYPES } from '@/lib/constants'
import type { Profile } from '@/types/database'

export default function DashboardPage() {
  const { activeRole, setActiveRole } = useAppStore()
  const [profile, setProfile] = useState<Profile | null>(null)
  const supabase = createClient()

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        if (data) setProfile(data as unknown as Profile)
      } else {
        setProfile({
          id: 'demo-user',
          full_name: 'Usuario Demo',
          avatar_url: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Demo',
          bio: 'Explorador y anfitrion demo',
          languages: ['Espanol', 'Ingles'],
          city: 'Ciudad de Mexico',
          country: 'Mexico',
          is_host: true,
          is_explorer: true,
          rating_avg: 4.5,
          total_reviews: 12,
          badges: ['verified'],
          created_at: new Date().toISOString(),
        })
      }
    }
    loadProfile()
  }, [supabase])

  const isHost = activeRole === 'host'
  const myServices = MOCK_SERVICES.filter(s => s.host_id === 'host-1')
  const upcomingBookings = MOCK_BOOKINGS.filter(b => b.status === 'confirmed')

  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
      {/* Profile header */}
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={profile?.avatar_url || ''} alt={profile?.full_name || ''} />
          <AvatarFallback className="text-lg">{profile?.full_name?.[0] || 'U'}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="text-xl font-bold">{profile?.full_name || 'Cargando...'}</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>{profile?.city || ''}, {profile?.country || ''}</span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{profile?.rating_avg || 0}</span>
            <span className="text-xs text-muted-foreground">({profile?.total_reviews || 0} resenas)</span>
          </div>
        </div>
      </div>

      {/* Role switch */}
      <Card className="rounded-2xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base font-semibold">Modo {isHost ? 'Anfitrion' : 'Explorador'}</Label>
              <p className="text-xs text-muted-foreground">
                {isHost
                  ? 'Gestionando tus servicios y reservas'
                  : 'Buscando experiencias locales'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Explorador</span>
              <Switch
                checked={isHost}
                onCheckedChange={(checked) => setActiveRole(checked ? 'host' : 'explorer')}
              />
              <span className="text-xs text-muted-foreground">Anfitrion</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Host view: My Services */}
      {isHost && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Mis Servicios</h3>
            <Button render={<Link href="/publicar" />} size="sm" className="bg-teal-700 hover:bg-teal-600 rounded-full">
                <Plus className="h-4 w-4 mr-1" />
                Nuevo
            </Button>
          </div>
          {myServices.length === 0 ? (
            <Card className="rounded-2xl">
              <CardContent className="p-6 text-center text-muted-foreground">
                <p>Aun no tienes servicios publicados.</p>
                <Button render={<Link href="/publicar" />} variant="link" className="text-teal-700">
                  Publica tu primer servicio
                </Button>
              </CardContent>
            </Card>
          ) : (
            myServices.map(service => (
              <Card key={service.id} className="rounded-2xl hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{SERVICE_TYPES[service.type].emoji}</div>
                      <div>
                        <p className="font-medium text-sm">{service.title}</p>
                        <p className="text-xs text-muted-foreground">${service.price} USD</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={service.is_active ? 'default' : 'secondary'} className={`rounded-full ${service.is_active ? 'bg-green-100 text-green-800' : ''}`}>
                        {service.is_active ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Explorer view: Upcoming bookings */}
      {!isHost && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Proximas Reservas</h3>
            <Button render={<Link href="/explorar" />} variant="ghost" size="sm">
                Explorar
                <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          {upcomingBookings.length === 0 ? (
            <Card className="rounded-2xl">
              <CardContent className="p-6 text-center text-muted-foreground">
                <p>No tienes reservas proximas.</p>
                <Button render={<Link href="/explorar" />} variant="link" className="text-teal-700">
                  Descubre experiencias cerca de ti
                </Button>
              </CardContent>
            </Card>
          ) : (
            upcomingBookings.map(booking => {
              const service = MOCK_SERVICES.find(s => s.id === booking.service_id)
              const host = MOCK_PROFILES.find(p => p.id === booking.host_id)
              return (
                <Card key={booking.id} className="rounded-2xl hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={host?.avatar_url || ''} />
                        <AvatarFallback>{host?.full_name?.[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{service?.title}</p>
                        <p className="text-xs text-muted-foreground">con {host?.full_name}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(booking.scheduled_at).toLocaleDateString('es')}</span>
                        </div>
                        <Badge className="bg-teal-100 text-teal-800 text-[10px] mt-1 rounded-full">
                          Confirmada
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      )}

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button render={<Link href="/explorar" />} variant="outline" className="h-auto py-4 flex-col gap-1 rounded-2xl">
            <MapPin className="h-5 w-5 text-teal-700" />
            <span className="text-xs">Explorar mapa</span>
        </Button>
        <Button render={<Link href="/chat" />} variant="outline" className="h-auto py-4 flex-col gap-1 rounded-2xl">
            <Calendar className="h-5 w-5 text-teal-700" />
            <span className="text-xs">Mensajes</span>
        </Button>
      </div>
    </div>
  )
}
