import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import AuthLayout from './components/AuthLayout.jsx'
import Login from './pages/Login.jsx'
import Cadastro from './pages/Cadastro.jsx'
import Dashboard from './pages/Dashboard.jsx'

export default function App() {
  const location = useLocation()

  // Dashboard is a full-screen route without the auth shell (world map + brand panel).
  if (location.pathname === '/painel') {
    return <Dashboard />
  }

  return (
    <AuthLayout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate to="/entrar" replace />} />
          <Route path="/entrar" element={<Login />} />
          <Route path="/login" element={<Navigate to="/entrar" replace />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="*" element={<Navigate to="/entrar" replace />} />
        </Routes>
      </AnimatePresence>
    </AuthLayout>
  )
}
