import type { ProductSummary } from '@/features/catalog/types'

export const comidaProducts: ProductSummary[] = [
  {
    id: '2',
    name: 'Farinha de Mandioca',
    category: 'comida',
    price: 18,
    imageUrl: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Farinha de mandioca artesanal',
    description: 'Farinha de mandioca caseira, torrada em pequena escala e pronta para acompanhar as refeicoes do dia a dia.',
    stockStatus: 'available',
    hasAudio: false,
    sellerName: 'Dona Maria',
    location: 'Comunidade Sao Joao',
    unit: 'kg',
    whatsappNumber: '5599999999999',
  },
  {
    id: '5',
    name: 'Geleia de Cupuacu',
    category: 'comida',
    price: 22,
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Pote de geleia artesanal',
    description: 'Geleia artesanal com fruta regional, boa para cafe da manha, sobremesas e cestas de presente.',
    stockStatus: 'limited',
    hasAudio: false,
    sellerName: 'Sabores da Vila',
    location: 'Centro',
    unit: 'pote',
    whatsappNumber: '5599999999999',
  },
]
