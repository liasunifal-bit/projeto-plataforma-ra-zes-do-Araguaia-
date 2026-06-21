import { useState, useEffect, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { AppShell } from '@/app/layout/AppShell'
import { BottomNav } from '@/app/layout/BottomNav'
import { PageHeader } from '@/app/layout/PageHeader'
import { useAuth } from '@/features/auth'
import { attachProductMedia, getProductById, updateProduct, type ProductSummary } from '@/features/catalog'
import type { AppCategorySlug } from '@/features/categories'
import { uploadAudio, uploadImage } from '@/lib/storage'

export default function EditProductPage() {
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()
  const { user, isLoading: isAuthLoading } = useAuth()
  
  const [product, setProduct] = useState<ProductSummary | null>(null)
  const [isProductLoading, setIsProductLoading] = useState(true)
  const [message, setMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (productId) {
      loadProduct()
    }
  }, [productId])

  async function loadProduct() {
    setIsProductLoading(true)
    try {
      const p = await getProductById(productId!)
      setProduct(p)
    } catch (error) {
      console.error(error)
      setMessage('Produto não encontrado ou ocorreu um erro.')
    } finally {
      setIsProductLoading(false)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!productId) return

    const formElement = event.currentTarget

    setIsSubmitting(true)
    setMessage(null)

    const form = new FormData(formElement)

    try {
      await updateProduct({
        productId: productId,
        categorySlug: String(form.get('category')) as AppCategorySlug,
        name: String(form.get('name')),
        description: String(form.get('description') || ''),
        price: Number(form.get('price')),
        unit: String(form.get('unit') || ''),
        locationName: String(form.get('location')),
        publish: true,
      })

      const image = form.get('image')
      if (image instanceof File && image.size > 0) {
        const storagePath = await uploadImage(image, productId)
        await attachProductMedia(productId, {
          type: 'image',
          storagePath,
          mimeType: image.type,
          sizeBytes: image.size,
        })
      }

      const audio = form.get('audio')
      if (audio instanceof File && audio.size > 0) {
        const storagePath = await uploadAudio(audio, productId)
        await attachProductMedia(productId, {
          type: 'audio',
          storagePath,
          mimeType: audio.type,
          sizeBytes: audio.size,
        })
      }

      navigate(`/produto/${productId}`)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Nao foi possivel atualizar o produto.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isAuthLoading || isProductLoading) {
    return (
      <AppShell>
        <PageHeader title="Editar produto" />
        <main className="flex-1 p-5">Carregando...</main>
        <BottomNav />
      </AppShell>
    )
  }

  if (!user) {
    return (
      <AppShell>
        <PageHeader title="Editar produto" />
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

  if (!product) {
    return (
      <AppShell>
        <PageHeader title="Editar produto" />
        <main className="flex-1 p-5 text-center text-red-500 font-bold">{message}</main>
        <BottomNav />
      </AppShell>
    )
  }

  return (
    <AppShell>
      <PageHeader title="Editar produto" />
      <main className="flex-1 overflow-y-auto p-5">
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-xl flex-col gap-4">
          <h1 className="font-heading text-2xl font-bold">Editar anúncio</h1>
          
          <Field label="Nome do produto ou servico" name="name" defaultValue={product.name} required />
          
          <label className="flex flex-col gap-1 text-sm font-bold">
            Categoria
            <select name="category" defaultValue={product.category} required className="rounded-xl border p-3 font-normal">
              <option value="peixe">Peixe</option>
              <option value="comida">Comida</option>
              <option value="artesanato">Artesanato</option>
              <option value="servicos">Servicos</option>
            </select>
          </label>
          
          <Field label="Localidade" name="location" defaultValue={product.location} required />
          <Field label="Preco" name="price" type="number" min="0" step="0.01" defaultValue={product.price} required />
          <Field label="Unidade (kg, pote, unidade)" name="unit" defaultValue={product.unit} />
          
          <label className="flex flex-col gap-1 text-sm font-bold">
            Descricao
            <textarea name="description" rows={4} defaultValue={product.description} className="rounded-xl border p-3 font-normal" />
          </label>
          
          <Field label="Atualizar Foto (opcional)" name="image" type="file" accept="image/jpeg,image/png,image/webp" />
          <Field label="Atualizar Audio (opcional)" name="audio" type="file" accept="audio/mpeg,audio/mp4,audio/webm,audio/ogg" />
          
          <button disabled={isSubmitting} className="rounded-xl bg-primary p-3 font-bold text-white">
            {isSubmitting ? 'Atualizando...' : 'Salvar Alterações'}
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
