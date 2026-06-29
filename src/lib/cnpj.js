import { onlyDigits } from './format.js'

/* Progressive CNPJ mask: 12.345.678/0001-95 */
export function maskCNPJ(value) {
  const d = onlyDigits(value).slice(0, 14)
  let out = d
  if (d.length > 2) out = `${d.slice(0, 2)}.${d.slice(2)}`
  if (d.length > 5) out = `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`
  if (d.length > 8) out = `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`
  if (d.length > 12)
    out = `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`
  return out
}

/* Full CNPJ check-digit validation — accepts every company type (matriz, filial,
   MEI, ME, EPP, LTDA, S.A. ...). Rejects repeated-digit sequences. */
export function isValidCNPJ(value) {
  const c = onlyDigits(value)
  if (c.length !== 14) return false
  if (/^(\d)\1{13}$/.test(c)) return false

  const checkDigit = (base) => {
    const len = base.length
    let pos = len - 7
    let sum = 0
    for (let i = 0; i < len; i++) {
      sum += Number(base[i]) * pos--
      if (pos < 2) pos = 9
    }
    const r = sum % 11
    return r < 2 ? 0 : 11 - r
  }

  const base = c.slice(0, 12)
  const d1 = checkDigit(base)
  const d2 = checkDigit(base + d1)
  return c.slice(12) === `${d1}${d2}`
}
