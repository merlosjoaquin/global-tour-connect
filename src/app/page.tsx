'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const introSeen = localStorage.getItem('gtc_intro_seen')
    if (!introSeen) {
      router.replace('/intro')
    } else {
      router.replace('/explorar')
    }
  }, [router])

  return (
    <div className="min-h-dvh flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Cargando...</div>
    </div>
  )
}
