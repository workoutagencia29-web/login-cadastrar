import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from '../components/Logo.jsx'
import Button from '../components/ui/Button.jsx'
import {
  IconTrendUp,
  IconCheckCircle,
  IconBriefcase,
  IconWallet,
  IconBell,
  IconChat,
  IconClock,
  IconLockSmall,
  IconArrowLeft,
  IconArrowRight,
} from '../components/icons.jsx'
import '../styles/dashboard.css'

const KPIS = [
  { icon: IconTrendUp, value: 'R$ 3.540,00', delta: '+25,5%', label: 'Total de vendas' },
  { icon: IconCheckCircle, value: '1.150', delta: '+4,1%', label: 'Vendas aprovadas' },
  { icon: IconBriefcase, value: 'R$ 500,00', delta: '+5,1%', label: 'Ticket médio' },
  { icon: IconWallet, value: 'R$ 254.782,45', delta: '+25,5%', label: 'Saldo disponível' },
]

const LIVE = [
  { name: 'Marina Alves', id: '#TXN929744', value: 'R$ 1.191,44' },
  { name: 'Rafael Costa', id: '#TXN928511', value: 'R$ 263,20' },
  { name: 'Camila Souza', id: '#TXN928648', value: 'R$ 635,07' },
]

// smooth area-chart path (decorative)
const LINE = 'M0 78 C 40 78, 60 40, 100 46 S 160 18, 200 30 S 260 6, 300 22 S 360 40, 400 16'
const AREA = `${LINE} L 400 110 L 0 110 Z`

const WHATSAPP_URL =
  'https://wa.me/5511912002801?text=' +
  encodeURIComponent(
    'Olá! Acabei de criar a conta da minha empresa na Nummo e gostaria de liberar o acesso ao painel.',
  )

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="dash">
      {/* ---- Blurred dashboard behind ---- */}
      <main className="dash__app" aria-hidden="true">
        <header className="dash__top">
          <div>
            <h1 className="dash__hi">Olá, Pedro</h1>
            <p className="dash__sub">Gestão da sua conta</p>
          </div>
          <div className="dash__tools">
            <span className="dash__icbtn">
              <IconBell />
            </span>
            <span className="dash__avatar">P</span>
          </div>
        </header>

        <section className="dash__kpis">
          {KPIS.map((k) => (
            <div className="dcard kpi" key={k.label}>
              <span className="kpi__ic">
                <k.icon />
              </span>
              <span className="kpi__delta">{k.delta}</span>
              <div className="kpi__value">{k.value}</div>
              <div className="kpi__label">{k.label}</div>
            </div>
          ))}
        </section>

        <section className="dash__grid">
          <div className="dcard chart">
            <div className="dcard__head">
              <h3>Desempenho de vendas</h3>
              <span className="pill">Hoje</span>
            </div>
            <svg viewBox="0 0 400 110" className="chart__svg" preserveAspectRatio="none">
              <defs>
                <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2f6bff" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#2f6bff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={AREA} fill="url(#cg)" />
              <path d={LINE} fill="none" stroke="#5b8bff" strokeWidth="2.5" />
            </svg>
          </div>

          <div className="dcard donut">
            <div className="dcard__head">
              <h3>Conversões</h3>
            </div>
            <div className="donut__wrap">
              <svg viewBox="0 0 120 120" className="donut__svg">
                <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(246,249,252,0.08)" strokeWidth="14" />
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  fill="none"
                  stroke="#2f6bff"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray="220 302"
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div className="donut__center">
                <b>121</b>
                <span>Total</span>
              </div>
            </div>
          </div>
        </section>

        <section className="dash__grid dash__grid--bottom">
          <div className="dcard balance">
            <span className="balance__label">Meu saldo disponível</span>
            <div className="balance__value">R$ 254.782,45</div>
            <button className="balance__btn" type="button">
              <IconArrowRight /> Solicitar saque
            </button>
          </div>

          <div className="dcard live">
            <div className="dcard__head">
              <h3>Vendas ao vivo</h3>
              <span className="live__tag">● Ao vivo</span>
            </div>
            <ul className="live__list">
              {LIVE.map((t) => (
                <li key={t.id}>
                  <div>
                    <span className="live__name">{t.name}</span>
                    <span className="live__id">{t.id}</span>
                  </div>
                  <span className="live__val">{t.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <div className="dash__scrim" />

      {/* ---- Pending-approval overlay ---- */}
      <div className="pending" role="dialog" aria-modal="true" aria-labelledby="pending-title">
        <motion.div
          className="pending__card"
          initial={{ opacity: 0, y: 22, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pending__brand">
            <Logo height={26} />
          </div>

          <span className="pending__badge">
            <span className="pending__dot" />
            Conta em análise
          </span>

          <div className="pending__icon" aria-hidden="true">
            <IconClock />
          </div>

          <h2 className="pending__title" id="pending-title">
            Sua conta está quase lá, Pedro
          </h2>
          <p className="pending__text">
            Recebemos seu cadastro e seus documentos. Para liberar o acesso ao painel, fale com o
            seu <b>gerente de contas Nummo</b> — ele conclui a aprovação em instantes.
          </p>

          <div className="pending__actions">
            <Button
              block
              leftIcon={<IconChat />}
              onClick={() => window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer')}
            >
              Falar com meu gerente
            </Button>
            <Button block variant="ghost" leftIcon={<IconArrowLeft />} onClick={() => navigate('/entrar')}>
              Sair
            </Button>
          </div>

          <div className="pending__foot">
            <IconLockSmall /> Seus dados estão protegidos e em verificação de compliance
          </div>
        </motion.div>
      </div>
    </div>
  )
}
