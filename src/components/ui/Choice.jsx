/* Two-option segmented selector (e.g. RG / CNH). */
export default function Choice({ options, value, onChange, label, id }) {
  const idx = options.findIndex((o) => o.value === value)
  return (
    <div className="field">
      {label && (
        <span className="field__label" id={`${id}-label`}>
          {label}
        </span>
      )}
      <div className="seg seg--choice" role="radiogroup" aria-labelledby={label ? `${id}-label` : undefined}>
        {idx >= 0 && <span className="seg__pill" style={idx === 0 ? { left: 4 } : { right: 4 }} aria-hidden="true" />}
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={value === o.value}
            className={`seg__item${value === o.value ? ' seg__item--active' : ''}`}
            onClick={() => onChange(o.value)}
          >
            {o.icon}
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}
