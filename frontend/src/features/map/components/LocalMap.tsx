import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { brejoGrandeCoordinates, brejoGrandeBounds, MAP_ZOOM } from '../services/mapService';
import { mockVendedores } from '../services/mockVendedores';
import { VendedorMarker } from './VendedorMarker';
import { EventMarker } from './EventMarker';
import { RecenterButton } from './RecenterButton';
import { SatelliteToggle } from './SatelliteToggle';
import { useEffect, useState } from 'react';
import { useEvents } from '@/features/events';

type LocalMapProps = {
  activeCategory?: string;
};

// Componente para garantir a centralização no centro urbano toda vez que o mapa for aberto/montado
function MapInitializer({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, MAP_ZOOM.default);
  }, [map, center]);
  return null;
}

// Lógica de flyTo fluido quando uma categoria for clicada
function MapCentering({
  points,
  defaultCenter,
}: {
  points: { lat: number; lng: number }[];
  defaultCenter: [number, number];
}) {
  const map = useMap();
  useEffect(() => {
    if (points.length > 0) {
      const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
      map.flyToBounds(bounds, {
        animate: true,
        duration: 1.5,
        padding: [50, 50],
        maxZoom: MAP_ZOOM.default + 1,
      });
    } else {
      map.flyTo(defaultCenter, MAP_ZOOM.default, { animate: true, duration: 1.5 });
    }
  }, [points, map, defaultCenter]);
  return null;
}

export function LocalMap({
  activeCategory = 'todos',
}: LocalMapProps) {
  const [isSatellite, setIsSatellite] = useState(false);
  const events = useEvents();

  // Coordenadas de Brejo Grande do Araguaia como centro padrão
  const defaultCenter: [number, number] = [
    brejoGrandeCoordinates.latitude,
    brejoGrandeCoordinates.longitude,
  ];

  // Determinar se exibimos vendedores e/ou eventos baseados no filtro ativo
  const showSellers = activeCategory === 'todos' || activeCategory !== 'eventos';
  const showEvents = activeCategory === 'todos' || activeCategory === 'eventos';

  // Filtrar vendedores pela categoria ativa (se não for o filtro exclusivo de eventos)
  const filteredVendedores =
    showSellers
      ? activeCategory === 'todos'
        ? mockVendedores
        : mockVendedores.filter((v) => v.categoria.toLowerCase() === activeCategory)
      : [];

  // Filtrar eventos com coordenadas válidas
  const validEvents = showEvents
    ? events.filter((e) => e.latitude !== undefined && e.longitude !== undefined)
    : [];

  // Pontos ativos para recentralizar o mapa
  const activePoints = [
    ...filteredVendedores.map((v) => ({ lat: v.lat, lng: v.lng })),
    ...validEvents.map((e) => ({ lat: e.latitude!, lng: e.longitude! })),
  ];

  return (
    <div className="w-full flex-1 h-full bg-muted/20 rounded-2xl overflow-hidden shadow-inner relative">
      {/* Vignette effect (sombra interna) via Tailwind */}
      <div className="pointer-events-none absolute inset-0 z-[2000] shadow-[inset_0_0_20px_rgba(0,0,0,0.15)] rounded-2xl"></div>
      
      <MapContainer
        center={defaultCenter}
        zoom={MAP_ZOOM.default}
        minZoom={MAP_ZOOM.min}
        maxZoom={MAP_ZOOM.max}
        maxBounds={brejoGrandeBounds}
        maxBoundsViscosity={1.0}
        scrollWheelZoom
        zoomControl={false}
        attributionControl={false}
        className={`w-full h-full z-0 ${!isSatellite ? 'map-tiles-customizada' : ''}`}
      >
        {/* Camada Dinâmica de Tiles (Satélite ou Offline) */}
        {isSatellite ? (
          <TileLayer
            key="satellite"
            attribution='&copy; <a href="https://www.esri.com/">Esri</a> &mdash; Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            minZoom={MAP_ZOOM.min}
            maxZoom={MAP_ZOOM.max}
            bounds={brejoGrandeBounds}
          />
        ) : (
          <TileLayer
            key="offline"
            attribution='&copy; Mapa local offline &mdash; Raízes do Araguaia'
            url="/tiles/{z}/{x}/{y}.png"
            minZoom={MAP_ZOOM.min}
            maxZoom={MAP_ZOOM.max}
            bounds={brejoGrandeBounds}
          />
        )}

        {/* Forçar recentralização na abertura da aba */}
        <MapInitializer center={defaultCenter} />

        {/* Navegação Fluida entre filtros */}
        <MapCentering points={activePoints} defaultCenter={defaultCenter} />

        {/* Renderizando vendedores filtrados */}
        {filteredVendedores.map((vendedor) => (
          <VendedorMarker key={vendedor.id} vendedor={vendedor} />
        ))}

        {/* Renderizando eventos comunitários cadastrados */}
        {validEvents.map((event) => (
          <EventMarker key={event.id} event={event} />
        ))}

        {/* Botão de recentralizar */}
        <RecenterButton />

        {/* Botão de satélite */}
        <SatelliteToggle isSatellite={isSatellite} onToggle={() => setIsSatellite(!isSatellite)} />
      </MapContainer>
    </div>
  );
}



