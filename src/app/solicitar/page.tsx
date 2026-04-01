'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { Star, Shield, CreditCard, Loader2, CheckCircle, X, ArrowLeft, MessageCircle, AlertTriangle } from 'lucide-react'
import { SERVICE_TYPES } from '@/lib/constants'
import { MOCK_MAP_HOSTS } from '@/lib/map-data'
import type { ServiceType } from '@/types/database'
import type { MapHost } from '@/lib/map-data'

const STEP_LABELS = ['Servicio', 'Anfitrion', 'Pago', 'En curso']

function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-full px-4 pt-4 pb-2">
      <div className="flex gap-2">
        {STEP_LABELS.map((label, i) => (
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
  return (
    <div className="flex items-start gap-3 px-4 pb-4">
      {onBack && (
        <button
          onClick={onBack}
          className="mt-1 p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Volver"
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
  const [selected, setSelected] = useState<ServiceType | null>(null)

  const handleSelect = (type: ServiceType) => {
    setSelected(type)
    // Small delay so the user sees the selection highlight
    setTimeout(() => onSelect(type), 200)
  }

  return (
    <>
      <StepHeader title="Que servicio necesitas?" />
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
  const serviceLabel = SERVICE_TYPES[serviceType].label

  // Filter: online hosts with matching service type, sorted by rating desc
  const matchingHosts = MOCK_MAP_HOSTS
    .filter((h) => h.isOnline && h.services.some((s) => s.type === serviceType))
    .sort((a, b) => b.rating - a.rating)

  return (
    <>
      <StepHeader
        title="Anfitriones disponibles cerca de ti"
        subtitle={`Mostrando anfitriones en linea con ${serviceLabel}`}
        onBack={onBack}
      />
      <div className="px-4 space-y-3">
        {matchingHosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <AlertTriangle className="h-10 w-10 text-gray-300 mb-3" />
            <p className="text-gray-500 font-medium">
              No hay anfitriones disponibles para este servicio en este momento
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
                          En linea
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-700">
                          {host.rating}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 truncate">
                        {service.title}
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
                          Contratar
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
  onPaid,
  onBack,
}: {
  host: MapHost
  serviceIndex: number
  onPaid: () => void
  onBack: () => void
}) {
  const service = host.services[serviceIndex]
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePay = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      onPaid()
    }, 2000)
  }

  return (
    <>
      <StepHeader title="Pago seguro" onBack={onBack} />
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
              <h3 className="font-semibold text-gray-900">{host.name}</h3>
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-600">{host.rating}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service details */}
        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{service.title}</span>
              <span className="text-lg font-bold text-teal-700">
                ${service.price} {service.currency}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Escrow explanation */}
        <div className="flex gap-3 p-4 bg-teal-50 rounded-2xl border border-teal-200">
          <Shield className="h-5 w-5 text-teal-700 shrink-0 mt-0.5" />
          <p className="text-sm text-teal-800 leading-relaxed">
            Tu pago queda retenido de forma segura hasta que el servicio sea
            completado. Si el servicio no se brinda correctamente, puedes
            cancelar y se te devolvera el dinero.
          </p>
        </div>

        <Separator />

        {/* Mock credit card form */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-700">
            <CreditCard className="h-4 w-4" />
            <span className="text-sm font-medium">Tarjeta de credito</span>
          </div>
          <div className="space-y-3">
            <div>
              <Label htmlFor="card-number" className="text-xs text-gray-500">
                Numero de tarjeta
              </Label>
              <Input
                id="card-number"
                defaultValue="4242 4242 4242 4242"
                className="mt-1"
                readOnly
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="card-exp" className="text-xs text-gray-500">
                  Vencimiento
                </Label>
                <Input
                  id="card-exp"
                  defaultValue="12/28"
                  className="mt-1"
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="card-cvc" className="text-xs text-gray-500">
                  CVC
                </Label>
                <Input
                  id="card-cvc"
                  defaultValue="123"
                  className="mt-1"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        <Button
          className="w-full rounded-2xl bg-teal-700 hover:bg-teal-600 text-white h-12 text-base font-semibold"
          onClick={handlePay}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Procesando...
            </span>
          ) : (
            `Pagar $${service.price} ${service.currency}`
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
  const service = host.services[serviceIndex]

  const handleComplete = () => {
    toast.success('Servicio completado! Pago liberado al anfitrion.')
    router.push('/dashboard')
  }

  const handleCancel = () => {
    const confirmed = window.confirm(
      'Estas seguro que deseas cancelar el servicio? Se iniciara el proceso de devolucion.'
    )
    if (confirmed) {
      toast.info('Servicio cancelado. Tu dinero sera devuelto en 3-5 dias habiles.')
      router.push('/dashboard')
    }
  }

  return (
    <>
      <StepHeader title="Servicio en curso" />
      <div className="px-4 space-y-4">
        {/* Success confirmation */}
        <div className="flex flex-col items-center py-4">
          <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
          <p className="text-lg font-semibold text-gray-900">
            Pago retenido — ${service.price} {service.currency}
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
              <p className="text-sm text-gray-500">Tu anfitrion</p>
            </div>
          </CardContent>
        </Card>

        {/* Info text */}
        <p className="text-sm text-gray-600 text-center">
          Contacta a tu anfitrion para coordinar el punto de encuentro
        </p>

        {/* Action buttons */}
        <div className="space-y-3">
          <Button
            render={<Link href="/chat" />}
            className="w-full rounded-2xl bg-teal-700 hover:bg-teal-600 text-white h-12 text-base font-semibold flex items-center gap-2"
          >
            <MessageCircle className="h-5 w-5" />
            Chatear con {host.name}
          </Button>

          <Button
            variant="outline"
            className="w-full rounded-2xl border-green-500 text-green-700 hover:bg-green-50 h-12 text-base font-semibold"
            onClick={handleComplete}
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            Servicio completado
          </Button>

          <Button
            variant="outline"
            className="w-full rounded-2xl border-red-400 text-red-600 hover:bg-red-50 h-12 text-base font-semibold"
            onClick={handleCancel}
          >
            <X className="h-5 w-5 mr-2" />
            Cancelar servicio
          </Button>
        </div>

        {/* Warning box */}
        <div className="flex gap-3 p-4 bg-yellow-50 rounded-2xl border border-yellow-200">
          <AlertTriangle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-800 leading-relaxed">
            El pago se libera al anfitrion solo cuando confirmes que el servicio
            fue completado correctamente.
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
          aria-label="Cerrar"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>
        <span className="text-sm font-medium text-gray-500">
          Solicitar anfitrion
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
            onPaid={() => setStep(3)}
            onBack={() => setStep(1)}
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
