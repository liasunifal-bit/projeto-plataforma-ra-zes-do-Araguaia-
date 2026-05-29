import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router'

export default function ErrorBoundary() {
  const error = useRouteError()
  const navigate = useNavigate()

  const getErrorMessage = () => {
    if (isRouteErrorResponse(error)) {
      return {
        status: error.status,
        title: error.statusText,
        message: error.data,
      }
    }
    if (error instanceof Error) {
      return {
        status: 500,
        title: 'Erro inesperado',
        message: error.message,
      }
    }
    return {
      status: 500,
      title: 'Erro desconhecido',
      message: 'Algo deu errado.',
    }
  }

  const { status, title, message } = getErrorMessage()

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <span className="text-8xl font-black text-black">{status}</span>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-black">{title}</h1>
          <p className="text-sm text-gray-500">{message}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 border border-black text-black text-sm font-medium hover:bg-black hover:text-white transition-colors"
          >
            Voltar
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Ir para Home
          </button>
        </div>
      </div>
    </div>
  )
}