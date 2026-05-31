import type { ProductSummary } from '../types'

const MOCK_PRODUCTS: ProductSummary[] = [
  {
    id: '1',
    name: 'Peixe Tambaqui Fresco',
    category: 'peixe',
    price: 45.0,
    imageUrl: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=400&q=80',
    hasAudio: true,
    audioDuration: '0:15',
    sellerName: 'Seu João',
    location: 'Vila Nova',
    unit: 'kg',
    whatsappNumber: '5599999999999',
  },
  {
    id: '2',
    name: 'Farinha de Mandioca',
    category: 'comida',
    price: 18.0,
    imageUrl: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=400&q=80',
    hasAudio: false,
    sellerName: 'Dona Maria',
    location: 'Comunidade São João',
    unit: 'kg',
    whatsappNumber: '5599999999999',
  },
  {
    id: '3',
    name: 'Cesto de Palha Tecido',
    category: 'artesanato',
    price: 65.0,
    imageUrl: 'https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&w=400&q=80',
    hasAudio: true,
    audioDuration: '0:22',
    sellerName: 'Tia Raimunda',
    location: 'Centro',
    whatsappNumber: '5599999999999',
  },
  {
    id: '4',
    name: 'Conserto de Redes',
    category: 'servicos',
    price: 30.0,
    hasAudio: false,
    sellerName: 'Seu Antônio',
    location: 'Beira Rio',
    unit: 'serviço',
    whatsappNumber: '5599999999999',
  },
]

export async function listProducts(): Promise<ProductSummary[]> {
  return MOCK_PRODUCTS
}
