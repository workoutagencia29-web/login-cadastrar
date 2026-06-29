import { useEffect, useState } from 'react'

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useCountUp(to, { duration = 1700, decimals = 0, delay = 0 } = {}) {
  const [val, setVal] = useState(reduced ? to : 0)

  useEffect(() => {
    if (reduced) {
      setVal(to)
      return
    }
    let raf
    let startTs
    const startTimer = setTimeout(() => {
      const step = (now) => {
        if (startTs === undefined) startTs = now
        const t = Math.min(1, (now - startTs) / duration)
        const eased = 1 - Math.pow(1 - t, 3)
        setVal(to * eased)
        if (t < 1) raf = requestAnimationFrame(step)
        else setVal(to)
      }
      raf = requestAnimationFrame(step)
    }, delay)
    return () => {
      clearTimeout(startTimer)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [to, duration, delay])

  return val.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export default function Stat({ value, unit, prefix, label, decimals = 0, delay = 0 }) {
  const display = useCountUp(value, { decimals, delay })
  return (
    <div className="stat">
      <span className="stat__value">
        {prefix}
        {display}
        {unit ? <span className="u">{unit}</span> : null}
      </span>
      <span className="stat__label">{label}</span>
    </div>
  )
}
