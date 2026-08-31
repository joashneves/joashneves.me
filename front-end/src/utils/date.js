export function formatDate(iso, showYear = true) {
  if (!iso) return ''
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  const options = showYear
    ? { day: '2-digit', month: 'short', year: 'numeric' }
    : { day: '2-digit', month: 'short' }
  return new Intl.DateTimeFormat('pt-BR', options).format(date)
}