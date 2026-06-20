import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Phone, MessageCircle } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { Seller } from '../../sellers/types';

// Ícone padrão do leaflet corrigido para bundlers
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const CATEGORY_LABELS: Record<string, string> = {
  comida: '🍽️ Comida',
  artesanato: '🎨 Artesanato',
  peixe: '🐟 Peixe',
  servicos: '🔧 Serviços',
};

const CATEGORY_COLORS: Record<string, string> = {
  comida: '#E8732E',
  artesanato: '#8B4513',
  peixe: '#2F9E8F',
  servicos: '#1E5F8B',
};

function createCategoryIcon(category: string) {
  const color = CATEGORY_COLORS[category] ?? '#2D5A27';
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

// Fallback com ícone padrão caso algo dê errado
const defaultIcon = new L.Icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

type SellerMarkerProps = {
  seller: Seller;
};

export function SellerMarker({ seller }: SellerMarkerProps) {
  if (seller.latitude === undefined || seller.longitude === undefined) {
    return null;
  }

  const category = seller.category ?? 'servicos';
  const icon = createCategoryIcon(category) ?? defaultIcon;
  const categoryLabel = CATEGORY_LABELS[category] ?? category;
  const whatsappUrl = `https://wa.me/55${seller.phone}?text=${encodeURIComponent(`Olá ${seller.name}! Vi seu perfil no Raízes do Araguaia e gostaria de saber mais sobre seus produtos.`)}`;

  return (
    <Marker position={[seller.latitude, seller.longitude]} icon={icon}>
      <Popup>
        <div className="flex flex-col gap-2 p-1 min-w-[200px]">
          {/* Nome do vendedor */}
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-primary shrink-0" />
            <h3 className="font-bold text-base text-gray-900 leading-tight">{seller.name}</h3>
          </div>

          {/* Categoria */}
          <span
            className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full w-fit"
            style={{
              backgroundColor: `${CATEGORY_COLORS[category]}15`,
              color: CATEGORY_COLORS[category],
            }}
          >
            {categoryLabel}
          </span>

          {/* Telefone */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone size={12} />
            <span>({seller.phone.slice(0, 2)}) {seller.phone.slice(2, 7)}-{seller.phone.slice(7)}</span>
          </div>

          {/* Pix */}
          {seller.pixKey && (
            <p className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded">
              ✅ Aceita Pix
            </p>
          )}

          {/* Botão WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 mt-1 w-full py-2 rounded-lg text-sm font-bold text-white transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: '#25D366' }}
          >
            <MessageCircle size={16} />
            Chamar no WhatsApp
          </a>
        </div>
      </Popup>
    </Marker>
  );
}
