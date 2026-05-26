export const formatPrice = (price) => {
  if (price == null) return ''

  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    minimumFractionDigits: 0,
  }).format(price)
}
