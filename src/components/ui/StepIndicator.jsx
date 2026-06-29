import { IconCheck } from '../icons.jsx'

export default function StepIndicator({ steps, current }) {
  return (
    <div className="steps" role="list" aria-label="Progresso do cadastro">
      {steps.map((label, i) => {
        const done = i < current
        const active = i === current
        const state = done ? 'step--done' : active ? 'step--active' : ''
        return (
          <div className="step-wrap" key={i} style={{ display: 'contents' }}>
            <div
              className={`step ${state}`}
              role="listitem"
              aria-label={`Etapa ${i + 1}: ${label}`}
              aria-current={active ? 'step' : undefined}
            >
              <span className="step__dot">{done ? <IconCheck /> : i + 1}</span>
            </div>
            {i < steps.length - 1 && <span className={`step__line${done ? ' step--done' : ''}`} />}
          </div>
        )
      })}
    </div>
  )
}
