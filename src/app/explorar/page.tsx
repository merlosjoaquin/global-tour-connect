'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ServiceCard } from '@/components/service-card'
import { MOCK_SERVICES } from '@/lib/mock-data'
import { SERVICE_TYPES } from '@/lib/constants'
import type { Service, ServiceType } from '@/types/database'

export default function ExplorarPage() {
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState<ServiceType | null>(null)
  const [services, setServices] = useState<Service[]>(MOCK_SERVICES)

  // Filter services
  useEffect(() => {
    let filtered = MOCK_SERVICES

    if (search) {
      const q = search.toLowerCase()
      filtered = filtered.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q)
      )
    }

    if (selectedType) {
      filtered = filtered.filter(s => s.type === selectedType)
    }

    setServices(filtered)
  }, [search, selectedType])

  return (
    <div className="max-w-lg mx-auto flex flex-col h-[calc(100dvh-8rem)]">
      {/* Search & filter pills */}
      <div className="px-4 py-3 space-y-3 bg-background">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar servicios, ciudades..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 h-11 rounded-full"
          />
        </div>

        {/* Type pills — horizontal scroll */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
          {Object.entries(SERVICE_TYPES).map(([key, { label, emoji }]) => (
            <Badge
              key={key}
              variant={selectedType === key ? 'default' : 'outline'}
              className={`cursor-pointer py-1.5 px-4 rounded-full whitespace-nowrap flex-shrink-0 text-sm ${
                selectedType === key ? 'bg-teal-700' : ''
              }`}
              onClick={() => setSelectedType(selectedType === key ? null : key as ServiceType)}
            >
              {emoji} {label}
            </Badge>
          ))}
        </div>
      </div>

      {/* 2-column grid */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {services.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {services.map(service => (
              <ServiceCard key={service.id} service={service} compact />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg font-medium mb-1">No hay servicios</p>
            <p className="text-sm">Intenta cambiar los filtros de busqueda</p>
          </div>
        )}
      </div>
    </div>
  )
}
