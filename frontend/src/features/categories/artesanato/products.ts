import type { ProductSummary } from '@/features/catalog/types'

export const artesanatoProducts: ProductSummary[] = [
  {
    id: '3',
    name: 'Cesto de Palha Tecido',
    category: 'artesanato',
    price: 65,
    imageUrl: 'https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Cesto artesanal de palha tecido a mao',
    description: 'Cesto de palha tecido manualmente, resistente para uso domestico, decoracao ou organizacao.',
    stockStatus: 'limited',
    hasAudio: true,
    audioDuration: '0:22',
    sellerName: 'Tia Raimunda',
    location: 'Centro',
    whatsappNumber: '5599999999999',
  },
  {
    id: '6',
    name: 'Biojoia de Sementes',
    category: 'artesanato',
    price: 38,
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Colar artesanal com sementes',
    description: 'Acessorio artesanal feito com sementes selecionadas, valorizando a identidade local.',
    stockStatus: 'available',
    hasAudio: false,
    sellerName: 'Atelie Maos do Rio',
    location: 'Vila Nova',
    unit: 'un',
    whatsappNumber: '5599999999999',
  },
]