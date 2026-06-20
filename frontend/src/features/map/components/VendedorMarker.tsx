import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { MapPin } from 'lucide-react';
import type { Vendedor } from '../services/mockVendedores';

const CATEGORY_COLORS: Record<string, string> = {
  COMIDA: '#E8732E',
  ARTESANATO: '#8B4513',
  PEIXE: '#2F9E8F',
  SERVICOS: '#1E5F8B',
};

function createCategoryIcon(categoria: string) {
  const color = CATEGORY_COLORS[categoria] ?? '#2D5A27';
  const svgMarkup = renderToStaticMarkup(
    <div className="relative flex items-center justify-center w-[30px] h-[42px]">
      <svg width="30" height="42" viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg" className="absolute z-10 drop-shadow-md">
        <path
          d="M15 0C6.716 0 0 6.716 0 15c0 10.5 15 27 15 27s15-16.5 15-27C30 6.716 23.284 0 15 0z"
          fill={color}
        />
        <circle cx="15" cy="14" r="7" fill="white" opacity="0.9" />
      </svg>
      {/* Círculo pulsante animado por CSS */}
      <div 
        className="absolute top-[6px] w-[16px] h-[16px] rounded-full z-0 map-pin-pulse" 
        style={{ backgroundColor: color, opacity: 0.5 }}
      ></div>
    </div>
  );

  return L.divIcon({
    html: svgMarkup,
    className: 'custom-marker-icon',
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -38],
  });
}

export function VendedorMarker({ vendedor }: { vendedor: Vendedor }) {
  const icon = createCategoryIcon(vendedor.categoria);

  return (
    <Marker position={[vendedor.lat, vendedor.lng]} icon={icon}>
      <Popup>
        <div className="flex flex-col gap-2 p-1 min-w-[180px]">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-primary shrink-0" />
            <h3 className="font-bold text-base text-gray-900 leading-tight">{vendedor.nome}</h3>
          </div>
          
          <span
            className="inline-block text-xs font-bold px-2 py-0.5 rounded-full w-fit"
            style={{
              backgroundColor: `${CATEGORY_COLORS[vendedor.categoria]}15`,
              color: CATEGORY_COLORS[vendedor.categoria],
            }}
          >
            {vendedor.categoria}
          </span>
          
          <div className="text-sm text-gray-700 mt-1 bg-muted/30 p-2 rounded-md">
            <strong className="block mb-1 text-xs uppercase tracking-wider text-gray-500">Produtos em destaque:</strong>
            <p className="mt-0.5 leading-relaxed">
              {vendedor.produtos.join(', ')}
            </p>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
