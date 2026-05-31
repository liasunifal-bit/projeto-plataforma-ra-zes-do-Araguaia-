type WhatsAppMessageParams = {
  phone: string
  message: string
}

export function createWhatsAppUrl({ phone, message }: WhatsAppMessageParams): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
