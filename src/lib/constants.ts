import type { ServiceType } from '@/types/database'

export const SERVICE_TYPES: Record<ServiceType, { label: string; icon: string; emoji: string }> = {
  micro_tour: { label: 'Micro-Tour 15 min', icon: 'MapPin', emoji: '🗺️' },
  photo_session: { label: 'Sesion Fotos Express', icon: 'Camera', emoji: '📸' },
  language_assistant: { label: 'Asistente de Idioma', icon: 'Languages', emoji: '🗣️' },
  vip_access: { label: 'Reserva VIP / Skip-the-line', icon: 'Crown', emoji: '👑' },
  table_reservation: { label: 'Mesa con Vista', icon: 'UtensilsCrossed', emoji: '🍽️' },
}

export const SERVICE_TYPE_OPTIONS = Object.entries(SERVICE_TYPES).map(([value, { label }]) => ({
  value: value as ServiceType,
  label,
}))

export function getCommissionRate(amount: number): number {
  if (amount > 500) return 0.10
  if (amount >= 50) return 0.15
  return 0.20
}

export const CURRENCIES = ['USD', 'EUR', 'MXN', 'COP', 'ARS'] as const

export const LANGUAGES = [
  'Espanol', 'Ingles', 'Frances', 'Portugues', 'Aleman',
  'Italiano', 'Japones', 'Chino', 'Coreano', 'Arabe',
]
