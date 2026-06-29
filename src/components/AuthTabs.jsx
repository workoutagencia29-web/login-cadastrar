import { Link } from 'react-router-dom'

export default function AuthTabs({ active }) {
  const isEntrar = active === 'entrar'
  return (
    <nav className="seg" aria-label="Acessar ou criar conta">
      <span className="seg__pill" style={isEntrar ? { left: 4 } : { right: 4 }} aria-hidden="true" />
      <Link
        to="/entrar"
        aria-current={isEntrar ? 'page' : undefined}
        className={`seg__item${isEntrar ? ' seg__item--active' : ''}`}
      >
        Entrar
      </Link>
      <Link
        to="/cadastro"
        aria-current={!isEntrar ? 'page' : undefined}
        className={`seg__item${!isEntrar ? ' seg__item--active' : ''}`}
      >
        Criar conta
      </Link>
    </nav>
  )
}
