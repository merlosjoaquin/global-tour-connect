import { create } from 'zustand'
import type { Profile, Service, Booking } from '@/types/database'

interface AppState {
  // Auth
  user: Profile | null
  setUser: (user: Profile | null) => void

  // Role
  activeRole: 'explorer' | 'host'
  setActiveRole: (role: 'explorer' | 'host') => void

  // Map
  userLocation: { lat: number; lng: number } | null
  setUserLocation: (loc: { lat: number; lng: number } | null) => void

  // Services cache
  services: Service[]
  setServices: (services: Service[]) => void

  // Bookings cache
  bookings: Booking[]
  setBookings: (bookings: Booking[]) => void
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  activeRole: 'explorer',
  setActiveRole: (activeRole) => set({ activeRole }),

  userLocation: null,
  setUserLocation: (userLocation) => set({ userLocation }),

  services: [],
  setServices: (services) => set({ services }),

  bookings: [],
  setBookings: (bookings) => set({ bookings }),
}))
