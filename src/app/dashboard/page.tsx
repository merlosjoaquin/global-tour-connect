'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Search } from 'lucide-react'

const MapView = dynamic(() => import('@/components/map-view'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 border-3 border-teal-700 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-gray-500">Cargando mapa...</span>
      </div>
    </div>
  ),
})

export default function DashboardPage() {
  return (
    <div className="fixed inset-0 bottom-[64px] z-0">
      <MapView />
      {/* CTA to request a host */}
      <Link
        href="/solicitar"
        className="absolute bottom-6 left-[12.5%] right-[12.5%] z-[1000] flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-white shadow-lg active:scale-[0.98] transition-transform"
        style={{ backgroundColor: '#0f766e' }}
      >
        <Search className="h-5 w-5" />
        Solicitar anfitrion
      </Link>
    </div>
  )
}
