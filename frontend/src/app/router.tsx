import { createBrowserRouter } from 'react-router'
import { lazy, Suspense } from 'react'

import { PermissionGate, ProtectedRoute } from '@/features/auth'
import { appRoutes } from './routes'
import ErrorBoundary from './ErrorBoundary'

const fallback = (
  <div className="min-h-screen flex items-center justify-center text-sm text-gray-400">
    Carregando...
  </div>
)

const Page = ({ component: C }: { component: React.ComponentType }) => (
  <Suspense fallback={fallback}>
    <C />
  </Suspense>
)

// Rotas públicas
const HomePage = lazy(() => import('@/pages/HomePage'))
const CatalogPage = lazy(() => import('@/pages/CatalogPage'))
const CategoryPage = lazy(() => import('@/pages/CategoryPage'))
const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage'))
const MapPage = lazy(() => import('@/pages/MapPage'))
const CalendarPage = lazy(() => import('@/pages/CalendarPage'))
const SchoolPage = lazy(() => import('@/pages/SchoolPage'))
const OnboardingPage = lazy(() => import('@/pages/OnboardingPage'))

// Rotas protegidas — exigem login
const AddProductPage = lazy(() => import('@/pages/AddProductPage'))
const CreateEventPage = lazy(() => import('@/features/events/pages/CreateEventPage'))
const UserDashboardPage = lazy(() => import('@/pages/UserDashboardPage'))
const MyProductsPage = lazy(() => import('@/pages/MyProductsPage'))
const EditProductPage = lazy(() => import('@/pages/EditProductPage'))
// Rotas de admin — exigem login e role 'admin'
const AdminDashboardPage = lazy(() => import('@/pages/AdminDashboardPage'))
const AdminSellersPage = lazy(() => import('@/pages/AdminSellersPage'))
const AdminProductsPage = lazy(() => import('@/pages/AdminProductsPage'))
const AdminEventsPage = lazy(() => import('@/pages/AdminEventsPage'))
const AdminSellerDetailPage = lazy(() => import('@/pages/AdminSellerDetailPage'))
const AdminProductDetailPage = lazy(() => import('@/pages/AdminProductDetailPage'))
const AdminEventDetailPage = lazy(() => import('@/pages/AdminEventDetailPage'))

const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

export const appRouter = createBrowserRouter([
  {
    path: appRoutes.home,
    errorElement: <ErrorBoundary />,
    children: [
      // ── Públicas ─────────────────────────────────────────────────────────
      { index: true, element: <Page component={HomePage} /> },
      { path: appRoutes.catalog, element: <Page component={CatalogPage} /> },
      { path: appRoutes.category, element: <Page component={CategoryPage} /> },
      { path: appRoutes.productDetail, element: <Page component={ProductDetailPage} /> },
      { path: appRoutes.map, element: <Page component={MapPage} /> },
      { path: appRoutes.calendar, element: <Page component={CalendarPage} /> },
      { path: appRoutes.school, element: <Page component={SchoolPage} /> },
      { path: appRoutes.onboarding, element: <Page component={OnboardingPage} /> },

      // ── Protegidas (login obrigatório) ────────────────────────────────────
      {
        path: appRoutes.addProduct,
        element: (
          <ProtectedRoute>
            <Page component={AddProductPage} />
          </ProtectedRoute>
        ),
      },
      {
        path: appRoutes.addEvent,
        element: (
          <ProtectedRoute>
            <Page component={CreateEventPage} />
          </ProtectedRoute>
        ),
      },
      {
        path: appRoutes.userDashboard,
        element: (
          <ProtectedRoute>
            <Page component={UserDashboardPage} />
          </ProtectedRoute>
        ),
      },
      {
        path: appRoutes.myProducts,
        element: (
          <ProtectedRoute>
            <Page component={MyProductsPage} />
          </ProtectedRoute>
        ),
      },
      {
        path: appRoutes.editProduct,
        element: (
          <ProtectedRoute>
            <Page component={EditProductPage} />
          </ProtectedRoute>
        ),
      },

      // ── Admin (login + role 'admin' obrigatórios) ─────────────────────────
      // ProtectedRoute → verifica se está LOGADO
      // PermissionGate → verifica se tem role 'admin'
      {
        path: appRoutes.admin,
        element: (
          <ProtectedRoute>
            <PermissionGate allowedRoles={['admin']}>
              <Page component={AdminDashboardPage} />
            </PermissionGate>
          </ProtectedRoute>
        ),
      },
      {
        path: appRoutes.adminSellers,
        element: (
          <ProtectedRoute>
            <PermissionGate allowedRoles={['admin']}>
              <Page component={AdminSellersPage} />
            </PermissionGate>
          </ProtectedRoute>
        ),
      },
      {
        path: appRoutes.adminProducts,
        element: (
          <ProtectedRoute>
            <PermissionGate allowedRoles={['admin']}>
              <Page component={AdminProductsPage} />
            </PermissionGate>
          </ProtectedRoute>
        ),
      },
      {
        path: appRoutes.adminEvents,
        element: (
          <ProtectedRoute>
            <PermissionGate allowedRoles={['admin']}>
              <Page component={AdminEventsPage} />
            </PermissionGate>
          </ProtectedRoute>
        ),
      },
      {
        path: appRoutes.adminSellerDetail,
        element: (
          <ProtectedRoute>
            <PermissionGate allowedRoles={['admin']}>
              <Page component={AdminSellerDetailPage} />
            </PermissionGate>
          </ProtectedRoute>
        ),
      },
      {
        path: appRoutes.adminProductDetail,
        element: (
          <ProtectedRoute>
            <PermissionGate allowedRoles={['admin']}>
              <Page component={AdminProductDetailPage} />
            </PermissionGate>
          </ProtectedRoute>
        ),
      },
      {
        path: appRoutes.adminEventDetail,
        element: (
          <ProtectedRoute>
            <PermissionGate allowedRoles={['admin']}>
              <Page component={AdminEventDetailPage} />
            </PermissionGate>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Page component={NotFoundPage} />,
  },
])