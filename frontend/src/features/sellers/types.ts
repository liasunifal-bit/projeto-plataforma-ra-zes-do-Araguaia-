export type Seller = {
  id: string
  name: string
  phone: string
  pixKey?: string
  category: 'comida' | 'artesanato' | 'peixe' | 'servicos'
  latitude: number
  longitude: number
}
