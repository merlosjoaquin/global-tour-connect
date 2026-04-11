'use client'

import * as React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Star, Shield, CreditCard, CheckCircle, X, ArrowLeft, MessageCircle, AlertTriangle, Loader2 } from 'lucide-react'
import { useTranslation } from '@/stores/language-store'
import { SERVICE_TYPES } from '@/lib/constants'
import { MOCK_MAP_HOSTS } from '@/lib/map-data'
import type { ServiceType } from '@/types/database'
import type { MapHost } from '@/lib/map-data'

function ProgressBar({ currentStep }: { currentStep: number }) {
  const { t } = useTranslation()
  const stepLabels = [t('solicitar.stepService'), t('solicitar.stepHost'), t('solicitar.stepPayment'), t('solicitar.stepActive')]
  return (
    <div className="w-full px-4 pt-4 pb-2">
      <div className="flex gap-2">
        {stepLabels.map((label, i) => (
          <div key={label} className="flex-1 flex flex-col items-center gap-1">
            <div
              className={`h-1.5 w-full rounded-full transition-colors ${
                i <= currentStep ? 'bg-teal-700' : 'bg-gray-200'
              }`}
            />
            <span
              className={`text-[10px] font-medium ${
                i <= currentStep ? 'text-teal-700' : 'text-gray-400'
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function StepHeader({
  title,
  subtitle,
  onBack,
}: {
  title: string
  subtitle?: string
  onBack?: () => void
}) {
  const { t } = useTranslation()
  return (
    <div className="flex items-start gap-3 px-4 pb-4">
      {onBack && (
        <button
          onClick={onBack}
          className="mt-1 p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label={t('common.back')}
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
      )}
      <div>
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Step 1 — Select Service Type                                       */
/* ------------------------------------------------------------------ */
function StepSelectService({
  onSelect,
}: {
  onSelect: (type: ServiceType) => void
}) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<ServiceType | null>(null)

  const handleSelect = (type: ServiceType) => {
    setSelected(type)
    // Small delay so the user sees the selection highlight
    setTimeout(() => onSelect(type), 200)
  }

  return (
    <>
      <StepHeader title={t('solicitar.whatServiceNeed')} />
      <div className="px-4 grid grid-cols-2 gap-3">
        {(Object.entries(SERVICE_TYPES) as [ServiceType, { label: string; emoji: string }][]).map(
          ([type, { label, emoji }]) => (
            <button
              key={type}
              onClick={() => handleSelect(type)}
              className={`flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border-2 transition-all active:scale-[0.97] ${
                selected === type
                  ? 'border-teal-700 bg-teal-50 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <span className="text-3xl">{emoji}</span>
              <span className="text-sm font-medium text-center text-gray-800 leading-tight">
                {label}
              </span>
            </button>
          )
        )}
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Step 2 — Browse Nearby Hosts                                       */
/* ------------------------------------------------------------------ */
function StepBrowseHosts({
  serviceType,
  onSelect,
  onBack,
}: {
  serviceType: ServiceType
  onSelect: (host: MapHost, serviceIndex: number) => void
  onBack: () => void
}) {
  const { t } = useTranslation()
  const serviceLabel = SERVICE_TYPES[serviceType].label

  // Filter: online hosts with matching service type, sorted by rating desc
  const matchingHosts = MOCK_MAP_HOSTS
    .filter((h) => h.isOnline && h.services.some((s) => s.type === serviceType))
    .sort((a, b) => b.rating - a.rating)

  return (
    <>
      <StepHeader
        title={t('solicitar.availableHosts')}
        subtitle={t('solicitar.showingHosts') + ' ' + serviceLabel}
        onBack={onBack}
      />
      <div className="px-4 space-y-3">
        {matchingHosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <AlertTriangle className="h-10 w-10 text-gray-300 mb-3" />
            <p className="text-gray-500 font-medium">
              {t('solicitar.noHostsAvailable')}
            </p>
          </div>
        ) : (
          matchingHosts.map((host) => {
            const matchingServiceIdx = host.services.findIndex(
              (s) => s.type === serviceType
            )
            const service = host.services[matchingServiceIdx]
            return (
              <Card key={host.id} className="rounded-2xl overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <Image
                        src={host.avatar}
                        alt={host.name}
                        width={48}
                        height={48}
                        className="rounded-full border-2 border-teal-700"
                      />
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {host.name}
                        </h3>
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-700 text-[10px] shrink-0"
                        >
                          {t('chat.online')}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-700">
                          {host.rating}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 truncate">
                        {t(`mapData.services.${service.id}`) || service.title}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-teal-700">
                          ${service.price} {service.currency}
                        </span>
                        <Button
                          size="sm"
                          className="rounded-full bg-teal-700 hover:bg-teal-600 text-white"
                          onClick={() => onSelect(host, matchingServiceIdx)}
                        >
                          {t('solicitar.hire')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Step 3 — Payment (Escrow)                                          */
/* ------------------------------------------------------------------ */
function StepPayment({
  host,
  serviceIndex,
  onBack,
  onPaymentConfirmed,
}: {
  host: MapHost
  serviceIndex: number
  onBack: () => void
  onPaymentConfirmed: () => void
}) {
  const { t } = useTranslation()
  const [loading, setLoading] = React.useState(false)
  const service = host.services[serviceIndex]

  const handleContinueToCheckout = async () => {
    setLoading(true)
    // Simulate payment processing (mock — no real Stripe)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    onPaymentConfirmed()
  }

  return (
    <>
      <StepHeader title={t('solicitar.requestSummary')} onBack={onBack} />
      <div className="px-4 space-y-4">
        {/* Host & service summary */}
        <Card className="rounded-2xl">
          <CardContent className="p-4 flex items-center gap-3">
            <Image
              src={host.avatar}
              alt={host.name}
              width={48}
              height={48}
              className="rounded-full border-2 border-teal-700"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{host.name}</h3>
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{host.rating}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service details */}
        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">{t(`mapData.services.${service.id}`) || service.title}</span>
              <span className="text-lg font-bold text-teal-700">
                ${service.price} {service.currency}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Escrow explanation */}
        <div className="flex gap-3 p-4 bg-teal-50 dark:bg-teal-950/30 rounded-2xl border border-teal-200 dark:border-teal-800">
          <Shield className="h-5 w-5 text-teal-700 shrink-0 mt-0.5" />
          <p className="text-sm text-teal-800 dark:text-teal-200 leading-relaxed">
            {t('solicitar.escrowExplanation')}
          </p>
        </div>

        <Button
          className="w-full rounded-2xl bg-teal-700 hover:bg-teal-600 text-white h-12 text-base font-semibold flex items-center gap-2"
          onClick={handleContinueToCheckout}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              {t('wallet.processing')}
            </>
          ) : (
            <>
              <CreditCard className="h-5 w-5" />
              {t('solicitar.continueToPay')}
            </>
          )}
        </Button>
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Step 4 — Active Service                                            */
/* ------------------------------------------------------------------ */
function StepActiveService({
  host,
  serviceIndex,
}: {
  host: MapHost
  serviceIndex: number
}) {
  const router = useRouter()
  const { t } = useTranslation()
  const service = host.services[serviceIndex]

  const handleComplete = () => {
    toast.success(t('solicitar.paymentReleasedToHost'))
    router.push('/dashboard')
  }

  const handleCancel = () => {
    const confirmed = window.confirm(t('solicitar.confirmCancel'))
    if (confirmed) {
      toast.info(t('solicitar.cancelledRefund'))
      router.push('/dashboard')
    }
  }

  return (
    <>
      <StepHeader title={t('solicitar.serviceInProgress')} />
      <div className="px-4 space-y-4">
        {/* Success confirmation */}
        <div className="flex flex-col items-center py-4">
          <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
          <p className="text-lg font-semibold text-gray-900">
            {t('solicitar.paymentHeld')} — ${service.price} {service.currency}
          </p>
        </div>

        {/* Host card */}
        <Card className="rounded-2xl">
          <CardContent className="p-4 flex items-center gap-3">
            <Image
              src={host.avatar}
              alt={host.name}
              width={48}
              height={48}
              className="rounded-full border-2 border-teal-700"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{host.name}</h3>
              <p className="text-sm text-gray-500">{t('solicitar.yourHost')}</p>
            </div>
          </CardContent>
        </Card>

        {/* Info text */}
        <p className="text-sm text-gray-600 text-center">
          {t('solicitar.contactHost')}
        </p>

        {/* Action buttons */}
        <div className="space-y-3">
          <Link href="/chat" className="w-full">
            <Button
              className="w-full rounded-2xl bg-teal-700 hover:bg-teal-600 text-white h-12 text-base font-semibold flex items-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              {t('solicitar.chatWith')} {host.name}
            </Button>
          </Link>

          <Button
            variant="outline"
            className="w-full rounded-2xl border-green-500 text-green-700 hover:bg-green-50 h-12 text-base font-semibold"
            onClick={handleComplete}
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            {t('solicitar.serviceCompleted')}
          </Button>

          <Button
            variant="outline"
            className="w-full rounded-2xl border-red-400 text-red-600 hover:bg-red-50 h-12 text-base font-semibold"
            onClick={handleCancel}
          >
            <X className="h-5 w-5 mr-2" />
            {t('solicitar.cancelService')}
          </Button>
        </div>

        {/* Warning box */}
        <div className="flex gap-3 p-4 bg-yellow-50 rounded-2xl border border-yellow-200">
          <AlertTriangle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-800 leading-relaxed">
            {t('solicitar.paymentReleaseWarning')}
          </p>
        </div>
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Main Page                                                          */
/* ------------------------------------------------------------------ */
export default function SolicitarPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const [step, setStep] = useState(0)
  const [selectedType, setSelectedType] = useState<ServiceType | null>(null)
  const [selectedHost, setSelectedHost] = useState<MapHost | null>(null)
  const [selectedServiceIdx, setSelectedServiceIdx] = useState(0)

  return (
    <div className="min-h-dvh bg-gray-50 flex flex-col">
      {/* Close / back to dashboard */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1 max-w-lg mx-auto w-full">
        <button
          onClick={() => router.push('/dashboard')}
          className="p-1.5 rounded-full hover:bg-gray-200 transition-colors"
          aria-label={t('common.close')}
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>
        <span className="text-sm font-medium text-gray-500">
          {t('solicitar.title')}
        </span>
        <div className="w-8" /> {/* spacer */}
      </div>

      {/* Progress bar */}
      <div className="max-w-lg mx-auto w-full">
        <ProgressBar currentStep={step} />
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-y-auto pb-8 max-w-lg mx-auto w-full">
        {step === 0 && (
          <StepSelectService
            onSelect={(type) => {
              setSelectedType(type)
              setStep(1)
            }}
          />
        )}

        {step === 1 && selectedType && (
          <StepBrowseHosts
            serviceType={selectedType}
            onSelect={(host, serviceIdx) => {
              setSelectedHost(host)
              setSelectedServiceIdx(serviceIdx)
              setStep(2)
            }}
            onBack={() => setStep(0)}
          />
        )}

        {step === 2 && selectedHost && (
          <StepPayment
            host={selectedHost}
            serviceIndex={selectedServiceIdx}
            onBack={() => setStep(1)}
            onPaymentConfirmed={() => setStep(3)}
          />
        )}

        {step === 3 && selectedHost && (
          <StepActiveService
            host={selectedHost}
            serviceIndex={selectedServiceIdx}
          />
        )}
      </div>
    </div>
  )
}
