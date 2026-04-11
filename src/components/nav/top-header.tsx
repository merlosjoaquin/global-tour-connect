'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ArrowLeft, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/stores/language-store'

export function TopHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useTranslation()

  // Don't show on landing page, auth, intro, or dashboard (map view)
  if (pathname === '/' || pathname === '/auth' || pathname === '/intro' || pathname === '/dashboard' || pathname === '/solicitar') return null
  // Demo payment pages render their own DemoHeader
  if (
    pathname === '/checkout' ||
    pathname === '/wallet' ||
    pathname === '/settings/currency' ||
    pathname === '/onboarding/country'
  ) return null

  const PAGE_TITLES: Record<string, string> = {
    '/': 'Aditly',
    '/publicar': t('nav.publish') + ' ' + t('solicitar.stepService'),
    '/chat': t('nav.messages'),
    '/perfil': t('nav.myProfile'),
    '/dashboard': t('nav.dashboard'),
    '/auth': t('nav.login'),
  }

  const title = pathname.startsWith('/anfitrion/')
    ? t('hostProfile.title')
    : PAGE_TITLES[pathname] || 'Aditly'
  const showBack = pathname !== '/dashboard'

  // For detail pages that are reached via deep navigation, use router.back()
  // so the user returns to whichever page they came from (e.g. anfitrion profile → servicio → back = anfitrion profile)
  const usesHistoryBack = pathname.startsWith('/servicio/') || pathname.startsWith('/anfitrion/')

  function handleBack() {
    if (usesHistoryBack) {
      router.back()
    } else {
      const parent = pathname.split('/').slice(0, -1).join('/') || '/dashboard'
      router.push(parent)
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
        <div className="flex items-center gap-2">
          {showBack && (
            <Button variant="ghost" size="icon" className="-ml-2" onClick={handleBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <h1 className="font-semibold text-lg truncate">{title}</h1>
        </div>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
