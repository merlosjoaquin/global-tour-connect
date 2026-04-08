'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Star, X, MapPin, Search, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  DEFAULT_CENTER,
  DEFAULT_ZOOM,
  MOCK_MAP_HOSTS,
  MOCK_MAP_LANDMARKS,
  type MapHost,
  type MapLandmark,
} from '@/lib/map-data'
import { MOCK_SERVICES } from '@/lib/mock-data'
import { SERVICE_TYPES } from '@/lib/constants'

// --- Custom marker icons ---

function createHostIcon(host: MapHost): L.DivIcon {
  return L.divIcon({
    className: 'host-marker-wrapper',
    iconSize: [46, 46],
    iconAnchor: [23, 23],
    html: `
      <div class="host-marker">
        <img src="${host.avatar}" alt="${host.name}" />
        ${host.isOnline ? '<span class="online-dot"></span>' : ''}
      </div>
    `,
  })
}

function createLandmarkIcon(landmark: MapLandmark): L.DivIcon {
  return L.divIcon({
    className: 'landmark-marker-wrapper',
    iconSize: [56, 72],
    iconAnchor: [28, 72],
    html: `
      <div class="landmark-marker">
        <img src="${landmark.image}" alt="${landmark.name}" />
        <span class="landmark-label">${landmark.name}</span>
      </div>
    `,
  })
}

function createUserLocationIcon(): L.DivIcon {
  return L.divIcon({
    className: 'user-location-wrapper',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    html: `<div class="user-location-dot"><span class="pulse-ring"></span></div>`,
  })
}

// --- Fly to user location ---

function FlyToLocation({ coords }: { coords: [number, number] | null }) {
  const map = useMap()
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, DEFAULT_ZOOM, { duration: 1.2 })
    }
  }, [coords, map])
  return null
}

// --- Fly to search target ---

function FlyToTarget({ target }: { target: { lat: number; lng: number } | null }) {
  const map = useMap()
  useEffect(() => {
    if (target) {
      map.flyTo([target.lat, target.lng], 14, { duration: 1.2 })
    }
  }, [target, map])
  return null
}

// --- Nominatim result type ---

interface NominatimResult {
  place_id: number
  display_name: string
  lat: string
  lon: string
  name?: string
}

// --- Search results for services ---

interface ServiceSearchResult {
  id: string
  title: string
  address: string
  emoji: string
  latitude: number
  longitude: number
}

// --- Host bubble popup (positioned above marker) ---

function HostBubble({
  host,
  onClose,
}: {
  host: MapHost
  onClose: () => void
}) {
  const map = useMap()
  const bubbleRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null)

  const updatePosition = useCallback(() => {
    const point = map.latLngToContainerPoint([host.lat, host.lng])
    setPosition({ x: point.x, y: point.y })
  }, [map, host.lat, host.lng])

  // Update position on map move/zoom
  useEffect(() => {
    updatePosition()
    map.on('move', updatePosition)
    map.on('zoom', updatePosition)
    return () => {
      map.off('move', updatePosition)
      map.off('zoom', updatePosition)
    }
  }, [map, updatePosition])

  // Close on outside click
  useEffect(() => {
    const timer = setTimeout(() => {
      function handleClick(e: MouseEvent) {
        if (bubbleRef.current && !bubbleRef.current.contains(e.target as Node)) {
          onClose()
        }
      }
      document.addEventListener('click', handleClick)
      return () => document.removeEventListener('click', handleClick)
    }, 100)
    return () => clearTimeout(timer)
  }, [onClose])

  if (!position) return null

  // Bubble dimensions for positioning
  const bubbleWidth = 280
  const arrowHeight = 8
  const markerOffset = 28 // half of marker icon height (46/2 ~ 23) + some padding

  // Get map container size for edge clamping
  const container = map.getContainer()
  const containerWidth = container.clientWidth
  const containerHeight = container.clientHeight

  // Horizontal: center on marker, but clamp to screen edges with 8px padding
  let left = position.x - bubbleWidth / 2
  left = Math.max(8, Math.min(left, containerWidth - bubbleWidth - 8))

  // Arrow offset from bubble left edge (points to the marker)
  const arrowLeft = Math.max(16, Math.min(position.x - left, bubbleWidth - 16))

  // Vertical: position above marker
  // We don't know exact bubble height, so use bottom positioning
  const bottom = containerHeight - position.y + markerOffset + arrowHeight

  return (
    <div
      ref={bubbleRef}
      className="absolute z-[1000] animate-pop-in"
      style={{
        left: `${left}px`,
        bottom: `${bottom}px`,
        width: `${bubbleWidth}px`,
        pointerEvents: 'auto',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-4 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2.5 right-2.5 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Cerrar"
        >
          <X className="h-3.5 w-3.5 text-gray-500" />
        </button>

        {/* Host info */}
        <div className="flex items-center gap-2.5 mb-3 pr-6">
          <img
            src={host.avatar}
            alt={host.name}
            width={44}
            height={44}
            className="w-11 h-11 rounded-full border-2 shrink-0"
            style={{ borderColor: '#0f766e' }}
          />
          <div className="min-w-0">
            <h3 className="font-semibold text-sm text-gray-900 truncate">{host.name}</h3>
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium text-gray-700">{host.rating}</span>
              {host.isOnline && (
                <span className="ml-1.5 text-[11px] text-green-600 font-medium">En linea</span>
              )}
            </div>
          </div>
        </div>

        {/* Services — scrollable when 2+ */}
        <div className="space-y-1.5 mb-3 max-h-[120px] overflow-y-auto scrollbar-none">
          {host.services.map((svc) => (
            <Link
              key={svc.id}
              href={`/servicio/${svc.id}`}
              className="flex items-center justify-between py-1.5 px-2.5 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="text-xs text-gray-700 dark:text-gray-300 truncate mr-2">{svc.title}</span>
              <span className="text-xs font-semibold shrink-0" style={{ color: '#0f766e' }}>
                ${svc.price} {svc.currency}
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          href={`/servicio/${host.services[0]?.id || host.id}`}
          className="block w-full py-2 text-center text-sm font-semibold rounded-xl transition-colors"
          style={{ backgroundColor: '#0f766e', color: '#ffffff' }}
        >
          Ver perfil
        </Link>
      </div>

      {/* Triangle arrow pointing down */}
      <div
        className="absolute w-0 h-0"
        style={{
          left: `${arrowLeft}px`,
          bottom: '-7px',
          transform: 'translateX(-50%)',
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderTop: '8px solid white',
          filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.06))',
        }}
      />
    </div>
  )
}

// --- Category badge colors ---

const CATEGORY_COLORS: Record<string, string> = {
  monumento: 'bg-amber-100 text-amber-800',
  museo: 'bg-rose-100 text-rose-800',
  cultura: 'bg-purple-100 text-purple-800',
  parque: 'bg-green-100 text-green-800',
}

// --- Main Map Component ---

export default function MapView({ onOverlayChange }: { onOverlayChange?: (active: boolean) => void }) {
  const router = useRouter()
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null)
  const [mapCenter, setMapCenter] = useState<[number, number]>(DEFAULT_CENTER)
  const [selectedHost, setSelectedHost] = useState<MapHost | null>(null)
  const [selectedLandmark, setSelectedLandmark] = useState<MapLandmark | null>(null)
  const [activeFilter, setActiveFilter] = useState('Todos')
  const sheetRef = useRef<HTMLDivElement>(null)

  // Search state
  const [searchQuery, setSearchQuery] = useState('')
  const [serviceResults, setServiceResults] = useState<ServiceSearchResult[]>([])
  const [placeResults, setPlaceResults] = useState<NominatimResult[]>([])
  const [isSearchingPlaces, setIsSearchingPlaces] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [flyTarget, setFlyTarget] = useState<{ lat: number; lng: number } | null>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const nominatimTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const filters = ['Todos', 'Gastronomia', 'Tours', 'Cultura', 'Aventura', 'Bienestar']

  // Geolocation
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude]
          setUserCoords(coords)
          setMapCenter(coords)
        },
        () => {
          // Denied or error — use fallback
          setUserCoords(null)
          setMapCenter(DEFAULT_CENTER)
        },
        { enableHighAccuracy: true, timeout: 8000 }
      )
    }
  }, [])

  // Filter services locally when query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setServiceResults([])
      setPlaceResults([])
      setShowDropdown(false)
      return
    }

    const q = searchQuery.toLowerCase().trim()

    // Filter mock services
    const filtered = MOCK_SERVICES
      .filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.address.toLowerCase().includes(q)
      )
      .slice(0, 5)
      .map((s) => ({
        id: s.id,
        title: s.title,
        address: s.address,
        emoji: SERVICE_TYPES[s.type]?.emoji || '📍',
        latitude: s.latitude,
        longitude: s.longitude,
      }))

    setServiceResults(filtered)
    setShowDropdown(true)

    // Debounce Nominatim query
    if (nominatimTimeoutRef.current) {
      clearTimeout(nominatimTimeoutRef.current)
    }

    nominatimTimeoutRef.current = setTimeout(async () => {
      if (q.length < 2) {
        setPlaceResults([])
        return
      }

      setIsSearchingPlaces(true)
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5&accept-language=es`,
          {
            headers: { 'User-Agent': 'GlobalTourConnect/1.0' },
          }
        )
        if (res.ok) {
          const data: NominatimResult[] = await res.json()
          setPlaceResults(data)
        }
      } catch {
        // Silently fail — places section just won't show
      } finally {
        setIsSearchingPlaces(false)
      }
    }, 400)

    return () => {
      if (nominatimTimeoutRef.current) {
        clearTimeout(nominatimTimeoutRef.current)
      }
    }
  }, [searchQuery])

  // Prevent Leaflet from stealing events on the search container
  useEffect(() => {
    const el = searchContainerRef.current
    if (!el) return
    L.DomEvent.disableClickPropagation(el)
    L.DomEvent.disableScrollPropagation(el)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSelectService(service: ServiceSearchResult) {
    setShowDropdown(false)
    setSearchQuery('')
    setFlyTarget({ lat: service.latitude, lng: service.longitude })
    router.push(`/servicio/${service.id}`)
  }

  function handleSelectPlace(place: NominatimResult) {
    setShowDropdown(false)
    setSearchQuery('')
    const lat = parseFloat(place.lat)
    const lng = parseFloat(place.lon)
    setFlyTarget({ lat, lng })
  }

  // Close landmark sheet on outside tap (host bubble handles its own outside click)
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (sheetRef.current && !sheetRef.current.contains(e.target as Node)) {
        setSelectedLandmark(null)
        onOverlayChange?.(false)
      }
    }
    if (selectedLandmark) {
      const timer = setTimeout(() => {
        document.addEventListener('click', handleClick)
      }, 100)
      return () => {
        clearTimeout(timer)
        document.removeEventListener('click', handleClick)
      }
    }
  }, [selectedLandmark])

  function handleHostClick(host: MapHost) {
    setSelectedLandmark(null)
    setSelectedHost(host)
    onOverlayChange?.(true)
  }

  function handleLandmarkClick(landmark: MapLandmark) {
    setSelectedHost(null)
    setSelectedLandmark(landmark)
    onOverlayChange?.(true)
  }

  function closeSheet() {
    setSelectedLandmark(null)
    onOverlayChange?.(false)
  }

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={mapCenter}
        zoom={DEFAULT_ZOOM}
        className="w-full h-full"
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
        />

        <FlyToLocation coords={userCoords} />
        <FlyToTarget target={flyTarget} />

        {/* User location marker */}
        {userCoords && (
          <Marker position={userCoords} icon={createUserLocationIcon()} />
        )}

        {/* Host markers */}
        {MOCK_MAP_HOSTS.map((host) => (
          <Marker
            key={host.id}
            position={[host.lat, host.lng]}
            icon={createHostIcon(host)}
            eventHandlers={{ click: () => handleHostClick(host) }}
          />
        ))}

        {/* Landmark markers */}
        {MOCK_MAP_LANDMARKS.map((landmark) => (
          <Marker
            key={landmark.id}
            position={[landmark.lat, landmark.lng]}
            icon={createLandmarkIcon(landmark)}
            eventHandlers={{ click: () => handleLandmarkClick(landmark) }}
          />
        ))}

        {/* Host bubble popup (inside MapContainer to access useMap) */}
        {selectedHost && (
          <HostBubble host={selectedHost} onClose={() => { setSelectedHost(null); onOverlayChange?.(false) }} />
        )}
      </MapContainer>

      {/* Top overlay: search + filters */}
      <div className="absolute top-0 left-0 right-0 z-[1000] pointer-events-none px-4 pt-3">
        {/* Search bar */}
        <div
          className="pointer-events-auto"
          ref={searchContainerRef}
        >
          <div className="relative">
            <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md rounded-full px-4 py-3 shadow-lg">
              <Search className="h-5 w-5 shrink-0" style={{ color: '#0f766e' }} />
              <input
                type="text"
                placeholder="Buscar servicios, lugares..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (searchQuery.trim()) setShowDropdown(true)
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setShowDropdown(false)
                  }}
                  className="p-0.5 rounded-full hover:bg-gray-200 transition-colors"
                  aria-label="Limpiar busqueda"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              )}
            </div>

            {/* Search dropdown */}
            {showDropdown && (serviceResults.length > 0 || placeResults.length > 0 || isSearchingPlaces) && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 max-h-80 overflow-y-auto">
                {/* Services section */}
                {serviceResults.length > 0 && (
                  <div>
                    <div className="px-4 pt-3 pb-1.5">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Servicios
                      </span>
                    </div>
                    {serviceResults.map((svc) => (
                      <button
                        key={svc.id}
                        onClick={() => handleSelectService(svc)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                      >
                        <span className="text-lg shrink-0">{svc.emoji}</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">{svc.title}</p>
                          <p className="text-xs text-gray-500 truncate">{svc.address}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Divider between sections */}
                {serviceResults.length > 0 && (placeResults.length > 0 || isSearchingPlaces) && (
                  <div className="mx-4 border-t border-gray-100" />
                )}

                {/* Places section */}
                {(placeResults.length > 0 || isSearchingPlaces) && (
                  <div>
                    <div className="px-4 pt-3 pb-1.5 flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Lugares
                      </span>
                      {isSearchingPlaces && (
                        <Loader2 className="h-3 w-3 text-gray-400 animate-spin" />
                      )}
                    </div>
                    {placeResults.map((place) => (
                      <button
                        key={place.place_id}
                        onClick={() => handleSelectPlace(place)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                      >
                        <MapPin className="h-4 w-4 text-gray-400 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {place.name || place.display_name.split(',')[0]}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{place.display_name}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Bottom padding */}
                <div className="h-2" />
              </div>
            )}
          </div>
        </div>

        {/* Filter pills */}
        <div className="pointer-events-auto mt-3 -mx-4 px-4 overflow-x-auto scrollbar-none">
          <div className="flex gap-2 pb-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm ${
                  activeFilter === f
                    ? 'bg-teal-700 text-white shadow-md'
                    : 'bg-white/90 backdrop-blur-md text-gray-700 hover:bg-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Landmark bottom sheet */}
      {selectedLandmark && (
        <div
          className="absolute bottom-0 left-0 right-0 z-[1000] animate-slide-up"
          ref={sheetRef}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white rounded-t-3xl shadow-2xl overflow-hidden mx-0">
            {/* Image */}
            <div className="relative h-40 w-full">
              <img
                src={selectedLandmark.image}
                alt={selectedLandmark.name}
                width={400}
                height={160}
                className="w-full h-full object-cover"
              />
              {/* Close button over image */}
              <button
                onClick={closeSheet}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4 text-gray-700" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 pb-6">
              {/* Handle bar */}
              <div className="flex justify-center mb-3 -mt-1">
                <div className="w-10 h-1 bg-gray-300 rounded-full" />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-lg text-gray-900">{selectedLandmark.name}</h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    CATEGORY_COLORS[selectedLandmark.category] || 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {selectedLandmark.category.charAt(0).toUpperCase() + selectedLandmark.category.slice(1)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                {selectedLandmark.description}
              </p>

              <button
                className="block w-full py-3 text-center text-white font-semibold rounded-2xl transition-colors"
                style={{ backgroundColor: '#0f766e' }}
              >
                Explorar servicios cerca
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
