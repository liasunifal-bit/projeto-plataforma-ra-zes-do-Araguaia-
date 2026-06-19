import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { brejoGrandeCoordinates, brejoGrandeBounds, MAP_ZOOM } from '../../map/services/mapService'
import { useState, useEffect } from 'react'
import { MapPin, RefreshCw } from 'lucide-react'

// Ícones padrão do Leaflet corrigidos para o bundler
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

const customMarkerIcon = new L.Icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

type LocationPickerProps = {
  latitude?: number
  longitude?: number
  onChange: (lat: number, lng: number) => void
}

// Auxiliar para detectar cliques no mapa e repassar coordenadas
function MapClickEvents({ onChange }: { onChange: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onChange(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

// Auxiliar para centralizar a câmera no marcador ativo quando ele muda por clique externo
function MapController({ position }: { position: [number, number] | null }) {
  const map = useMap()
  useEffect(() => {
    if (position) {
      map.panTo(position)
    }
  }, [position, map])
  return null
}

export function LocationPicker({ latitude, longitude, onChange }: LocationPickerProps) {
  const [isSatellite, setIsSatellite] = useState(false)

  const defaultCenter: [number, number] = [
    brejoGrandeCoordinates.latitude,
    brejoGrandeCoordinates.longitude,
  ]

  const markerPosition: [number, number] | null =
    latitude !== undefined && longitude !== undefined ? [latitude, longitude] : null

  // Restaura para a posição padrão de Brejo Grande
  const handleResetToCenter = () => {
    onChange(defaultCenter[0], defaultCenter[1])
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs font-bold text-stone-600">
        <label className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4 text-emerald-600" />
          <span>Localização no Mapa</span>
        </label>
        <button
          type="button"
          onClick={handleResetToCenter}
          className="text-emerald-600 hover:text-emerald-700 active:scale-95 flex items-center gap-1"
        >
          <RefreshCw className="h-3 w-3" />
          Centralizar em Brejo Grande
        </button>
      </div>

      <div className="relative h-60 w-full overflow-hidden rounded-2xl border border-stone-200 shadow-inner">
        {/* Sombra interna para profundidade visual */}
        <div className="pointer-events-none absolute inset-0 z-[2000] shadow-[inset_0_0_15px_rgba(0,0,0,0.15)] rounded-2xl"></div>

        <MapContainer
          center={defaultCenter}
          zoom={MAP_ZOOM.default}
          minZoom={MAP_ZOOM.min}
          maxZoom={MAP_ZOOM.max}
          maxBounds={brejoGrandeBounds}
          maxBoundsViscosity={1.0}
          zoomControl={false}
          attributionControl={false}
          className="h-full w-full z-0"
        >
          {isSatellite ? (
            <TileLayer
              key="satellite"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              minZoom={MAP_ZOOM.min}
              maxZoom={MAP_ZOOM.max}
              bounds={brejoGrandeBounds}
            />
          ) : (
            <TileLayer
              key="offline"
              url="/tiles/{z}/{x}/{y}.png"
              minZoom={MAP_ZOOM.min}
              maxZoom={MAP_ZOOM.max}
              bounds={brejoGrandeBounds}
            />
          )}

          {/* Clique no mapa */}
          <MapClickEvents onChange={onChange} />

          {/* Controlador de Câmera */}
          <MapController position={markerPosition} />

          {/* Marcador selecionado */}
          {markerPosition && <Marker position={markerPosition} icon={customMarkerIcon} />}
        </MapContainer>

        {/* Toggle Satélite/Mapa */}
        <button
          type="button"
          onClick={() => setIsSatellite(!isSatellite)}
          className="absolute bottom-3 right-3 z-[1000] rounded-xl bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-stone-700 shadow-md border border-stone-100 hover:bg-stone-50 active:scale-95 transition-all"
        >
          {isSatellite ? 'Mapa' : 'Satélite'}
        </button>
      </div>

      <p className="text-[10px] font-semibold text-stone-500 leading-normal">
        💡 Clique em qualquer ponto no mapa acima para definir as coordenadas exatas da feira ou evento.
      </p>
    </div>
  )
}
