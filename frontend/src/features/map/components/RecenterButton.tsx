import { useMap } from 'react-leaflet';
import { LocateFixed } from 'lucide-react';
import { useGeolocation } from '../hooks/useGeolocation';
import { brejoGrandeCoordinates, brejoGrandeBounds, MAP_ZOOM } from '../services/mapService';

export function RecenterButton() {
  const map = useMap();
  const { latitude, longitude } = useGeolocation();

  const handleRecenter = () => {
    // Padrão: coordenadas centrais de Brejo Grande
    let lat: number = brejoGrandeCoordinates.latitude;
    let lng: number = brejoGrandeCoordinates.longitude;

    // Se a geolocalização estiver disponível, valida se o usuário está na área do mapa offline (15km x 15km)
    if (latitude !== null && longitude !== null) {
      const [sw, ne] = brejoGrandeBounds;
      const isWithinBounds =
        latitude >= sw[0] &&
        latitude <= ne[0] &&
        longitude >= sw[1] &&
        longitude <= ne[1];

      if (isWithinBounds) {
        lat = latitude;
        lng = longitude;
      }
    }

    map.flyTo([lat, lng], MAP_ZOOM.default, { duration: 1.2 });
  };

  return (
    <button
      type="button"
      onClick={handleRecenter}
      title="Centralizar no mapa"
      className="absolute bottom-20 md:bottom-24 right-4 md:right-6 z-[1000] w-12 h-12 md:w-14 md:h-14 bg-white rounded-full shadow-lg border border-border/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-500 active:rotate-180"
    >
      <LocateFixed size={20} strokeWidth={2.5} />
    </button>
  );
}

