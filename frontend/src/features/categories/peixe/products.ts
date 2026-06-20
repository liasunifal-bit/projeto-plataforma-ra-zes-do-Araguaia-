import type { ProductSummary } from '@/features/catalog/types'

export const peixeProducts: ProductSummary[] = [
  {
    id: '1',
    name: 'Peixe Tambaqui Fresco',
    category: 'peixe',
    price: 45,
    imageUrl: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Peixe fresco em bancada de feira',
    description: 'Peixe tambaqui fresco vendido por produtor local, ideal para assar, cozinhar ou preparar em familia.',
    stockStatus: 'available',
    hasAudio: true,
    audioDuration: '0:15',
    sellerName: 'Seu Joao',
    location: 'Vila Nova',
    unit: 'kg',
    whatsappNumber: '5599999999999',
  },
]