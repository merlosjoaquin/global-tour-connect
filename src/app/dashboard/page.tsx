'use client'

import dynamic from 'next/dynamic'

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
    </div>
  )
}
