import { useMemo, useState } from 'react'
import WorldMap from './WorldMap.jsx'
import BrandPanel from './BrandPanel.jsx'
import Logo from './Logo.jsx'
import { IconCookie } from './icons.jsx'
import { LEGAL_LINKS, externalLink } from '../lib/links.js'

function Particles() {
  const dots = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${Math.round(Math.random() * 100)}%`,
        top: `${Math.round(5 + Math.random() * 90)}%`,
        size: `${(Math.random() * 2 + 1.5).toFixed(1)}px`,
        duration: `${(Math.random() * 5 + 6).toFixed(1)}s`,
        delay: `${(Math.random() * 7).toFixed(1)}s`,
        opacity: (Math.random() * 0.4 + 0.2).toFixed(2),
      })),
    [],
  )
  return (
    <div className="particles" aria-hidden="true">
      {dots.map((d) => (
        <span
          key={d.id}
          className="particle"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            opacity: d.opacity,
            animationDuration: d.duration,
            animationDelay: d.delay,
          }}
        />
      ))}
    </div>
  )
}

function CookieConsent({ onAccept }) {
  return (
    <div className="cookiebar" role="region" aria-label="Aviso de cookies">
      <div className="cookiebar__inner">
        <span className="cookiebar__icon" aria-hidden="true">
          <IconCookie />
        </span>
        <p className="cookiebar__text">
          Usamos cookies para melhorar sua experiência e proteger suas transações. Ao continuar,
          você concorda com nossa{' '}
          <a href={LEGAL_LINKS.cookies} {...externalLink}>
            Política de Cookies
          </a>
          .
        </p>
        <div className="cookiebar__actions">
          <a href={LEGAL_LINKS.cookies} {...externalLink} className="btn btn--ghost btn--sm">
            Preferências
          </a>
          <button type="button" className="btn btn--primary btn--sm" onClick={() => onAccept('accepted')}>
            Aceitar
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AuthLayout({ children }) {
  const [cookieOpen, setCookieOpen] = useState(() => {
    try {
      return !localStorage.getItem('nummo_cookie_consent')
    } catch {
      return true
    }
  })
  const acceptCookies = (choice) => {
    try {
      localStorage.setItem('nummo_cookie_consent', choice)
    } catch {
      /* ignore */
    }
    setCookieOpen(false)
  }
  return (
    <div className={`app${cookieOpen ? ' app--cookiebar' : ''}`}>
      <div className="bg" aria-hidden="true">
        <div className="bg__grid" />
        <div className="bg__glow bg__glow--1" />
        <div className="bg__glow bg__glow--2" />
        <WorldMap />
        <div className="bg__scrim" />
        <Particles />
        <div className="bg__vignette" />
        <div className="bg__grain" />
      </div>

      <main className="shell">
        <BrandPanel />

        <div className="brand__mobilebar">
          <Logo height={30} />
          <div>
            <h1 className="headline">
              Pagamentos <span className="grad">sem fronteiras.</span>
            </h1>
            <p className="brand__sub">A infraestrutura de pagamentos para empresas que escalam.</p>
          </div>
        </div>

        <div className="panel">{children}</div>
      </main>

      <footer className="legal">
        <nav className="legal__links" aria-label="Documentos legais">
          <a href={LEGAL_LINKS.termos} {...externalLink}>
            Termos
          </a>
          <a href={LEGAL_LINKS.privacidade} {...externalLink}>
            Privacidade
          </a>
          <a href={LEGAL_LINKS.compliance} {...externalLink}>
            Compliance
          </a>
          <a href={LEGAL_LINKS.cookies} {...externalLink}>
            Cookies
          </a>
        </nav>
        <div className="legal__meta">CNPJ 63.320.977/0001-06</div>
      </footer>

      {cookieOpen && <CookieConsent onAccept={acceptCookies} />}
    </div>
  )
}
