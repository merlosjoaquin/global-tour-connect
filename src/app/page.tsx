'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from '@/stores/language-store'

export default function HomePage() {
  const router = useRouter()
  const { t } = useTranslation()

  useEffect(() => {
    const introSeen = localStorage.getItem('gtc_intro_seen')
    if (!introSeen) {
      router.replace('/intro')
    } else {
      router.replace('/dashboard')
    }
  }, [router])

  return (
    <div className="min-h-dvh flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">{t('common.loading')}</div>
    </div>
  )
}
