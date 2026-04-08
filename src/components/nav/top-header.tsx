'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowLeft, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/stores/language-store'

export function TopHeader() {
  const pathname = usePathname()
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
    '/': 'Global Tour Connect',
    '/publicar': t('nav.publish') + ' ' + t('solicitar.stepService'),
    '/chat': t('nav.messages'),
    '/perfil': t('nav.myProfile'),
    '/dashboard': t('nav.dashboard'),
    '/auth': t('nav.login'),
  }

  const title = pathname.startsWith('/anfitrion/')
    ? t('hostProfile.title')
    : PAGE_TITLES[pathname] || 'Global Tour Connect'
  const showBack = pathname !== '/dashboard'

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
        <div className="flex items-center gap-2">
          {showBack && (
            <Button render={<Link href={pathname.startsWith('/anfitrion/') || pathname.startsWith('/servicio/') ? '/dashboard' : (pathname.split('/').slice(0, -1).join('/') || '/dashboard')} />} variant="ghost" size="icon" className="-ml-2">
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
