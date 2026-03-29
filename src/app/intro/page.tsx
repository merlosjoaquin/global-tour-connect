'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, ArrowRightLeft, CalendarCheck, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const SLIDES = [
  {
    icon: MapPin,
    title: 'Descubre experiencias locales',
    subtitle: 'Conecta con personas reales en cada ciudad que visites',
    bg: 'from-teal-50 to-white',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-700',
  },
  {
    icon: ArrowRightLeft,
    title: 'Se turista o anfitrion',
    subtitle: 'Explora servicios unicos o comparte lo mejor de tu ciudad',
    bg: 'from-emerald-50 to-white',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
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

export default function IntroPage() {
  const [current, setCurrent] = useState(0)
  const router = useRouter()
  const isLast = current === SLIDES.length - 1

  const finish = useCallback(() => {
    localStorage.setItem('gtc_intro_seen', 'true')
    router.push('/auth')
  }, [router])

  const next = () => {
    if (isLast) {
      finish()
    } else {
      setCurrent(c => c + 1)
    }
  }

  const slide = SLIDES[current]
  const Icon = slide.icon

  return (
    <div className={`min-h-dvh flex flex-col bg-gradient-to-b ${slide.bg} transition-colors duration-500`}>
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

        {/* Button */}
        <Button
          onClick={next}
          size="lg"
          className="w-full rounded-full bg-teal-700 hover:bg-teal-600 text-base font-semibold h-14"
        >
          {isLast ? 'Comenzar' : 'Siguiente'}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
