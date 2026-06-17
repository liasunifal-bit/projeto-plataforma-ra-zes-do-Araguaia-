export type Seller = {
  id: string
  name: string
  phone: string
  pixKey?: string

  // Por enquanto fica comentado, mas futuramente podemos querer usar isso para mostrar a localização do vendedor no mapa
  // category: 'comida' | 'artesanato' | 'peixe' | 'servicos'
  // latitude: number
  // longitude: number
}
