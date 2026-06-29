import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import AuthTabs from '../components/AuthTabs.jsx'
import TextField from '../components/ui/TextField.jsx'
import PasswordField from '../components/ui/PasswordField.jsx'
import Button from '../components/ui/Button.jsx'
import Checkbox from '../components/ui/Checkbox.jsx'
import {
  IconMail,
  IconArrowRight,
  IconArrowLeft,
  IconLockSmall,
  IconCheckCircle,
} from '../components/icons.jsx'
import { isValidEmail } from '../lib/format.js'

const page = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
}

const swap = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, x: -24, transition: { duration: 0.18 } },
}

export default function Login() {
  const [view, setView] = useState('login') // 'login' | 'recover'
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [remember, setRemember] = useState(true)
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [sent, setSent] = useState(false)

  const emailValid = isValidEmail(email)
  const errors = {
    email: !email ? 'Informe seu e-mail.' : !emailValid ? 'E-mail inválido.' : '',
    senha: !senha ? 'Informe sua senha.' : '',
  }
  const show = (f) => (touched[f] || submitted) && errors[f]

  const goRecover = () => {
    setView('recover')
    setSubmitted(false)
    setTouched({})
  }
  const backToLogin = () => {
    setView('login')
    setSubmitted(false)
    setSent(false)
    setTouched({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    if (errors.email || errors.senha) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setDone(true)
    }, 1500)
  }

  const handleRecover = (e) => {
    e.preventDefault()
    setSubmitted(true)
    if (errors.email) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 1400)
  }

  // ---- Login success ----
  if (done) {
    return (
      <motion.div className="card" variants={page} initial="initial" animate="animate" exit="exit">
        <div className="success" role="status" aria-live="polite">
          <div className="success__ring" aria-hidden="true">
            <IconCheckCircle />
          </div>
          <h2 className="success__title" tabIndex={-1} ref={(n) => n && n.focus({ preventScroll: true })}>
            Acesso liberado
          </h2>
          <p className="success__text">
            Autenticação concluída com segurança. Sua sessão Nummo está pronta — o painel abriria
            agora em um ambiente conectado.
          </p>
          <span className="success__chip">
            <IconLockSmall style={{ width: 15, height: 15, color: 'var(--blue-bright)' }} />
            Sessão verificada
          </span>
          <div style={{ width: '100%', marginTop: 18 }}>
            <Button block variant="ghost" onClick={() => setDone(false)} leftIcon={<IconArrowLeft />}>
              Voltar ao login
            </Button>
          </div>
        </div>
      </motion.div>
    )
  }

  // ---- Recover password ----
  if (view === 'recover') {
    return (
      <motion.div className="card" variants={page} initial="initial" animate="animate" exit="exit">
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div key="sent" variants={swap} initial="initial" animate="animate" exit="exit">
              <div className="success" role="status" aria-live="polite">
                <div className="success__ring" aria-hidden="true">
                  <IconMail />
                </div>
                <h2 className="success__title" tabIndex={-1} ref={(n) => n && n.focus({ preventScroll: true })}>
                  Link enviado
                </h2>
                <p className="success__text">
                  Se houver uma conta para <b>{email}</b>, você receberá um link para redefinir a
                  senha em instantes. Confira também a caixa de spam.
                </p>
                <div style={{ width: '100%', marginTop: 18 }}>
                  <Button block onClick={backToLogin} leftIcon={<IconArrowLeft />}>
                    Voltar ao login
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="form" variants={swap} initial="initial" animate="animate" exit="exit">
              <button type="button" className="card__back" onClick={backToLogin}>
                <IconArrowLeft /> Voltar
              </button>
              <div className="card__head">
                <div className="card__eyebrow">
                  <IconLockSmall /> Recuperar acesso
                </div>
                <h2 className="card__title">Esqueceu a senha?</h2>
                <p className="card__desc">
                  Informe o e-mail cadastrado e enviaremos um link para redefinir sua senha.
                </p>
              </div>

              <form className="form" onSubmit={handleRecover} noValidate>
                <TextField
                  id="recover-email"
                  label="E-mail"
                  icon={IconMail}
                  type="email"
                  inputMode="email"
                  autoComplete="username"
                  placeholder="voce@suaempresa.com.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  valid={emailValid}
                  error={show('email')}
                />

                <Button type="submit" block loading={loading} rightIcon={<IconArrowRight />}>
                  Enviar link de redefinição
                </Button>

                <div className="secured">
                  <IconLockSmall /> O link de redefinição expira em 30 minutos
                </div>
              </form>

              <div className="card__alt">
                Lembrou a senha?{' '}
                <button type="button" onClick={backToLogin}>
                  Fazer login
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  // ---- Login ----
  return (
    <motion.div className="card" variants={page} initial="initial" animate="animate" exit="exit">
      <AuthTabs active="entrar" />

      <div className="card__head">
        <div className="card__eyebrow">
          <IconLockSmall /> Área da empresa
        </div>
        <h2 className="card__title">Bem-vindo de volta</h2>
        <p className="card__desc">Acesse o painel da sua empresa para gerir pagamentos e saques.</p>
      </div>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <TextField
          id="login-email"
          label="E-mail"
          icon={IconMail}
          type="email"
          inputMode="email"
          autoComplete="username"
          placeholder="voce@suaempresa.com.br"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          valid={emailValid}
          error={show('email')}
        />

        <PasswordField
          id="login-senha"
          label="Senha"
          labelAside={
            <button type="button" className="link" onClick={goRecover}>
              Esqueci minha senha
            </button>
          }
          autoComplete="current-password"
          placeholder="Sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, senha: true }))}
          error={show('senha')}
        />

        <div className="form__aux">
          <Checkbox id="remember" checked={remember} onChange={(e) => setRemember(e.target.checked)}>
            Manter conectado
          </Checkbox>
        </div>

        <Button type="submit" block loading={loading} rightIcon={<IconArrowRight />}>
          Entrar
        </Button>

        <div className="secured">
          <IconLockSmall /> Conexão segura · criptografia de 256 bits
        </div>
      </form>

      <div className="card__alt">
        Ainda não tem conta? <Link to="/cadastro">Criar conta da empresa</Link>
      </div>
    </motion.div>
  )
}
