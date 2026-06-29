import { useMemo } from 'react'
import mapData from '../data/worldmap.json'

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Quadratic-bezier arc lifted toward the top, mimicking a great-circle route. */
function arcPath({ x1, y1, x2, y2 }) {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const dist = Math.hypot(x2 - x1, y2 - y1)
  const lift = Math.min(dist * 0.28, 16)
  const cy = my - lift
  return `M ${x1} ${y1} Q ${mx} ${cy} ${x2} ${y2}`
}

export default function WorldMap() {
  const { width, height, dots, hubs, arcs } = mapData

  const arcDefs = useMemo(() => arcs.map((a) => ({ ...a, d: arcPath(a) })), [arcs])

  // Collapse ~2500 dots into ONE <path> (each dot drawn as a tiny circle) — keeps
  // perfect coordinate alignment with hubs/arcs while removing thousands of DOM nodes.
  const dotsPath = useMemo(() => {
    const r = 0.42
    let d = ''
    for (let i = 0; i < dots.length; i++) {
      const x = dots[i][0]
      const y = dots[i][1]
      d += `M${x - r},${y}a${r},${r} 0 1,0 ${r * 2},0a${r},${r} 0 1,0 ${-r * 2},0`
    }
    return d
  }, [dots])

  return (
    <div className="worldmap" aria-hidden="true">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2f6bff" stopOpacity="0" />
            <stop offset="50%" stopColor="#5b8bff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2f6bff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="hubGlow">
            <stop offset="0%" stopColor="#7aa0ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2f6bff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* base dot field (single path — see dotsPath) */}
        <path className="worldmap__dots" d={dotsPath} fill="#2f6bff" />

        {/* connection arcs from São Paulo */}
        <g className="worldmap__arcs">
          {arcDefs.map((a, i) => (
            <g key={i}>
              <path d={a.d} fill="none" stroke="url(#arcGrad)" strokeWidth="0.4" strokeLinecap="round" />
              {!prefersReducedMotion && (
                <circle r="0.7" fill="#cfe0ff">
                  <animateMotion
                    dur={`${3.6 + i * 0.5}s`}
                    begin={`${i * 0.8}s`}
                    repeatCount="indefinite"
                    path={a.d}
                    keyPoints="0;1"
                    keyTimes="0;1"
                    calcMode="spline"
                    keySplines="0.45 0 0.55 1"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.1;0.85;1"
                    dur={`${3.6 + i * 0.5}s`}
                    begin={`${i * 0.8}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          ))}
        </g>

        {/* financial hubs */}
        <g className="worldmap__hubs">
          {hubs.map((h, i) => {
            const core = h.home ? '#ffffff' : '#7aa0ff'
            const coreR = h.home ? 1.05 : 0.8
            return (
              <g key={h.name} transform={`translate(${h.x} ${h.y})`}>
                <circle r="3.4" fill="url(#hubGlow)" opacity={h.home ? 0.55 : 0.32} />
                {!prefersReducedMotion && (
                  <circle r={coreR} fill="none" stroke={core} strokeWidth="0.32" opacity="0.8">
                    <animate
                      attributeName="r"
                      values={`${coreR};${coreR + 3.4}`}
                      dur="2.8s"
                      begin={`${i * 0.35}s`}
                      repeatCount="indefinite"
                      calcMode="spline"
                      keySplines="0.22 1 0.36 1"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.8;0"
                      dur="2.8s"
                      begin={`${i * 0.35}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
                <circle r={coreR} fill={core} />
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}
