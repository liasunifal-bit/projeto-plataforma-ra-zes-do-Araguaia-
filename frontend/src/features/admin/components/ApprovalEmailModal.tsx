import { useState, useEffect } from 'react'
import { Send, X, Mail } from 'lucide-react'

type ApprovalEmailModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: (subject: string, message: string) => void
  recipientEmail: string
  itemName: string
  actionType: 'approve' | 'reject'
  itemType: 'product' | 'seller' | 'event'
}

export function ApprovalEmailModal({
  isOpen,
  onClose,
  onConfirm,
  recipientEmail,
  itemName,
  actionType,
  itemType
}: ApprovalEmailModalProps) {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (isOpen) {
      const typeLabel = 
        itemType === 'seller' ? 'cadastro de vendedor' :
        itemType === 'product' ? 'produto' : 'evento'

      if (actionType === 'approve') {
        setSubject(`Raízes do Araguaia — Seu ${typeLabel} foi aprovado!`)
        setMessage(
          `Olá!\n\nTemos o prazer de informar que o seu ${typeLabel} "${itemName}" foi revisado e aprovado com sucesso pela nossa equipe administrativa.\n\nEle já está publicado e visível no mapa e catálogo para toda a nossa comunidade.\n\nBoas vendas!\nEquipe Raízes do Araguaia`
        )
      } else {
        setSubject(`Raízes do Araguaia — Atualização sobre seu ${typeLabel}`)
        setMessage(
          `Olá!\n\nGostaríamos de informar que seu ${typeLabel} "${itemName}" passou por revisão e, infelizmente, precisou ser rejeitado no momento por não cumprir todas as diretrizes de preenchimento ou qualidade.\n\nPor favor, revise os dados cadastrados e tente reenviar se achar pertinente.\n\nEquipe Raízes do Araguaia`
        )
      }
    }
  }, [isOpen, actionType, itemType, itemName])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4 md:p-8 backdrop-blur-xs">
      <div className="w-full max-w-sm md:max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-primary text-white p-4 md:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail size={20} />
            <h3 className="font-heading font-bold text-sm">Enviar Notificação</h3>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <form 
          onSubmit={(e) => {
            e.preventDefault()
            onConfirm(subject, message)
          }}
          className="p-5 md:p-6 flex flex-col gap-4 md:gap-5 text-left"
        >
          {/* Destinatário */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-black text-stone-500 uppercase tracking-wider">
              Destinatário
            </label>
            <input
              type="email"
              value={recipientEmail}
              disabled
              className="w-full px-3.5 md:px-4 py-2.5 md:py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-500 text-xs md:text-sm font-semibold outline-none cursor-not-allowed"
            />
          </div>

          {/* Assunto */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email-subject" className="text-[11px] font-black text-stone-500 uppercase tracking-wider">
              Assunto
            </label>
            <input
              id="email-subject"
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3.5 md:px-4 py-2.5 md:py-3 rounded-xl border border-stone-200 text-xs md:text-sm font-semibold outline-none focus:border-primary transition-colors text-stone-800"
            />
          </div>

          {/* Mensagem */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email-message" className="text-[11px] font-black text-stone-500 uppercase tracking-wider">
              Mensagem
            </label>
            <textarea
              id="email-message"
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3.5 md:px-4 py-2.5 md:py-3 rounded-xl border border-stone-200 text-xs md:text-sm font-medium outline-none focus:border-primary transition-colors text-stone-800 resize-none leading-relaxed"
            />
          </div>

          {/* Ações */}
          <div className="flex flex-col md:flex-row gap-2.5 md:gap-3 border-t border-border/40 pt-4 mt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 md:py-3 rounded-xl border border-stone-200 hover:bg-stone-50 transition-colors text-stone-600 font-bold text-xs md:text-sm active:scale-[0.98]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 md:py-3 rounded-xl bg-primary text-white font-bold text-xs md:text-sm flex items-center justify-center gap-1.5 hover:bg-primary/95 transition-colors active:scale-[0.98]"
            >
              <Send size={13} />
              Enviar E-mail
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}
