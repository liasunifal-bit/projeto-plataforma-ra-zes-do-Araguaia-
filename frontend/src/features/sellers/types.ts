export type Seller = {
  id: string
  name: string
  phone: string
  pixKey?: string

  // Opcionais para suportar carregamento do banco de dados (onde podem não estar preenchidos ou não fazer parte da tabela raiz)
  category?: 'comida' | 'artesanato' | 'peixe' | 'servicos'
  latitude?: number
  longitude?: number
}
