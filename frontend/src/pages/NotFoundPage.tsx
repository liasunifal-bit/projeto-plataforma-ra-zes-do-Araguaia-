import { useNavigate } from 'react-router'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <span className="text-8xl font-black text-black">404</span>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-black">
            Página não encontrada
          </h1>
          <p className="text-sm text-gray-500">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Voltar para Home
        </button>
      </div>
    </div>
  )
}