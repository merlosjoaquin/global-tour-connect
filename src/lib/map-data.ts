export interface MapHost {
  id: string
  name: string
  avatar: string
  lat: number
  lng: number
  rating: number
  services: {
    id: string
    title: string
    type: string
    price: number
    currency: string
  }[]
  isOnline: boolean
}

export interface MapLandmark {
  id: string
  name: string
  description: string
  image: string
  lat: number
  lng: number
  category: string
}

// Default fallback: Buenos Aires
export const DEFAULT_CENTER: [number, number] = [-34.6037, -58.3816]
export const DEFAULT_ZOOM = 15

// Mock hosts near Buenos Aires center
export const MOCK_MAP_HOSTS: MapHost[] = [
  {
    id: 'host-map-1',
    name: 'Lucia Fernandez',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Lucia',
    lat: -34.6020,
    lng: -58.3790,
    rating: 4.8,
    services: [
      { id: 'svc-1', title: 'Tour por San Telmo', type: 'micro_tour', price: 15, currency: 'USD' },
      { id: 'svc-2', title: 'Sesion fotos en La Boca', type: 'photo_session', price: 25, currency: 'USD' },
    ],
    isOnline: true,
  },
  {
    id: 'host-map-2',
    name: 'Martin Rodriguez',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Martin',
    lat: -34.6055,
    lng: -58.3750,
    rating: 4.5,
    services: [
      { id: 'svc-3', title: 'Clase de tango express', type: 'vip_access', price: 20, currency: 'USD' },
    ],
    isOnline: true,
  },
  {
    id: 'host-map-3',
    name: 'Camila Lopez',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Camila',
    lat: -34.6000,
    lng: -58.3860,
    rating: 4.9,
    services: [
      { id: 'svc-4', title: 'Asado argentino autentico', type: 'table_reservation', price: 35, currency: 'USD' },
      { id: 'svc-5', title: 'Tour gastronomico Palermo', type: 'micro_tour', price: 18, currency: 'USD' },
    ],
    isOnline: false,
  },
  {
    id: 'host-map-4',
    name: 'Diego Alvarez',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Diego',
    lat: -34.6070,
    lng: -58.3880,
    rating: 4.3,
    services: [
      { id: 'svc-6', title: 'Traductor espanol-ingles', type: 'language_assistant', price: 10, currency: 'USD' },
    ],
    isOnline: true,
  },
  {
    id: 'host-map-5',
    name: 'Valentina Ruiz',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Valentina',
    lat: -34.5990,
    lng: -58.3770,
    rating: 4.7,
    services: [
      { id: 'svc-7', title: 'Fotos profesionales en Puerto Madero', type: 'photo_session', price: 30, currency: 'USD' },
      { id: 'svc-8', title: 'Recorrido nocturno Recoleta', type: 'micro_tour', price: 22, currency: 'USD' },
    ],
    isOnline: true,
  },
  {
    id: 'host-map-6',
    name: 'Santiago Perez',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Santiago',
    lat: -34.6050,
    lng: -58.3920,
    rating: 4.6,
    services: [
      { id: 'svc-9', title: 'Skip-the-line Teatro Colon', type: 'vip_access', price: 40, currency: 'USD' },
    ],
    isOnline: false,
  },
  {
    id: 'host-map-7',
    name: 'Isabella Torres',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Isabella',
    lat: -34.6015,
    lng: -58.3700,
    rating: 4.4,
    services: [
      { id: 'svc-10', title: 'Cafe con historia portena', type: 'table_reservation', price: 12, currency: 'USD' },
    ],
    isOnline: true,
  },
  {
    id: 'host-map-8',
    name: 'Mateo Garcia',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Mateo',
    lat: -34.6080,
    lng: -58.3800,
    rating: 4.2,
    services: [
      { id: 'svc-11', title: 'Tour arte urbano Palermo', type: 'micro_tour', price: 15, currency: 'USD' },
      { id: 'svc-12', title: 'Interprete para negocios', type: 'language_assistant', price: 25, currency: 'USD' },
    ],
    isOnline: true,
  },
]

// Real Buenos Aires landmarks
export const MOCK_MAP_LANDMARKS: MapLandmark[] = [
  {
    id: 'landmark-1',
    name: 'Obelisco',
    description: 'Icono de Buenos Aires, ubicado en la interseccion de Av. 9 de Julio y Corrientes. Construido en 1936.',
    image: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=400&h=300&fit=crop',
    lat: -34.6037,
    lng: -58.3816,
    category: 'monumento',
  },
  {
    id: 'landmark-2',
    name: 'Casa Rosada',
    description: 'Sede del gobierno argentino y museo historico. Su iconica fachada rosa es simbolo nacional.',
    image: 'https://images.unsplash.com/photo-1588029742375-3f6b6bc64f06?w=400&h=300&fit=crop',
    lat: -34.6083,
    lng: -58.3712,
    category: 'museo',
  },
  {
    id: 'landmark-3',
    name: 'Teatro Colon',
    description: 'Uno de los teatros de opera mas importantes del mundo. Acustica excepcional y arquitectura majestuosa.',
    image: 'https://images.unsplash.com/photo-1580893246395-52aead8960dc?w=400&h=300&fit=crop',
    lat: -34.6011,
    lng: -58.3831,
    category: 'cultura',
  },
  {
    id: 'landmark-4',
    name: 'Jardin Japones',
    description: 'El jardin japones mas grande fuera de Japon. Puentes, koi, bonsais y ceremonia del te.',
    image: 'https://images.unsplash.com/photo-1528164344885-47b1492bc39a?w=400&h=300&fit=crop',
    lat: -34.5783,
    lng: -58.4101,
    category: 'parque',
  },
]
