'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Star, X, MapPin } from 'lucide-react'
import Link from 'next/link'
import {
  DEFAULT_CENTER,
  DEFAULT_ZOOM,
  MOCK_MAP_HOSTS,
  MOCK_MAP_LANDMARKS,
  type MapHost,
  type MapLandmark,
} from '@/lib/map-data'

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
      <div className="bg-white rounded-2xl shadow-xl p-4 relative">
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

        {/* Services */}
        <div className="space-y-1.5 mb-3">
          {host.services.map((svc) => (
            <div
              key={svc.id}
              className="flex items-center justify-between py-1.5 px-2.5 bg-gray-50 rounded-lg"
            >
              <span className="text-xs text-gray-700 truncate mr-2">{svc.title}</span>
              <span className="text-xs font-semibold shrink-0" style={{ color: '#0f766e' }}>
                ${svc.price} {svc.currency}
              </span>
            </div>
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

export default function MapView() {
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null)
  const [mapCenter, setMapCenter] = useState<[number, number]>(DEFAULT_CENTER)
  const [selectedHost, setSelectedHost] = useState<MapHost | null>(null)
  const [selectedLandmark, setSelectedLandmark] = useState<MapLandmark | null>(null)
  const [activeFilter, setActiveFilter] = useState('Todos')
  const sheetRef = useRef<HTMLDivElement>(null)

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

  // Close landmark sheet on outside tap (host bubble handles its own outside click)
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (sheetRef.current && !sheetRef.current.contains(e.target as Node)) {
        setSelectedLandmark(null)
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
  }

  function handleLandmarkClick(landmark: MapLandmark) {
    setSelectedHost(null)
    setSelectedLandmark(landmark)
  }

  function closeSheet() {
    setSelectedLandmark(null)
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
          <HostBubble host={selectedHost} onClose={() => setSelectedHost(null)} />
        )}
      </MapContainer>

      {/* Top overlay: search + filters */}
      <div className="absolute top-0 left-0 right-0 z-[1000] pointer-events-none px-4 pt-3">
        {/* Search bar */}
        <div className="pointer-events-auto">
          <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md rounded-full px-4 py-3 shadow-lg">
            <MapPin className="h-5 w-5 shrink-0" style={{ color: '#0f766e' }} />
            <input
              type="text"
              placeholder="Buscar servicios, lugares..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
              readOnly
            />
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
