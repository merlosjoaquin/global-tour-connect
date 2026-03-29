export type ServiceType =
  | 'micro_tour'
  | 'photo_session'
  | 'language_assistant'
  | 'vip_access'
  | 'table_reservation'

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'

export interface Profile {
  id: string
  full_name: string
  avatar_url: string | null
  bio: string | null
  languages: string[]
  city: string | null
  country: string | null
  is_host: boolean
  is_explorer: boolean
  rating_avg: number
  total_reviews: number
  badges: string[]
  created_at: string
}

export interface Service {
  id: string
  host_id: string
  type: ServiceType
  title: string
  description: string
  price: number
  currency: string
  duration_minutes: number
  latitude: number
  longitude: number
  address: string
  photos: string[]
  is_active: boolean
  rating_avg: number
  total_bookings: number
  created_at: string
  // Joined
  host?: Profile
}

export interface Booking {
  id: string
  service_id: string
  explorer_id: string
  host_id: string
  status: BookingStatus
  scheduled_at: string
  total_price: number
  commission_rate: number
  commission_amount: number
  stripe_payment_intent_id: string | null
  created_at: string
  // Joined
  service?: Service
  explorer?: Profile
  host?: Profile
}

export interface Review {
  id: string
  booking_id: string
  reviewer_id: string
  reviewee_id: string
  rating: number
  comment: string
  photos: string[]
  created_at: string
  // Joined
  reviewer?: Profile
}

export interface Message {
  id: string
  booking_id: string
  sender_id: string
  content: string
  read: boolean
  created_at: string
  // Joined
  sender?: Profile
}

// Supabase generated types placeholder
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Partial<Profile> & { id: string }
        Update: Partial<Profile>
        Relationships: []
      }
      services: {
        Row: Service
        Insert: Omit<Service, 'id' | 'created_at' | 'rating_avg' | 'total_bookings'>
        Update: Partial<Service>
        Relationships: []
      }
      bookings: {
        Row: Booking
        Insert: Omit<Booking, 'id' | 'created_at'>
        Update: Partial<Booking>
        Relationships: []
      }
      reviews: {
        Row: Review
        Insert: Omit<Review, 'id' | 'created_at'>
        Update: Partial<Review>
        Relationships: []
      }
      messages: {
        Row: Message
        Insert: Omit<Message, 'id' | 'created_at'>
        Update: Partial<Message>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      service_type: ServiceType
      booking_status: BookingStatus
    }
    CompositeTypes: Record<string, never>
  }
}
