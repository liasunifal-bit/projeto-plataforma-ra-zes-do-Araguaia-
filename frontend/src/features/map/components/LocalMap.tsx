import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { brejoGrandeCoordinates, brejoGrandeBounds, MAP_ZOOM } from '../services/mapService';
import { mockSellers } from '../../sellers/mocks';
import { SellerMarker } from './SellerMarker';
import { RecenterButton } from './RecenterButton';
import { FullscreenButton } from './FullscreenButton';
import { useEffect } from 'react';

type LocalMapProps = {
  activeCategory?: string;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
};

// Componente para garantir a centralização no centro urbano toda vez que o mapa for aberto/montado
function MapInitializer({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, MAP_ZOOM.default);
  }, [map, center]);
  return null;
}

export function LocalMap({
  activeCategory = 'todos',
  isFullscreen = false,
  onToggleFullscreen,
}: LocalMapProps) {
  // Coordenadas de Brejo Grande do Araguaia como centro padrão
  const defaultCenter: [number, number] = [
    brejoGrandeCoordinates.latitude,
    brejoGrandeCoordinates.longitude,
  ];

  // Filtrar sellers pela categoria ativa
  const filteredSellers =
    activeCategory === 'todos'
      ? mockSellers
      : mockSellers.filter((seller) => seller.category === activeCategory);

  return (
    <div className="w-full flex-1 h-full bg-muted/20 rounded-2xl overflow-hidden shadow-inner relative">
      <MapContainer
        center={defaultCenter}
        zoom={MAP_ZOOM.default}
        minZoom={MAP_ZOOM.min}
        maxZoom={MAP_ZOOM.max}
        maxBounds={brejoGrandeBounds}
        maxBoundsViscosity={1.0}
        scrollWheelZoom
        className="w-full h-full z-0"
      >
        {/* Camada Estática de Tiles Offline (Self-Hosted via public/tiles/) */}
        <TileLayer
          attribution='&copy; Mapa local offline &mdash; Raízes do Araguaia'
          url="/tiles/{z}/{x}/{y}.png"
          minZoom={MAP_ZOOM.min}
          maxZoom={MAP_ZOOM.max}
          bounds={brejoGrandeBounds}
        />

        {/* Forçar recentralização na abertura da aba */}
        <MapInitializer center={defaultCenter} />

        {/* Renderizando sellers filtrados */}
        {filteredSellers.map((seller) => (
          <SellerMarker key={seller.id} seller={seller} />
        ))}

        {/* Botão de recentralizar */}
        <RecenterButton />

        {/* Botão de tela cheia */}
        {onToggleFullscreen && (
          <FullscreenButton isFullscreen={isFullscreen} onToggle={onToggleFullscreen} />
        )}
      </MapContainer>
    </div>
  );
}


