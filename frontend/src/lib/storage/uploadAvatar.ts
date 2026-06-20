import { requireSupabase } from '@/lib/supabase/client'

export async function uploadAvatar(file: File): Promise<string> {
  const client = requireSupabase()
  const { data: authData } = await client.auth.getUser()
  if (!authData.user) throw new Error('Entre na sua conta para enviar sua foto de perfil.')

  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  // Armazena no formato userId/timestamp.ext para garantir URL nova e limpar cache
  const path = `${authData.user.id}/${Date.now()}.${extension}`
  
  // Utiliza o bucket 'avatars'. Caso o bucket não exista no backend do Supabase, o upload irá falhar.
  const { data, error } = await client.storage.from('avatars').upload(path, file, {
    upsert: true,
  })
  
  if (error) throw error
  
  // Retorna a URL pública completa
  const { data: publicUrlData } = client.storage.from('avatars').getPublicUrl(path)
  
  return publicUrlData.publicUrl
}
