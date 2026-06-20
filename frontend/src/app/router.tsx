import { createBrowserRouter } from 'react-router'
import { lazy, Suspense } from 'react'
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

const HomePage = lazy(() => import('@/pages/HomePage'))
const CatalogPage = lazy(() => import('@/pages/CatalogPage'))
const CategoryPage = lazy(() => import('@/pages/CategoryPage'))
const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage'))
const MapPage = lazy(() => import('@/pages/MapPage'))
const CalendarPage = lazy(() => import('@/pages/CalendarPage'))
const SchoolPage = lazy(() => import('@/pages/SchoolPage'))
const AddProductPage = lazy(() => import('@/pages/AddProductPage'))
const CreateEventPage = lazy(() => import('@/features/events/pages/CreateEventPage'))
const OnboardingPage = lazy(() => import('@/pages/OnboardingPage'))
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
      { index: true, element: <Page component={HomePage} /> },
      { path: appRoutes.catalog, element: <Page component={CatalogPage} /> },
      { path: appRoutes.category, element: <Page component={CategoryPage} /> },
      { path: appRoutes.productDetail, element: <Page component={ProductDetailPage} /> },
      { path: appRoutes.map, element: <Page component={MapPage} /> },
      { path: appRoutes.calendar, element: <Page component={CalendarPage} /> },
      { path: appRoutes.school, element: <Page component={SchoolPage} /> },
      { path: appRoutes.addProduct, element: <Page component={AddProductPage} /> },
      { path: appRoutes.addEvent, element: <Page component={CreateEventPage} /> },
      { path: appRoutes.onboarding, element: <Page component={OnboardingPage} /> },
      { path: appRoutes.admin, element: <Page component={AdminDashboardPage} /> },
      { path: appRoutes.adminSellers, element: <Page component={AdminSellersPage} /> },
      { path: appRoutes.adminProducts, element: <Page component={AdminProductsPage} /> },
      { path: appRoutes.adminEvents, element: <Page component={AdminEventsPage} /> },
      { path: appRoutes.adminSellerDetail, element: <Page component={AdminSellerDetailPage} /> },
      { path: appRoutes.adminProductDetail, element: <Page component={AdminProductDetailPage} /> },
      { path: appRoutes.adminEventDetail, element: <Page component={AdminEventDetailPage} /> },
    ],
  },
  {
    path: '*',
    element: <Page component={NotFoundPage} />,
  },
])
