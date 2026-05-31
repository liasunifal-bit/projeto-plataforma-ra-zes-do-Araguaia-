export function formatDate(value: string | Date): string {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(value))
}
