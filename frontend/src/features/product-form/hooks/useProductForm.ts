import type { ProductFormValues } from '../types'

export function useProductForm(): ProductFormValues {
  return {
    mode: 'self',
    name: '',
  }
}
