import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

import { AppShell } from '@/app/layout/AppShell'
import { BottomNav } from '@/app/layout/BottomNav'
import { PageHeader } from '@/app/layout/PageHeader'
import { useAuth } from '@/features/auth'
import { attachProductMedia, createProduct } from '@/features/catalog'
import type { AppCategorySlug } from '@/features/categories'
import { getMySellerProfile, saveMySellerProfile } from '@/features/sellers'
import { uploadAudio, uploadImage } from '@/lib/storage'

export default function AddProductPage() {
  const { user, isLoading } = useAuth()
  const [message, setMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formElement = event.currentTarget

    setIsSubmitting(true)
    setMessage(null)

    const form = new FormData(formElement)

    try {
      const existingSeller = await getMySellerProfile()
      const seller =
        existingSeller ??
        (await saveMySellerProfile({
          displayName: String(form.get('sellerName')),
          whatsappNumber: String(form.get('whatsapp')),
          locationName: String(form.get('location')),
          pixKey: String(form.get('pixKey') || ''),
        }))

      const product = await createProduct({
        sellerId: seller.id,
        categorySlug: String(form.get('category')) as AppCategorySlug,
        name: String(form.get('name')),
        description: String(form.get('description') || ''),
        price: Number(form.get('price')),
        unit: String(form.get('unit') || ''),
        locationName: String(form.get('location')),
      })

      const image = form.get('image')
      if (image instanceof File && image.size > 0) {
        const storagePath = await uploadImage(image, product.id)
        await attachProductMedia(product.id, {
          type: 'image',
          storagePath,
          mimeType: image.type,
          sizeBytes: image.size,
        })
      }

      const audio = form.get('audio')
      if (audio instanceof File && audio.size > 0) {
        const storagePath = await uploadAudio(audio, product.id)
        await attachProductMedia(product.id, {
          type: 'audio',
          storagePath,
          mimeType: audio.type,
          sizeBytes: audio.size,
        })
      }

      formElement.reset()
      setMessage('Produto enviado para aprovacao. Em breve estara disponivel no catalogo.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Nao foi possivel cadastrar o produto.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <AppShell>
        <PageHeader title="Cadastrar produto" />
        <main className="flex-1 p-5">Carregando...</main>
        <BottomNav />
      </AppShell>
    )
  }

  if (!user) {
    return (
      <AppShell>
        <PageHeader title="Cadastrar produto" />
        <main className="flex flex-1 flex-col gap-4 p-5">
          <p>Entre ou crie uma conta antes de publicar um produto.</p>
          <Link to="/boas-vindas" className="rounded-xl bg-primary p-3 text-center font-bold text-white">
            Acessar minha conta
          </Link>
        </main>
        <BottomNav />
      </AppShell>
    )
  }

  return (
    <AppShell>
      <PageHeader title="Cadastrar produto" />
      <main className="flex-1 overflow-y-auto p-5 md:p-6 lg:p-8 xl:mx-auto xl:w-full xl:max-w-screen-xl 2xl:max-w-screen-2xl">
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-xl flex-col gap-4">
          <h1 className="font-heading text-2xl font-bold">Novo anuncio</h1>
          <Field label="Nome do vendedor" name="sellerName" required />
          <Field label="WhatsApp" name="whatsapp" type="tel" required />
          <Field label="Localidade" name="location" required />
          <Field label="Chave Pix (opcional)" name="pixKey" />
          <Field label="Nome do produto ou servico" name="name" required />
          <label className="flex flex-col gap-1 text-sm font-bold">
            Categoria
            <select name="category" required className="rounded-xl border p-3 font-normal">
              <option value="peixe">Peixe</option>
              <option value="comida">Comida</option>
              <option value="artesanato">Artesanato</option>
              <option value="servicos">Servicos</option>
            </select>
          </label>
          <Field label="Preco" name="price" type="number" min="0" step="0.01" required />
          <Field label="Unidade (kg, pote, unidade)" name="unit" />
          <label className="flex flex-col gap-1 text-sm font-bold">
            Descricao
            <textarea name="description" rows={4} className="rounded-xl border p-3 font-normal" />
          </label>
          <Field label="Foto" name="image" type="file" accept="image/jpeg,image/png,image/webp" />
          <Field label="Audio" name="audio" type="file" accept="audio/mpeg,audio/mp4,audio/webm,audio/ogg" />
          <button disabled={isSubmitting} className="rounded-xl bg-primary p-3 font-bold text-white">
            {isSubmitting ? 'Enviando...' : 'Cadastrar produto'}
          </button>
          {message && <p role="status" className="rounded-xl bg-muted p-3 text-sm">{message}</p>}
        </form>
      </main>
      <BottomNav />
    </AppShell>
  )
}

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  name: string
}

function Field({ label, ...props }: FieldProps) {
  return (
    <label className="flex flex-col gap-1 text-sm font-bold">
      {label}
      <input {...props} className="rounded-xl border p-3 font-normal" />
    </label>
  )
}