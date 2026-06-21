export const appRoutes = {
  // Rotas públicas — qualquer visitante pode acessar
  home: '/',
  catalog: '/catalogo',
  category: '/catalogo/:categorySlug',
  productDetail: '/produto/:productId',
  map: '/mapa',
  calendar: '/calendario',
  school: '/escolinha',
  onboarding: '/boas-vindas',

  // Rotas protegidas — exigem login
  addProduct: '/cadastrar-produto',
  addEvent: '/cadastrar-evento',
  userDashboard: '/minha-conta',
  myProducts: '/meus-produtos',
  editProduct: '/editar-produto/:productId',

  // Rotas de admin — exigem login e role 'admin'
  admin: '/admin',
  adminSellers: '/admin/vendedores',
  adminProducts: '/admin/produtos',
  adminEvents: '/admin/eventos',
  adminSellerDetail: '/admin/vendedor/:id',
  adminProductDetail: '/admin/produto/:id',
  adminEventDetail: '/admin/evento/:id',
} as const