export default function Button({
  children,
  variant = 'primary',
  block = false,
  loading = false,
  leftIcon,
  rightIcon,
  className = '',
  type = 'button',
  disabled,
  ...rest
}) {
  const cls = [
    'btn',
    `btn--${variant}`,
    block && 'btn--block',
    loading && 'btn--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={cls} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {loading && <span className="btn__spin" aria-hidden="true" />}
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  )
}
