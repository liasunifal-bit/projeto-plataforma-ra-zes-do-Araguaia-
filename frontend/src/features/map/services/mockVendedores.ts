export type Vendedor = {
  id: string;
  nome: string;
  categoria: 'COMIDA' | 'ARTESANATO' | 'PEIXE' | 'SERVICOS';
  lat: number;
  lng: number;
  produtos: string[];
};

export const mockVendedores: Vendedor[] = [
  {
    id: 'v1',
    nome: 'Dona Maria da Tapioca',
    categoria: 'COMIDA',
    lat: -5.7035,
    lng: -48.4045,
    produtos: ['Tapioca com tucumã', 'Bolo de Macaxeira', 'Café'],
  },
  {
    id: 'v2',
    nome: 'Seu Raimundo Pescados',
    categoria: 'PEIXE',
    lat: -5.7028,
    lng: -48.4012,
    produtos: ['Tucunaré fresco', 'Tambaqui', 'Filhote'],
  },
  {
    id: 'v3',
    nome: 'Artes do Araguaia',
    categoria: 'ARTESANATO',
    lat: -5.7012,
    lng: -48.4025,
    produtos: ['Cestas de Babaçu', 'Biojoias de sementes', 'Cerâmica'],
  },
  {
    id: 'v4',
    nome: 'Oficina do Babaçu',
    categoria: 'SERVICOS',
    lat: -5.7052,
    lng: -48.4078,
    produtos: ['Conserto de canoas', 'Manutenção de motores', 'Telas'],
  },
];
