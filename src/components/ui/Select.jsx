import { useState } from 'react'
import { IconChevronDown, IconAlert } from '../icons.jsx'

export default function Select({
  id,
  label,
  icon: Icon,
  value,
  onChange,
  onBlur,
  error,
  hint,
  placeholder = 'Selecione',
  options = [],
}) {
  const [focused, setFocused] = useState(false)
  const showError = Boolean(error)
  const isPlaceholder = !value
  const hasMsg = showError || Boolean(hint)
  const msgId = `${id}-msg`

  const cls = ['field', focused && 'field--focused', showError && 'field--error', value && 'field--valid']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={cls}>
      {label && (
        <label className="field__label" htmlFor={id}>
          <span>{label}</span>
        </label>
      )}
      <div className="field__control">
        {Icon && (
          <span className="field__icon" aria-hidden="true">
            <Icon />
          </span>
        )}
        <div className="select-wrap">
          <select
            id={id}
            className={`select${isPlaceholder ? ' select--placeholder' : ''}`}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={(e) => {
              setFocused(false)
              onBlur?.(e)
            }}
            aria-invalid={showError || undefined}
            aria-describedby={hasMsg ? msgId : undefined}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <span className="select-caret" aria-hidden="true">
            <IconChevronDown />
          </span>
        </div>
      </div>
      <span
        id={msgId}
        className={`field__msg ${showError ? 'field__msg--error' : 'field__msg--hint'}`}
        role={showError ? 'alert' : undefined}
      >
        {showError ? (
          <>
            <IconAlert />
            {error}
          </>
        ) : (
          hint || null
        )}
      </span>
    </div>
  )
}
