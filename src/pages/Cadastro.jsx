import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import AuthTabs from '../components/AuthTabs.jsx'
import StepIndicator from '../components/ui/StepIndicator.jsx'
import TextField from '../components/ui/TextField.jsx'
import PasswordField, { scorePassword } from '../components/ui/PasswordField.jsx'
import Select from '../components/ui/Select.jsx'
import Button from '../components/ui/Button.jsx'
import Checkbox from '../components/ui/Checkbox.jsx'
import FileUpload from '../components/ui/FileUpload.jsx'
import Choice from '../components/ui/Choice.jsx'
import {
  IconBuilding,
  IconBriefcase,
  IconUser,
  IconMail,
  IconPhone,
  IconSparkle,
  IconArrowRight,
  IconArrowLeft,
  IconLockSmall,
  IconCheck,
  IconAlert,
  IconId,
  IconCamera,
  IconFileText,
  IconShield,
} from '../components/icons.jsx'
import { maskCNPJ, isValidCNPJ } from '../lib/cnpj.js'
import { maskPhone, isValidPhone, isValidEmail } from '../lib/format.js'
import { LEGAL_LINKS, externalLink } from '../lib/links.js'

const page = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
}

const stepVariants = {
  enter: (d) => ({ opacity: 0, x: d > 0 ? 36 : -36 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] } },
  exit: (d) => ({ opacity: 0, x: d > 0 ? -36 : 36, transition: { duration: 0.18 } }),
}

const TIPOS = [
  { value: 'mei', label: 'MEI — Microempreendedor Individual' },
  { value: 'me', label: 'ME — Microempresa' },
  { value: 'epp', label: 'EPP — Empresa de Pequeno Porte' },
  { value: 'ltda', label: 'LTDA — Sociedade Limitada' },
  { value: 'slu', label: 'SLU — Sociedade Limitada Unipessoal' },
  { value: 'eireli', label: 'EIRELI' },
  { value: 'sa', label: 'S.A. — Sociedade Anônima' },
  { value: 'outro', label: 'Outro tipo' },
]

// 5 short steps so each fits the screen without scrolling
const STEP_FIELDS = [
  ['tipo', 'cnpj'],
  ['razao'],
  ['nome', 'email', 'telefone'],
  ['docFrente', 'docVerso'],
  ['selfie', 'contrato'],
  ['senha', 'confirm', 'terms'],
]
const STEP_NAMES = ['Empresa', 'Dados', 'Responsável', 'Identidade', 'Comprovantes', 'Segurança']
const LAST = STEP_FIELDS.length - 1

export default function Cadastro() {
  const navigate = useNavigate()
  const focusPending = useRef(false)
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [loading, setLoading] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const [touched, setTouched] = useState({})
  const [attempted, setAttempted] = useState({})
  const [form, setForm] = useState({
    tipo: '',
    cnpj: '',
    razao: '',
    fantasia: '',
    contrato: null,
    nome: '',
    email: '',
    telefone: '',
    docTipo: 'rg',
    docFrente: null,
    docVerso: null,
    selfie: null,
    senha: '',
    confirm: '',
    terms: false,
  })

  const set = (k, transform) => (e) => {
    const raw = e.target.value
    setForm((f) => ({ ...f, [k]: transform ? transform(raw) : raw }))
  }
  const setFile = (k) => (file) => {
    setForm((f) => ({ ...f, [k]: file }))
    setTouched((t) => ({ ...t, [k]: true }))
  }
  const blur = (k) => () => setTouched((t) => ({ ...t, [k]: true }))

  const docName = form.docTipo === 'cnh' ? 'CNH' : 'RG'
  const cnpjValid = isValidCNPJ(form.cnpj)
  const emailValid = isValidEmail(form.email)
  const phoneValid = isValidPhone(form.telefone)
  const { score } = scorePassword(form.senha)

  const errors = {
    tipo: !form.tipo ? 'Selecione o tipo de empresa.' : '',
    cnpj: !form.cnpj ? 'Informe o CNPJ.' : !cnpjValid ? 'CNPJ inválido. Confira os números.' : '',
    razao: form.razao.trim().length < 2 ? 'Informe a razão social.' : '',
    contrato: !form.contrato ? 'Envie o contrato social.' : '',
    nome: form.nome.trim().length < 3 ? 'Informe o nome do responsável.' : '',
    email: !form.email ? 'Informe o e-mail corporativo.' : !emailValid ? 'E-mail inválido.' : '',
    telefone: !form.telefone ? 'Informe um telefone.' : !phoneValid ? 'Telefone inválido.' : '',
    docFrente: !form.docFrente ? `Envie a frente do ${docName}.` : '',
    docVerso: !form.docVerso ? `Envie o verso do ${docName}.` : '',
    selfie: !form.selfie ? 'Envie a selfie com o documento.' : '',
    senha: !form.senha ? 'Crie uma senha.' : score < 2 ? 'Senha muito fraca — reforce-a.' : '',
    confirm: !form.confirm
      ? 'Confirme a senha.'
      : form.confirm !== form.senha
        ? 'As senhas não coincidem.'
        : '',
    terms: !form.terms ? 'É preciso aceitar os termos para continuar.' : '',
  }

  const show = (f) => (touched[f] || attempted[step]) && errors[f]
  const stepValid = (i) => STEP_FIELDS[i].every((f) => !errors[f])

  const next = () => {
    setAttempted((a) => ({ ...a, [step]: true }))
    if (!stepValid(step)) return
    focusPending.current = true
    setDir(1)
    setStep((s) => s + 1)
  }
  const back = () => {
    focusPending.current = true
    setDir(-1)
    setStep((s) => s - 1)
  }
  // Focuses the freshly-mounted step container after the transition (keyboard / SR).
  const stepFocusRef = (node) => {
    if (node && focusPending.current) {
      node.focus({ preventScroll: true })
      focusPending.current = false
    }
  }
  const submit = (e) => {
    e.preventDefault()
    if (step < LAST) return next()
    setAttempted((a) => ({ ...a, [LAST]: true }))
    if (!stepValid(LAST)) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setRedirecting(true)
    }, 1400)
  }

  // After the cadastro is sent, play the redirect animation then go to the painel.
  useEffect(() => {
    if (!redirecting) return
    const t = setTimeout(() => navigate('/painel'), 2700)
    return () => clearTimeout(t)
  }, [redirecting, navigate])

  if (redirecting) {
    return (
      <motion.div className="card" variants={page} initial="initial" animate="animate">
        <div className="redirect">
          <div className="redirect__orb" aria-hidden="true">
            <svg className="redirect__ring" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" />
            </svg>
            <span className="redirect__core">
              <IconCheck />
            </span>
          </div>
          <h2 className="redirect__title" role="status" aria-live="polite">
            Cadastro concluído!
          </h2>
          <p className="redirect__text">Preparando o seu painel Nummo…</p>
          <div className="redirect__bar" aria-hidden="true">
            <span />
          </div>
          <ul className="redirect__steps">
            <li className="ok">
              <IconCheck /> Dados e documentos recebidos
            </li>
            <li className="ok">
              <IconCheck /> Verificação de segurança
            </li>
            <li>
              <span className="redirect__mini" /> Redirecionando para o painel
            </li>
          </ul>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div className="card" variants={page} initial="initial" animate="animate" exit="exit">
      <AuthTabs active="cadastro" />

      <div className="card__head">
        <div className="card__eyebrow">
          <IconSparkle /> Etapa {step + 1} de {STEP_NAMES.length} · {STEP_NAMES[step]}
        </div>
        <h2 className="card__title">Crie a conta da sua empresa</h2>
      </div>

      <StepIndicator steps={STEP_NAMES} current={step} />

      <form className="form" onSubmit={submit} noValidate>
        <p className="sr-only" aria-live="polite">{`Etapa ${step + 1} de ${STEP_NAMES.length}: ${STEP_NAMES[step]}`}</p>
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={step}
            custom={dir}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="form"
            ref={stepFocusRef}
            tabIndex={-1}
            aria-label={`Etapa ${step + 1} de ${STEP_NAMES.length}: ${STEP_NAMES[step]}`}
          >
            {step === 0 && (
              <>
                <Select
                  id="cad-tipo"
                  label="Tipo de empresa"
                  icon={IconBriefcase}
                  placeholder="Selecione o tipo de CNPJ"
                  options={TIPOS}
                  value={form.tipo}
                  onChange={set('tipo')}
                  onBlur={blur('tipo')}
                  error={show('tipo')}
                />
                <TextField
                  id="cad-cnpj"
                  label="CNPJ"
                  icon={IconBuilding}
                  inputMode="numeric"
                  placeholder="00.000.000/0000-00"
                  value={form.cnpj}
                  onChange={set('cnpj', maskCNPJ)}
                  onBlur={blur('cnpj')}
                  valid={cnpjValid}
                  error={show('cnpj')}
                />
              </>
            )}

            {step === 1 && (
              <>
                <TextField
                  id="cad-razao"
                  label="Razão social"
                  icon={IconBuilding}
                  autoComplete="organization"
                  placeholder="Nome empresarial registrado"
                  value={form.razao}
                  onChange={set('razao')}
                  onBlur={blur('razao')}
                  valid={form.razao.trim().length >= 2}
                  error={show('razao')}
                />
                <TextField
                  id="cad-fantasia"
                  label={
                    <>
                      Nome fantasia <span style={{ color: 'var(--text-ghost)' }}>(opcional)</span>
                    </>
                  }
                  icon={IconSparkle}
                  placeholder="Como sua marca é conhecida"
                  value={form.fantasia}
                  onChange={set('fantasia')}
                />
              </>
            )}

            {step === 2 && (
              <>
                <TextField
                  id="cad-nome"
                  label="Nome do responsável"
                  icon={IconUser}
                  autoComplete="name"
                  placeholder="Nome completo"
                  value={form.nome}
                  onChange={set('nome')}
                  onBlur={blur('nome')}
                  valid={form.nome.trim().length >= 3}
                  error={show('nome')}
                />
                <TextField
                  id="cad-email"
                  label="E-mail corporativo"
                  icon={IconMail}
                  type="email"
                  autoComplete="email"
                  placeholder="voce@suaempresa.com.br"
                  value={form.email}
                  onChange={set('email')}
                  onBlur={blur('email')}
                  valid={emailValid}
                  error={show('email')}
                />
                <TextField
                  id="cad-tel"
                  label="Telefone"
                  icon={IconPhone}
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="(11) 90000-0000"
                  value={form.telefone}
                  onChange={set('telefone', maskPhone)}
                  onBlur={blur('telefone')}
                  valid={phoneValid}
                  error={show('telefone')}
                />
              </>
            )}

            {step === 3 && (
              <>
                <p className="form__note">
                  <IconShield />
                  Exigência de compliance (KYC). Envie fotos nítidas, sem cortes nem reflexos.
                </p>
                <Choice
                  id="cad-doctipo"
                  label="Documento do responsável"
                  value={form.docTipo}
                  onChange={(v) => setForm((f) => ({ ...f, docTipo: v }))}
                  options={[
                    { value: 'rg', label: 'RG' },
                    { value: 'cnh', label: 'CNH' },
                  ]}
                />
                <div className="row">
                  <FileUpload
                    id="cad-doc-frente"
                    label={`${docName} — frente`}
                    hint="JPG ou PNG"
                    icon={IconId}
                    value={form.docFrente}
                    onChange={setFile('docFrente')}
                    error={show('docFrente')}
                  />
                  <FileUpload
                    id="cad-doc-verso"
                    label={`${docName} — verso`}
                    hint="JPG ou PNG"
                    icon={IconId}
                    value={form.docVerso}
                    onChange={setFile('docVerso')}
                    error={show('docVerso')}
                  />
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <p className="form__note">
                  <IconShield />
                  A selfie deve mostrar seu rosto e o documento de forma legível.
                </p>
                <FileUpload
                  id="cad-selfie"
                  label="Selfie segurando o documento"
                  hint="Rosto e documento visíveis"
                  accept="image/*"
                  capture="user"
                  icon={IconCamera}
                  value={form.selfie}
                  onChange={setFile('selfie')}
                  error={show('selfie')}
                />
                <FileUpload
                  id="cad-contrato"
                  label="Contrato social"
                  hint="PDF ou imagem · até 10 MB"
                  accept="application/pdf,image/*"
                  icon={IconFileText}
                  value={form.contrato}
                  onChange={setFile('contrato')}
                  error={show('contrato')}
                />
              </>
            )}

            {step === 5 && (
              <>
                <PasswordField
                  id="cad-senha"
                  label="Crie uma senha"
                  autoComplete="new-password"
                  placeholder="Mínimo 8 caracteres"
                  value={form.senha}
                  onChange={set('senha')}
                  onBlur={blur('senha')}
                  error={show('senha')}
                  strength
                  requirements
                />
                <PasswordField
                  id="cad-confirm"
                  label="Confirme a senha"
                  autoComplete="new-password"
                  placeholder="Repita a senha"
                  value={form.confirm}
                  onChange={set('confirm')}
                  onBlur={blur('confirm')}
                  error={show('confirm')}
                  hint={form.confirm && form.confirm === form.senha ? 'As senhas coincidem.' : undefined}
                />
                <div style={{ marginTop: 2 }}>
                  <Checkbox
                    id="cad-terms"
                    checked={form.terms}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, terms: e.target.checked }))
                      setTouched((t) => ({ ...t, terms: true }))
                    }}
                  >
                    Li e concordo com os{' '}
                    <a href={LEGAL_LINKS.termos} {...externalLink}>
                      Termos de Uso
                    </a>
                    , a{' '}
                    <a href={LEGAL_LINKS.privacidade} {...externalLink}>
                      Política de Privacidade
                    </a>{' '}
                    e autorizo a verificação do CNPJ e dos documentos.
                  </Checkbox>
                  {show('terms') && (
                    <span className="field__msg field__msg--error" role="alert" style={{ marginTop: 8 }}>
                      <IconAlert />
                      {errors.terms}
                    </span>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="btn-row">
          {step > 0 && (
            <Button variant="ghost" onClick={back} leftIcon={<IconArrowLeft />}>
              Voltar
            </Button>
          )}
          <Button type="submit" block loading={loading} rightIcon={<IconArrowRight />}>
            {step < LAST ? 'Continuar' : 'Enviar cadastro'}
          </Button>
        </div>

        <div className="secured">
          <IconLockSmall /> Seus dados e documentos são protegidos com criptografia de ponta a ponta
        </div>
      </form>
    </motion.div>
  )
}
