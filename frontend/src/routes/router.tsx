import { createBrowserRouter } from 'react-router'
import { lazy, Suspense } from 'react'
import ErrorBoundary from './error/ErrorBoundary'

const Home     = lazy(() => import('../pages/Home'))
const NotFound = lazy(() => import('../pages/NotFound'))

const Page = ({ component: C }: { component: React.ComponentType }) => (
  <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm text-gray-400">Carregando...</div>}>
    <C />
  </Suspense>
)

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Page component={Home} />,
      },
    ],
  },
  {
    path: '*',
    element: <Page component={NotFound} />,
  },
])