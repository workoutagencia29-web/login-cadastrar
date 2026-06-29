import { motion } from 'framer-motion'
import Logo from './Logo.jsx'
import Stat from './Stat.jsx'
import Typewriter from './Typewriter.jsx'
import { IconShield, IconLockSmall, IconBolt } from './icons.jsx'

const HEADLINE_LINES = [
  [{ text: 'Mova o dinheiro da sua' }],
  [{ text: 'empresa ' }, { text: 'sem fronteiras.', grad: true }],
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function BrandPanel() {
  return (
    <motion.aside className="brand" variants={container} initial="hidden" animate="show">
      <motion.div className="brand__top" variants={item}>
        <Logo height={30} />
        <span className="brand__badge">
          <span className="dot" />
          Infraestrutura de pagamentos
        </span>
      </motion.div>

      <motion.h1
        className="headline"
        variants={item}
        aria-label="Mova o dinheiro da sua empresa sem fronteiras."
      >
        <Typewriter lines={HEADLINE_LINES} speed={26} startDelay={350} />
      </motion.h1>

      <motion.p className="brand__sub" variants={item}>
        Pix, cartões e boleto em uma única plataforma. Liquidação rápida, conciliação
        automática e segurança de nível bancário — feita para empresas que escalam.
      </motion.p>

      <motion.div className="stats" variants={item}>
        <Stat value={2.4} decimals={1} prefix="R$ " unit=" bi" label="Transacionados em 2025" delay={300} />
        <Stat value={99.99} decimals={2} unit="%" label="Disponibilidade" delay={450} />
        <Stat value={12} prefix="+" unit=" mil" label="Empresas conectadas" delay={600} />
      </motion.div>

      <motion.div className="trust" variants={item}>
        <span className="trust__item">
          <IconShield /> PCI DSS Nível 1
        </span>
        <span className="trust__item">
          <IconLockSmall /> Criptografia ponta a ponta
        </span>
        <span className="trust__item">
          <IconBolt /> Liquidação em D+0
        </span>
      </motion.div>
    </motion.aside>
  )
}
