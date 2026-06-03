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
const OnboardingPage = lazy(() => import('@/pages/OnboardingPage'))
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
      { path: appRoutes.onboarding, element: <Page component={OnboardingPage} /> },
    ],
  },
  {
    path: '*',
    element: <Page component={NotFoundPage} />,
  },
])
