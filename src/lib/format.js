export const onlyDigits = (v) => (v || '').replace(/\D/g, '')

/* Brazilian phone mask: (11) 98765-4321 / (11) 3456-7890 */
export function maskPhone(v) {
  const d = onlyDigits(v).slice(0, 11)
  if (d.length === 0) return ''
  if (d.length < 3) return `(${d}`
  if (d.length < 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length < 11) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

export const isValidPhone = (v) => {
  const d = onlyDigits(v)
  return d.length === 10 || d.length === 11
}

export const isValidEmail = (v) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((v || '').trim())
