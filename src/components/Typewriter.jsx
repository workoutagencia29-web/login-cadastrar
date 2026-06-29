import { useEffect, useState } from 'react'

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Types `lines` out once (write-and-stop), keeping forced line breaks and the
   gradient segments. lines = [[{text, grad?}], ...] (one array per line). */
export default function Typewriter({ lines, speed = 42, startDelay = 450 }) {
  // flatten to a sequence of typed chars + line-break markers
  const flat = []
  lines.forEach((segs, li) => {
    segs.forEach((seg) => {
      for (const ch of seg.text) flat.push({ ch, grad: !!seg.grad })
    })
    if (li < lines.length - 1) flat.push({ br: true })
  })
  const total = flat.length

  const [count, setCount] = useState(reduced ? total : 0)
  const [hideCursor, setHideCursor] = useState(reduced)

  useEffect(() => {
    if (reduced) return
    let i = 0
    let timer
    const tick = () => {
      i += 1
      setCount(i)
      if (i < total) {
        timer = setTimeout(tick, flat[i] && flat[i].br ? 12 : speed)
      } else {
        timer = setTimeout(() => setHideCursor(true), 1300)
      }
    }
    const start = setTimeout(tick, startDelay)
    return () => {
      clearTimeout(start)
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const buildLines = (n) => {
    const out = [[]]
    for (let k = 0; k < n; k++) {
      const t = flat[k]
      if (t.br) {
        out.push([])
        continue
      }
      const line = out[out.length - 1]
      const last = line[line.length - 1]
      if (last && last.grad === t.grad) last.text += t.ch
      else line.push({ grad: t.grad, text: t.ch })
    }
    return out
  }

  const renderLines = (built, withCursor) =>
    built.map((line, li) => (
      <span className="tw__line" key={li}>
        {line.map((s, si) =>
          s.grad ? (
            <span className="grad" key={si}>
              {s.text}
            </span>
          ) : (
            <span key={si}>{s.text}</span>
          ),
        )}
        {withCursor && li === built.length - 1 && (
          <span className={`tw__cursor${hideCursor ? ' tw__cursor--hide' : ''}`} aria-hidden="true" />
        )}
      </span>
    ))

  return (
    <span className="tw" aria-hidden="true">
      <span className="tw__ghost">{renderLines(buildLines(total), false)}</span>
      <span className="tw__live">{renderLines(buildLines(count), true)}</span>
    </span>
  )
}
