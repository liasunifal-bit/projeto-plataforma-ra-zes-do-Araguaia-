import { createBrowserRouter } from 'react-router-dom'

import {
  AddProductPage,
  CalendarPage,
  CatalogPage,
  CategoryPage,
  HomePage,
  MapPage,
  NotFoundPage,
  OnboardingPage,
  ProductDetailPage,
  SchoolPage,
} from '@/pages'

import { appRoutes } from './routes'

export const appRouter = createBrowserRouter([
  { path: appRoutes.home, element: <HomePage /> },
  { path: appRoutes.catalog, element: <CatalogPage /> },
  { path: appRoutes.category, element: <CategoryPage /> },
  { path: appRoutes.productDetail, element: <ProductDetailPage /> },
  { path: appRoutes.map, element: <MapPage /> },
  { path: appRoutes.calendar, element: <CalendarPage /> },
  { path: appRoutes.school, element: <SchoolPage /> },
  { path: appRoutes.addProduct, element: <AddProductPage /> },
  { path: appRoutes.onboarding, element: <OnboardingPage /> },
  { path: '*', element: <NotFoundPage /> },
])

