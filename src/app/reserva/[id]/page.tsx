'use client'

import { use, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import {
  Calendar, Clock, MapPin, CreditCard, Loader2,
  CheckCircle, Shield, DollarSign
} from 'lucide-react'
import { getServiceWithHost } from '@/lib/mock-data'
import { SERVICE_TYPES } from '@/lib/constants'
import { useTranslation } from '@/stores/language-store'

export default function ReservaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()

  const service = getServiceWithHost(id)

  if (!service) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-lg font-medium">{t('service.notFound')}</p>
          <Link href="/dashboard">
            <Button variant="link" className="text-teal-700 dark:text-teal-400 mt-2">
              {t('service.backToHome')}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const host = service.host!
  const typeInfo = SERVICE_TYPES[service.type]

  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '14:00', '14:30', '15:00', '15:30', '16:00',
    '16:30', '17:00', '17:30', '18:00',
  ]

  async function handlePayment() {
    const selectedDateObj = new Date(selectedDate)
    if (selectedDateObj < new Date()) {
      toast.error('La fecha no puede ser en el pasado', { id: 'reserva-date' })
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 2000))
    setLoading(false)
    setStep(3)
    toast.success(t('booking.bookingConfirmed'))
  }

  const minDate = new Date()
  minDate.setDate(minDate.getDate() + 1)
  const minDateStr = minDate.toISOString().split('T')[0]

  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-2">
        {[t('booking.progressDate'), t('booking.progressPayment'), t('booking.progressConfirmation')].map((label, i) => (
          <div key={label} className="flex-1 text-center">
            <div
              className={`h-1.5 rounded-full mb-1 ${
                i + 1 <= step ? 'bg-teal-700' : 'bg-muted'
              }`}
            />
            <span className={`text-[10px] ${i + 1 <= step ? 'text-teal-700 dark:text-teal-400 font-medium' : 'text-muted-foreground'}`}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Service summary */}
      <Card>
        <CardContent className="p-3">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden relative flex-shrink-0">
              {service.photos[0] ? (
                <Image src={service.photos[0]} alt="" fill className="object-cover" sizes="64px" />
              ) : (
                <div className="flex items-center justify-center h-full text-2xl">{typeInfo.emoji}</div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <Badge className="text-[10px] mb-1 bg-teal-50 text-teal-800 dark:bg-teal-950/40 dark:text-teal-300">{typeInfo.label}</Badge>
              <p className="font-semibold text-sm truncate">{t(`mapData.services.${service.id}`) || service.title}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-0.5">
                  <Clock className="h-3 w-3" /> {service.duration_minutes} min
                </span>
                <span className="flex items-center gap-0.5">
                  <MapPin className="h-3 w-3" /> {host.city}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-teal-700 dark:text-teal-400">${service.price}</p>
              <p className="text-[10px] text-muted-foreground">USD</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Select date & time */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-teal-700 dark:text-teal-400" />
              {t('booking.selectDateTime')}
            </CardTitle>
            <CardDescription>{t('booking.selectDateTimeDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="date">{t('booking.date')}</Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                min={minDateStr}
              />
            </div>

            {selectedDate && (
              <div className="space-y-2">
                <Label>{t('booking.availableTime')}</Label>
                <div className="grid grid-cols-4 gap-2">
                  {availableTimes.map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-1 rounded-full text-sm font-medium transition-colors ${
                        selectedTime === time
                          ? 'bg-teal-700 text-white'
                          : 'bg-muted hover:bg-teal-50 dark:hover:bg-teal-950/30 text-foreground'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={() => setStep(2)}
              className="w-full bg-teal-700 hover:bg-teal-600"
              disabled={!selectedDate || !selectedTime}
            >
              {t('booking.continueToPay')}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Payment */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-teal-700 dark:text-teal-400" />
              {t('booking.securePayment')}
            </CardTitle>
            <CardDescription>{t('booking.processedByStripe')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('booking.dateLabel')}</span>
                <span className="font-medium">{new Date(selectedDate).toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('booking.timeLabel')}</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('booking.hostLabel')}</span>
                <span className="font-medium">{host.full_name}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>{t('booking.total')}</span>
                <span className="text-teal-700 dark:text-teal-400">${service.price} USD</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <Label>{t('booking.cardNumber')}</Label>
                <Input placeholder="4242 4242 4242 4242" defaultValue="4242 4242 4242 4242" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>{t('booking.expiry')}</Label>
                  <Input placeholder="MM/AA" defaultValue="12/28" />
                </div>
                <div className="space-y-1">
                  <Label>{t('booking.cvc')}</Label>
                  <Input placeholder="123" defaultValue="123" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-4 w-4 text-green-600" />
              <span>{t('booking.securePaymentNote')}</span>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                {t('common.previous')}
              </Button>
              <Button
                onClick={handlePayment}
                className="flex-1 bg-teal-700 hover:bg-teal-600"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <DollarSign className="mr-2 h-4 w-4" />
                )}
                {t('booking.payAmount')} ${service.price}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <Card>
          <CardContent className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-xl font-bold">{t('booking.confirmed')}</h2>
            <p className="text-sm text-muted-foreground">
              {t('booking.confirmedDesc')
                .replace('{host}', host.full_name)
                .replace('{date}', new Date(selectedDate).toLocaleDateString('es', { day: 'numeric', month: 'long' }))
                .replace('{time}', selectedTime)}
            </p>

            <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('booking.serviceLabel')}</span>
                <span className="font-medium">{t(`mapData.services.${service.id}`) || service.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('booking.durationLabel')}</span>
                <span>{service.duration_minutes} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('booking.meetingPoint')}</span>
                <span className="text-right max-w-[60%]">{service.address}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>{t('booking.totalPaid')}</span>
                <span className="text-teal-700 dark:text-teal-400">${service.price} USD</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Link href="/chat">
                <Button className="bg-teal-700 hover:bg-teal-600">
                  {t('booking.chatWith')} {host.full_name}
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline">
                  {t('booking.goToDashboard')}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
