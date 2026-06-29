import { useEffect, useRef, useState } from 'react'
import { IconUpload, IconX, IconFileText, IconCheckCircle, IconAlert } from '../icons.jsx'

function prettySize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function FileUpload({
  id,
  label,
  hint,
  accept = 'image/*',
  capture,
  value,
  onChange,
  error,
  icon: Icon = IconUpload,
}) {
  const inputRef = useRef(null)
  const [drag, setDrag] = useState(false)
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    if (value && value.type && value.type.startsWith('image/')) {
      const url = URL.createObjectURL(value)
      setPreview(url)
      return () => URL.revokeObjectURL(url)
    }
    setPreview(null)
  }, [value])

  const pick = (file) => file && onChange(file)
  const showError = Boolean(error)
  const has = Boolean(value)
  const msgId = `${id}-msg`

  const cls = [
    'upload',
    drag && 'upload--drag',
    has && 'upload--filled',
    showError && 'upload--error',
  ]
    .filter(Boolean)
    .join(' ')

  const openPicker = () => inputRef.current?.click()

  return (
    <div className="field">
      {label && (
        <span className="field__label" id={`${id}-label`}>
          {label}
        </span>
      )}
      <div
        className={cls}
        role="button"
        tabIndex={0}
        aria-labelledby={`${id}-label`}
        aria-describedby={showError || hint ? msgId : undefined}
        onClick={openPicker}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            openPicker()
          }
        }}
        onDragOver={(e) => {
          e.preventDefault()
          setDrag(true)
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDrag(false)
          pick(e.dataTransfer.files?.[0])
        }}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          capture={capture}
          onChange={(e) => pick(e.target.files?.[0])}
          hidden
        />

        {has ? (
          <div className="upload__file">
            <div className="upload__thumb">
              {preview ? <img src={preview} alt="" /> : <IconFileText />}
            </div>
            <div className="upload__meta">
              <span className="upload__name">{value.name}</span>
              <span className="upload__size">{prettySize(value.size)} · enviado</span>
            </div>
            <span className="upload__check" aria-hidden="true">
              <IconCheckCircle />
            </span>
            <button
              type="button"
              className="upload__remove"
              aria-label="Remover arquivo"
              onClick={(e) => {
                e.stopPropagation()
                onChange(null)
                if (inputRef.current) inputRef.current.value = ''
              }}
            >
              <IconX />
            </button>
          </div>
        ) : (
          <div className="upload__empty">
            <span className="upload__icon" aria-hidden="true">
              <Icon />
            </span>
            <span className="upload__title">Arraste ou clique para enviar</span>
            {hint && <span className="upload__hint">{hint}</span>}
          </div>
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
        ) : null}
      </span>
    </div>
  )
}
