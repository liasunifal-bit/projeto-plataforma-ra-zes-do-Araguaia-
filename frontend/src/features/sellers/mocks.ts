import type { Seller } from './types';

/**
 * Dados mockados de vendedores da região de Brejo Grande do Araguaia (PA).
 * Coordenadas reais ajustadas para o centro urbano: lat -5.6989, lng -48.4131
 * Esses dados serão substituídos pela integração com a API futuramente.
 */
export const mockSellers: Seller[] = [
  {
    id: 'seller-1',
    name: 'Dona Maria da Tapioca',
    phone: '94991001001',
    pixKey: 'maria.tapioca@email.com',
    category: 'comida',
    latitude: -5.7035,
    longitude: -48.4045,
  },
  {
    id: 'seller-2',
    name: 'Seu Raimundo Pescados',
    phone: '94991002002',
    pixKey: 'raimundo.pesca@pix.com',
    category: 'peixe',
    latitude: -5.7028,
    longitude: -48.4012,
  },
  {
    id: 'seller-3',
    name: 'Artes do Araguaia',
    phone: '94991003003',
    category: 'artesanato',
    latitude: -5.7012,
    longitude: -48.4025,
  },
  {
    id: 'seller-4',
    name: 'Sabores da Beira-Rio',
    phone: '94991004004',
    pixKey: 'sabores.rio@pix.com',
    category: 'comida',
    latitude: -5.7042,
    longitude: -48.4038,
  },
  {
    id: 'seller-5',
    name: 'Zé do Tucunaré',
    phone: '94991005005',
    category: 'peixe',
    latitude: -5.7065,
    longitude: -48.4055,
  },
  {
    id: 'seller-6',
    name: 'Oficina do Babaçu',
    phone: '94991006006',
    pixKey: 'oficina.babacu@email.com',
    category: 'servicos',
    latitude: -5.7052,
    longitude: -48.4078,
  },
];
