import { useEffect } from 'react'
import { CheckCircle2, XCircle, X } from 'lucide-react'

type ToastProps = {
  message: string
  type?: 'success' | 'error'
  onClose: () => void
  duration?: number
}

export function ToastNotification({ message, type = 'success', onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-xs bg-white rounded-2xl shadow-xl border border-border/60 p-3.5 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-5 duration-200 lg:bottom-6 lg:left-28 lg:translate-x-0">
      <div className="flex items-center gap-2.5">
        {type === 'success' ? (
          <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
        ) : (
          <XCircle className="text-red-500 shrink-0" size={20} />
        )}
        <span className="text-xs font-semibold text-stone-700 leading-tight">
          {message}
        </span>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="text-stone-400 hover:text-stone-600 transition-colors p-1"
        aria-label="Fechar notificação"
      >
        <X size={14} strokeWidth={2.5} />
      </button>
    </div>
  )
}
