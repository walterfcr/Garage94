export function formatOrderNumber(id) {
  return `RC-${String(id).padStart(5, '0')}`
}
