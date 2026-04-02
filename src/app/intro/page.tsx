'use client'

import { useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Globe, CalendarCheck, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const SLIDES = [
  {
    icon: Globe,
    title: 'Viaja y conecta con el mundo',
    subtitle: 'Contrata anfitriones locales en tus vacaciones, o se el anfitrion de tu propia ciudad!',
    bg: 'from-teal-50 to-white',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-700',
  },
  {
    icon: CalendarCheck,
    title: 'Reserva en minutos',
    subtitle: 'Pago seguro, chat directo y calificaciones reales',
    bg: 'from-yellow-50 to-white',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
  },
]

const SWIPE_THRESHOLD = 50

export default function IntroPage() {
  const [current, setCurrent] = useState(0)
  const router = useRouter()
  const isLast = current === SLIDES.length - 1
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

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
    if (diff > 0) goNext()   // swipe left → next
    else goPrev()            // swipe right → prev
  }

  const slide = SLIDES[current]
  const Icon = slide.icon

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
            Saltar
          </button>
        </div>
      )}
      {isLast && <div className="p-4 h-10" />}

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className={`w-28 h-28 rounded-full ${slide.iconBg} flex items-center justify-center mb-8`}>
          <Icon className={`h-14 w-14 ${slide.iconColor}`} />
        </div>
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
                i === current ? 'w-6 bg-teal-700' : 'w-2 bg-teal-200'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Swipe hint on first slide, Comenzar button on last */}
        {isLast ? (
          <Button
            onClick={finish}
            size="lg"
            className="w-full rounded-full bg-teal-700 hover:bg-teal-600 text-base font-semibold h-14"
          >
            Comenzar
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        ) : (
          <p className="text-center text-sm text-muted-foreground animate-pulse">
            Desliza para continuar →
          </p>
        )}
      </div>
    </div>
  )
}
