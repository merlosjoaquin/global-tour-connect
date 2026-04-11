import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Providers } from '@/components/providers'
import { BottomNav } from '@/components/nav/bottom-nav'
import { TopHeader } from '@/components/nav/top-header'
import { PWARegister } from '@/components/pwa-register'
import { HtmlLangSync } from '@/components/html-lang'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://globaltourconnect.com'),
  title: 'Aditly',
  description: 'Marketplace de micro-servicios turisticos. Conecta con locales, descubre experiencias unicas.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ADT',
  },
  openGraph: {
    title: 'Aditly',
    description: 'Marketplace de micro-servicios turisticos. Conecta con locales, descubre experiencias unicas.',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aditly',
    description: 'Marketplace de micro-servicios turisticos. Conecta con locales, descubre experiencias unicas.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0f766e',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <Providers>
          <HtmlLangSync />
          <PWARegister />
          <TopHeader />
          <main className="min-h-[calc(100dvh-8rem)] pb-20">
            {children}
          </main>
          <BottomNav />
        </Providers>
      </body>
    </html>
  )
}
