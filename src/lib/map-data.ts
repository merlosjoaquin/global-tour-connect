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

// Default fallback: San Rafael, Mendoza
export const DEFAULT_CENTER: [number, number] = [-34.6176, -68.3301]
export const DEFAULT_ZOOM = 15

// Mock hosts in San Rafael, Mendoza
export const MOCK_MAP_HOSTS: MapHost[] = [
  {
    id: 'host-map-1',
    name: 'Lucia Fernandez',
    avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Lucia',
    lat: -34.6150,
    lng: -68.3280,
    rating: 4.8,
    services: [
      { id: 'svc-1', title: 'Tour Canon del Atuel en kayak', type: 'micro_tour', price: 25, currency: 'USD' },
      { id: 'svc-2', title: 'Degustacion de vinos en bodega', type: 'table_reservation', price: 30, currency: 'USD' },
    ],
    isOnline: true,
  },
  {
    id: 'host-map-2',
    name: 'Martin Rodriguez',
    avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Martin',
    lat: -34.6200,
    lng: -68.3350,
    rating: 4.5,
    services: [
      { id: 'svc-3', title: 'Cabalgata por la montana', type: 'micro_tour', price: 35, currency: 'USD' },
    ],
    isOnline: true,
  },
  {
    id: 'host-map-3',
    name: 'Camila Lopez',
    avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Camila',
    lat: -34.6130,
    lng: -68.3330,
    rating: 4.9,
    services: [
      { id: 'svc-4', title: 'Asado criollo con vista a los vinedos', type: 'table_reservation', price: 20, currency: 'USD' },
      { id: 'svc-5', title: 'Tour gastronomico por San Rafael', type: 'micro_tour', price: 18, currency: 'USD' },
    ],
    isOnline: false,
  },
  {
    id: 'host-map-4',
    name: 'Diego Alvarez',
    avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Diego',
    lat: -34.6190,
    lng: -68.3260,
    rating: 4.3,
    services: [
      { id: 'svc-6', title: 'Guia bilingue espanol-ingles', type: 'language_assistant', price: 10, currency: 'USD' },
      { id: 'svc-7', title: 'Traslado al Canon del Atuel', type: 'micro_tour', price: 15, currency: 'USD' },
    ],
    isOnline: true,
  },
  {
    id: 'host-map-5',
    name: 'Valentina Ruiz',
    avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Valentina',
    lat: -34.6160,
    lng: -68.3240,
    rating: 4.7,
    services: [
      { id: 'svc-8', title: 'Sesion de fotos en vinedos', type: 'photo_session', price: 30, currency: 'USD' },
      { id: 'svc-9', title: 'Trekking Valle Grande', type: 'micro_tour', price: 22, currency: 'USD' },
    ],
    isOnline: true,
  },
  {
    id: 'host-map-6',
    name: 'Santiago Perez',
    avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Santiago',
    lat: -34.6210,
    lng: -68.3310,
    rating: 4.6,
    services: [
      { id: 'svc-10', title: 'Rafting en el Rio Atuel', type: 'vip_access', price: 40, currency: 'USD' },
    ],
    isOnline: true,
  },
  {
    id: 'host-map-7',
    name: 'Isabella Torres',
    avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Isabella',
    lat: -34.6145,
    lng: -68.3370,
    rating: 4.4,
    services: [
      { id: 'svc-11', title: 'Clase de cocina mendocina', type: 'table_reservation', price: 15, currency: 'USD' },
      { id: 'svc-12', title: 'Tour nocturno de estrellas', type: 'micro_tour', price: 20, currency: 'USD' },
    ],
    isOnline: true,
  },
  {
    id: 'host-map-8',
    name: 'Mateo Garcia',
    avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Mateo',
    lat: -34.6175,
    lng: -68.3220,
    rating: 4.2,
    services: [
      { id: 'svc-13', title: 'Alquiler de bici + ruta de bodegas', type: 'micro_tour', price: 12, currency: 'USD' },
      { id: 'svc-14', title: 'Tirolesa en Canon del Atuel', type: 'vip_access', price: 28, currency: 'USD' },
    ],
    isOnline: false,
  },
]

// Real San Rafael, Mendoza landmarks
export const MOCK_MAP_LANDMARKS: MapLandmark[] = [
  {
    id: 'landmark-1',
    name: 'Plaza San Martin',
    description: 'Corazon de San Rafael. Plaza historica rodeada de arboles, la catedral y edificios coloniales. Punto de encuentro de la ciudad.',
    image: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?w=400&h=300&fit=crop',
    lat: -34.61312740504701,
    lng: -68.3306195811649,
    category: 'monumento',
  },
  {
    id: 'landmark-2',
    name: 'Catedral San Rafael Arcangel',
    description: 'Catedral principal de San Rafael, de estilo neoclasico. Ubicada frente a la Plaza San Martin.',
    image: 'https://images.unsplash.com/photo-1510674485131-dc88d96369b4?w=400&h=300&fit=crop',
    lat: -34.61232669764184,
    lng: -68.32988253499283,
    category: 'cultura',
  },
  {
    id: 'landmark-3',
    name: 'Parque Mariano Moreno',
    description: 'Gran espacio verde de San Rafael con lago artificial, senderos y areas recreativas. Ideal para paseos y picnics.',
    image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=400&h=300&fit=crop',
    lat: -34.64909995424117,
    lng: -68.36708401641373,
    category: 'parque',
  },
  {
    id: 'landmark-4',
    name: 'Museo de Historia Natural',
    description: 'Museo con colecciones de paleontologia, mineralogia y fauna regional del sur mendocino.',
    image: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=400&h=300&fit=crop',
    lat: -34.64547824975054,
    lng: -68.3750315650564,
    category: 'museo',
  },
  {
    id: 'landmark-5',
    name: 'Plaza Francia',
    description: 'Plaza emblematica de San Rafael con fuente central, bancos bajo arboles anejados y ambiente tranquilo. Punto clasico de encuentro.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop',
    lat: -34.61071266499157,
    lng: -68.34757021385803,
    category: 'monumento',
  },
  {
    id: 'landmark-6',
    name: 'Parque Central',
    description: 'El parque mas grande de San Rafael. Espacios verdes, juegos, lago y senderos arbolados. Ideal para familia y deporte.',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=300&fit=crop',
    lat: -34.613064179878776,
    lng: -68.3510099896663,
    category: 'parque',
  },
  {
    id: 'landmark-7',
    name: 'Parque de los Ninos',
    description: 'Espacio recreativo para familias con juegos infantiles, areas verdes y circuitos para bicicletas. Favorito de los sanrafaelinos.',
    image: 'https://images.unsplash.com/photo-1564429238961-bf8f8be6e3c4?w=400&h=300&fit=crop',
    lat: -34.610637120788084,
    lng: -68.34836850632267,
    category: 'parque',
  },
]
