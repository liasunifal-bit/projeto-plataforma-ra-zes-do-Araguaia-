import { requireSupabase } from '@/lib/supabase/client'

export async function uploadAudio(file: File, productId: string): Promise<string> {
  const client = requireSupabase()
  const { data: authData } = await client.auth.getUser()
  if (!authData.user) throw new Error('Entre na sua conta para enviar audio.')

  const extension = file.name.split('.').pop()?.toLowerCase() || 'webm'
  const path = `${authData.user.id}/${productId}/${crypto.randomUUID()}.${extension}`
  const { error } = await client.storage.from('product-audio').upload(path, file)
  if (error) throw error
  return path
}
