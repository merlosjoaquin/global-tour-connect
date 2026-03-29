'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { SERVICE_TYPES } from '@/lib/constants'
import type { Service } from '@/types/database'

interface ServiceCardProps {
  service: Service
  compact?: boolean
}

export function ServiceCard({ service, compact = false }: ServiceCardProps) {
  const typeInfo = SERVICE_TYPES[service.type]

  return (
    <Link href={`/servicio/${service.id}`} className="block">
      <div className="rounded-2xl overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow active:scale-[0.98]">
        {/* Photo */}
        <div className={`relative ${compact ? 'h-32' : 'h-44'} bg-muted`}>
          {service.photos[0] ? (
            <Image
              src={service.photos[0]}
              alt={service.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-4xl">
              {typeInfo.emoji}
            </div>
          )}
          {/* Price pill */}
          <div className="absolute top-2 right-2 bg-white/95 rounded-full px-2.5 py-1 text-xs font-bold shadow-sm">
            ${service.price}
          </div>
        </div>

        {/* Info */}
        <div className="p-2.5">
          <h3 className="font-semibold text-sm line-clamp-1">{service.title}</h3>
          <div className="flex items-center gap-1 mt-1">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{service.rating_avg}</span>
            <span className="text-xs text-muted-foreground">({service.total_bookings})</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
