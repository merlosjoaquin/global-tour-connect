'use client'

import { useState, useEffect, useRef } from 'react'
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

  // Close sheet on outside tap
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (sheetRef.current && !sheetRef.current.contains(e.target as Node)) {
        setSelectedHost(null)
        setSelectedLandmark(null)
      }
    }
    if (selectedHost || selectedLandmark) {
      // Small delay so the click that opened the sheet doesn't immediately close it
      const timer = setTimeout(() => {
        document.addEventListener('click', handleClick)
      }, 100)
      return () => {
        clearTimeout(timer)
        document.removeEventListener('click', handleClick)
      }
    }
  }, [selectedHost, selectedLandmark])

  function handleHostClick(host: MapHost) {
    setSelectedLandmark(null)
    setSelectedHost(host)
  }

  function handleLandmarkClick(landmark: MapLandmark) {
    setSelectedHost(null)
    setSelectedLandmark(landmark)
  }

  function closeSheet() {
    setSelectedHost(null)
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

      {/* Host bottom sheet */}
      {selectedHost && (
        <div
          className="absolute bottom-0 left-0 right-0 z-[1000] animate-slide-up"
          ref={sheetRef}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white rounded-t-3xl shadow-2xl p-5 pb-6 mx-0">
            {/* Handle bar */}
            <div className="flex justify-center mb-3">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* Close button */}
            <button
              onClick={closeSheet}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Cerrar"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>

            {/* Host info */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={selectedHost.avatar}
                alt={selectedHost.name}
                width={56}
                height={56}
                className="w-14 h-14 rounded-full border-2"
                style={{ borderColor: '#0f766e' }}
              />
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{selectedHost.name}</h3>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-700">{selectedHost.rating}</span>
                  {selectedHost.isOnline && (
                    <span className="ml-2 text-xs text-green-600 font-medium">En linea</span>
                  )}
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-2 mb-4">
              {selectedHost.services.map((svc) => (
                <div
                  key={svc.id}
                  className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-xl"
                >
                  <span className="text-sm text-gray-700">{svc.title}</span>
                  <span className="text-sm font-semibold" style={{ color: '#0f766e' }}>
                    ${svc.price} {svc.currency}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href={`/servicio/${selectedHost.services[0]?.id || selectedHost.id}`}
              className="block w-full py-3 text-center text-white font-semibold rounded-2xl transition-colors"
              style={{ backgroundColor: '#0f766e' }}
            >
              Ver perfil
            </Link>
          </div>
        </div>
      )}

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
