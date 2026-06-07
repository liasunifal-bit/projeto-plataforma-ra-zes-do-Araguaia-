import type { ProductSummary } from '../types'

const MOCK_PRODUCTS: ProductSummary[] = [
  {
    id: '1',
    name: 'Peixe Tambaqui Fresco',
    category: 'peixe',
    price: 45,
    imageUrl:
      'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Peixe fresco em bancada de feira',
    description:
      'Peixe tambaqui fresco vendido por produtor local, ideal para assar, cozinhar ou preparar em familia.',
    stockStatus: 'available',
    hasAudio: true,
    audioDuration: '0:15',
    sellerName: 'Seu Joao',
    location: 'Vila Nova',
    unit: 'kg',
    whatsappNumber: '5599999999999',
  },
  {
    id: '2',
    name: 'Farinha de Mandioca',
    category: 'comida',
    price: 18,
    imageUrl:
      'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Farinha de mandioca artesanal',
    description:
      'Farinha de mandioca caseira, torrada em pequena escala e pronta para acompanhar as refeicoes do dia a dia.',
    stockStatus: 'available',
    hasAudio: false,
    sellerName: 'Dona Maria',
    location: 'Comunidade Sao Joao',
    unit: 'kg',
    whatsappNumber: '5599999999999',
  },
  {
    id: '3',
    name: 'Cesto de Palha Tecido',
    category: 'artesanato',
    price: 65,
    imageUrl:
      'https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Cesto artesanal de palha tecido a mao',
    description:
      'Cesto de palha tecido manualmente, resistente para uso domestico, decoracao ou organizacao.',
    stockStatus: 'limited',
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
    price: 30,
    description:
      'Servico local para conserto de redes, combinando prazo e retirada diretamente com o vendedor.',
    stockStatus: 'available',
    hasAudio: false,
    sellerName: 'Seu Antonio',
    location: 'Beira Rio',
    unit: 'servico',
    whatsappNumber: '5599999999999',
  },
  {
    id: '5',
    name: 'Geleia de Cupuacu',
    category: 'comida',
    price: 22,
    imageUrl:
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Pote de geleia artesanal',
    description:
      'Geleia artesanal com fruta regional, boa para cafe da manha, sobremesas e cestas de presente.',
    stockStatus: 'limited',
    hasAudio: false,
    sellerName: 'Sabores da Vila',
    location: 'Centro',
    unit: 'pote',
    whatsappNumber: '5599999999999',
  },
  {
    id: '6',
    name: 'Biojoia de Sementes',
    category: 'artesanato',
    price: 38,
    imageUrl:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Colar artesanal com sementes',
    description:
      'Acessorio artesanal feito com sementes selecionadas, valorizando a identidade local.',
    stockStatus: 'available',
    hasAudio: false,
    sellerName: 'Atelie Maos do Rio',
    location: 'Vila Nova',
    unit: 'un',
    whatsappNumber: '5599999999999',
  },
]

export async function listProducts(): Promise<ProductSummary[]> {
  return MOCK_PRODUCTS
}

export async function getProductById(productId: string): Promise<ProductSummary | null> {
  return MOCK_PRODUCTS.find((product) => product.id === productId) ?? null
}
