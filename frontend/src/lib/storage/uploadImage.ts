import { requireSupabase } from '@/lib/supabase/client'

export async function uploadImage(file: File, productId: string): Promise<string> {
  const client = requireSupabase()
  const { data: authData } = await client.auth.getUser()
  if (!authData.user) throw new Error('Entre na sua conta para enviar imagens.')

  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const path = `${authData.user.id}/${productId}/${crypto.randomUUID()}.${extension}`
  const { error } = await client.storage.from('product-images').upload(path, file)
  if (error) throw error
  return path
}
