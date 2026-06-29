import { useState } from 'react'
import { IconCheckCircle, IconAlert } from '../icons.jsx'

export default function TextField({
  id,
  label,
  labelAside,
  icon: Icon,
  value,
  onChange,
  onBlur,
  error,
  valid,
  hint,
  rightSlot,
  ...rest
}) {
  const [focused, setFocused] = useState(false)
  const showError = Boolean(error)
  const showValid = valid && !showError
  const hasMsg = showError || Boolean(hint)
  const msgId = `${id}-msg`

  const cls = [
    'field',
    Icon ? '' : 'field--plain',
    focused && 'field--focused',
    showError && 'field--error',
    showValid && 'field--valid',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={cls}>
      {label && (
        <label className="field__label" htmlFor={id}>
          <span>{label}</span>
          {labelAside}
        </label>
      )}
      <div className="field__control">
        {Icon && (
          <span className="field__icon" aria-hidden="true">
            <Icon />
          </span>
        )}
        <input
          id={id}
          className="input"
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false)
            onBlur?.(e)
          }}
          aria-invalid={showError || undefined}
          aria-describedby={hasMsg ? msgId : undefined}
          {...rest}
        />
        {(showValid || rightSlot) && (
          <span className="field__affix">
            {showValid && (
              <span className="field__check" aria-hidden="true">
                <IconCheckCircle />
              </span>
            )}
            {rightSlot}
          </span>
        )}
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
