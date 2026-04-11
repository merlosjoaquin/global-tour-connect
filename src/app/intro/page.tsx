'use client'

import { useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/stores/language-store'

const SWIPE_THRESHOLD = 50

export default function IntroPage() {
  const [current, setCurrent] = useState(0)
  const router = useRouter()
  const { t } = useTranslation()
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const SLIDES = [
    {
      image: '/onboarding-slide1.png',
      title: t('intro.slide1Title'),
      subtitle: t('intro.slide1Subtitle'),
      bg: 'from-teal-50 to-white dark:from-teal-950/30 dark:to-background',
    },
    {
      image: '/onboarding-slide2.png',
      title: t('intro.slide2Title'),
      subtitle: t('intro.slide2Subtitle'),
      bg: 'from-yellow-50 to-white dark:from-yellow-950/30 dark:to-background',
    },
  ]

  const isLast = current === SLIDES.length - 1

  const finish = useCallback(() => {
    localStorage.setItem('gtc_intro_seen', 'true')
    router.push('/auth')
  }, [router])

  const goNext = () => {
    if (!isLast) setCurrent(c => c + 1)
  }

  const goPrev = () => {
    if (current > 0) setCurrent(c => c - 1)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchEndX.current = e.touches[0].clientX
  }

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const onTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) < SWIPE_THRESHOLD) return
    if (diff > 0) goNext()
    else goPrev()
  }

  const slide = SLIDES[current]

  return (
    <div
      style={{ touchAction: 'pan-y' }}
      className={`min-h-dvh flex flex-col bg-gradient-to-b ${slide.bg} transition-colors duration-500 select-none`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Skip */}
      {!isLast && (
        <div className="flex justify-end p-4">
          <button
            onClick={finish}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('intro.skip')}
          </button>
        </div>
      )}
      {isLast && <div className="p-4 h-10" />}

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <Image
          src={slide.image}
          alt={slide.title}
          width={256}
          height={256}
          className="w-64 h-64 object-contain mb-8"
          style={{
            maskImage: 'radial-gradient(ellipse 75% 75% at center, black 45%, transparent 90%)',
            WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at center, black 45%, transparent 90%)',
          }}
        />
        <h1 className="text-2xl font-bold text-foreground mb-3 max-w-xs">
          {slide.title}
        </h1>
        <p className="text-base text-muted-foreground max-w-xs leading-relaxed">
          {slide.subtitle}
        </p>
      </div>

      {/* Bottom controls */}
      <div className="px-8 pb-12 space-y-6">
        {/* Dots */}
        <div className="flex justify-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? 'w-6 bg-teal-700' : 'w-2 bg-teal-200 dark:bg-teal-800'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {isLast ? (
          <Button
            onClick={finish}
            size="lg"
            className="w-full rounded-full bg-teal-700 hover:bg-teal-600 text-base font-semibold h-14"
          >
            {t('intro.start')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        ) : (
          <p className="text-center text-sm text-muted-foreground animate-pulse">
            {t('intro.swipeHint')} &rarr;
          </p>
        )}
      </div>
    </div>
  )
}
