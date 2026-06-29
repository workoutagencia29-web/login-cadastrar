import { useState } from 'react'
import { IconLock, IconEye, IconEyeOff, IconAlert, IconCheck } from '../icons.jsx'

export function scorePassword(pw = '') {
  const checks = {
    length: pw.length >= 8,
    upper: /[A-Z]/.test(pw) && /[a-z]/.test(pw),
    number: /\d/.test(pw),
    symbol: /[^A-Za-z0-9]/.test(pw),
  }
  let score = Object.values(checks).filter(Boolean).length
  if (pw.length >= 12 && score >= 3) score = 4
  if (pw.length === 0) score = 0
  return { score, checks }
}

const LABELS = ['—', 'Fraca', 'Razoável', 'Boa', 'Forte']

export default function PasswordField({
  id,
  label,
  labelAside,
  value,
  onChange,
  onBlur,
  error,
  hint,
  strength = false,
  requirements = false,
  ...rest
}) {
  const [focused, setFocused] = useState(false)
  const [show, setShow] = useState(false)
  const showError = Boolean(error)
  const hasMsg = showError || Boolean(hint)
  const msgId = `${id}-msg`
  const { score, checks } = scorePassword(value || '')

  const cls = ['field', focused && 'field--focused', showError && 'field--error']
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
        <span className="field__icon" aria-hidden="true">
          <IconLock />
        </span>
        <input
          id={id}
          className="input"
          type={show ? 'text' : 'password'}
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
        <span className="field__affix">
          <button
            type="button"
            className="field__toggle"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setShow((s) => !s)}
            aria-label={show ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {show ? <IconEyeOff /> : <IconEye />}
          </button>
        </span>
      </div>

      {strength ? (
        <div className="pw">
          <div className="pw__bars" aria-hidden="true">
            {[1, 2, 3, 4].map((lvl) => (
              <span key={lvl} className={`pw__bar${score >= lvl ? ' on' : ''}`} data-level={score} />
            ))}
          </div>
          <div className="pw__meta">
            <span>Força da senha</span>
            <span className="pw__label" data-level={score} aria-live="polite">
              {value ? LABELS[score] : '—'}
            </span>
          </div>
          {requirements && (
            <ul className="reqs">
              <Req ok={checks.length}>Mínimo 8 caracteres</Req>
              <Req ok={checks.upper}>Maiúscula e minúscula</Req>
              <Req ok={checks.number}>Um número</Req>
              <Req ok={checks.symbol}>Um símbolo</Req>
            </ul>
          )}
        </div>
      ) : null}

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

function Req({ ok, children }) {
  return (
    <li className={`req${ok ? ' req--ok' : ''}`}>
      <IconCheck />
      {children}
    </li>
  )
}
