'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useTranslation } from '@/stores/language-store'

const MapView = dynamic(() => import('@/components/map-view'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 border-3 border-teal-700 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-muted-foreground">...</span>
      </div>
    </div>
  ),
})

export default function DashboardPage() {
  const { t } = useTranslation()
  const [mapOverlayActive, setMapOverlayActive] = useState(false)

  return (
    <div className="fixed inset-0 bottom-[64px] z-0">
      <MapView onOverlayChange={setMapOverlayActive} />
      {/* CTA to request a host */}
      {!mapOverlayActive && (
        <Link
          href="/solicitar"
          className="absolute bottom-6 left-[12.5%] right-[12.5%] z-[1000] flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-white shadow-lg active:scale-[0.98] transition-transform"
          style={{ backgroundColor: '#0f766e' }}
        >
          {t('dashboard.requestHost')}
        </Link>
      )}
    </div>
  )
}
