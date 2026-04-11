'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod/v4'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import {
  Loader2, MapPin, Camera, Languages, Crown, UtensilsCrossed,
  Image as ImageIcon, DollarSign, Clock, CheckCircle
} from 'lucide-react'
import { SERVICE_TYPES } from '@/lib/constants'
import { useTranslation } from '@/stores/language-store'
import type { ServiceType } from '@/types/database'

const serviceIcons: Record<ServiceType, typeof MapPin> = {
  micro_tour: MapPin,
  photo_session: Camera,
  language_assistant: Languages,
  vip_access: Crown,
  table_reservation: UtensilsCrossed,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const serviceSchema = z.object({
  title: z.string().min(5, 'Minimo 5 caracteres'),
  description: z.string().min(20, 'Minimo 20 caracteres'),
  price: z.number().min(1, 'Precio minimo $1'),
  duration_minutes: z.number().min(1).max(180),
  address: z.string().min(5, 'Ingresa una direccion'),
})

type ServiceForm = z.infer<typeof serviceSchema>

export default function PublicarPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState<ServiceType | null>(null)
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()

  const { register, handleSubmit, watch, formState: { errors } } = useForm<ServiceForm>({
    defaultValues: {
      duration_minutes: 15,
      price: 10,
    },
  })

  const formValues = watch()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function onSubmit(_data: ServiceForm) {
    if (!selectedType) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    toast.success(t('publish.publishSuccess'))
    setLoading(false)
    router.push('/dashboard')
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3].map(s => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              s <= step ? 'bg-teal-700' : 'bg-muted'
            }`}
          />
        ))}
      </div>

      {/* Step 1: Select type */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>{t('publish.whatType')}</CardTitle>
            <CardDescription>{t('publish.selectCategory')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(SERVICE_TYPES).map(([key, { label, emoji }]) => {
              const Icon = serviceIcons[key as ServiceType]
              return (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedType(key as ServiceType)
                    setStep(2)
                  }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all hover:shadow-md ${
                    selectedType === key
                      ? 'border-teal-700 bg-teal-50 dark:bg-teal-950/30'
                      : 'border-border hover:border-teal-300 dark:hover:border-teal-700'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-teal-700 dark:text-teal-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{emoji} {label}</p>
                  </div>
                </button>
              )
            })}
          </CardContent>
        </Card>
      )}

      {/* Step 2: Details */}
      {step === 2 && selectedType && (
        <form onSubmit={handleSubmit(() => setStep(3))} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('publish.serviceDetails')}</CardTitle>
              <CardDescription>
                {SERVICE_TYPES[selectedType].emoji} {SERVICE_TYPES[selectedType].label}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="title">{t('publish.title')}</Label>
                <Input
                  id="title"
                  {...register('title', { required: true, minLength: 5 })}
                  placeholder={t('publish.titlePlaceholder')}
                />
                {errors.title && (
                  <p className="text-xs text-destructive">{errors.title.message || t('common.required')}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="description">{t('publish.description')}</Label>
                <Textarea
                  id="description"
                  {...register('description', { required: true, minLength: 20 })}
                  placeholder={t('publish.descriptionPlaceholder')}
                  rows={4}
                />
                {errors.description && (
                  <p className="text-xs text-destructive">{errors.description.message || t('common.required')}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="price">
                    <DollarSign className="inline h-3.5 w-3.5" />
                    {t('publish.priceUSD')}
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    {...register('price', { required: true, valueAsNumber: true, min: 1 })}
                    min={1}
                    step={0.5}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="duration">
                    <Clock className="inline h-3.5 w-3.5" />
                    {t('publish.durationMin')}
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    {...register('duration_minutes', { required: true, valueAsNumber: true, min: 1 })}
                    min={1}
                    max={180}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="address">
                  <MapPin className="inline h-3.5 w-3.5" />
                  {t('publish.location')}
                </Label>
                <Input
                  id="address"
                  {...register('address', { required: true, minLength: 5 })}
                  placeholder={t('publish.locationPlaceholder')}
                />
                {errors.address && (
                  <p className="text-xs text-destructive">{errors.address.message || t('common.required')}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label>{t('publish.photos')}</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center text-muted-foreground hover:border-teal-300 dark:hover:border-teal-700 transition-colors cursor-pointer">
                  <ImageIcon className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">{t('publish.tapToAddPhotos')}</p>
                  <p className="text-xs">{t('publish.photoFormat')}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 rounded-full">
                  {t('common.previous')}
                </Button>
                <Button type="submit" className="flex-1 bg-teal-700 hover:bg-teal-600 rounded-full">
                  {t('publish.previewBtn')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      )}

      {/* Step 3: Preview */}
      {step === 3 && selectedType && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('publish.preview')}</CardTitle>
              <CardDescription>{t('publish.previewDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted h-40 flex items-center justify-center">
                <div className="text-center">
                  <ImageIcon className="h-10 w-10 text-muted-foreground mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">{t('publish.noPhotos')}</p>
                </div>
              </div>

              <Badge className="bg-teal-50 text-teal-800 dark:bg-teal-950/40 dark:text-teal-300 border-teal-200 dark:border-teal-800">
                {SERVICE_TYPES[selectedType].emoji} {SERVICE_TYPES[selectedType].label}
              </Badge>

              <h3 className="text-xl font-bold">{formValues.title || t('publish.noTitle')}</h3>
              <p className="text-sm text-muted-foreground">{formValues.description || t('publish.noDescription')}</p>

              <Separator />

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-teal-700 dark:text-teal-400" />
                  <span className="font-bold text-lg">${formValues.price || 0} USD</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{formValues.duration_minutes || 0} min</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{formValues.address || t('publish.noLocation')}</span>
              </div>

              <Separator />

              <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
                <p className="font-medium text-foreground mb-1">{t('publish.platformCommission')}</p>
                <p>{(formValues.price || 0) < 50 ? t('publish.commissionDesc20') : t('publish.commissionDesc15')}</p>
                <p className="mt-1">{t('publish.youReceive')}: <span className="font-bold text-teal-700 dark:text-teal-400">
                  ${((formValues.price || 0) * (1 - ((formValues.price || 0) < 50 ? 0.20 : 0.15))).toFixed(2)} USD
                </span></p>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep(2)} className="flex-1 rounded-full">
              {t('common.edit')}
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              className="flex-1 bg-teal-700 hover:bg-teal-600 rounded-full"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle className="mr-2 h-4 w-4" />
              )}
              {t('publish.publishBtn')}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
