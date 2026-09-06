import { useState, useEffect } from 'react'
import { Trophy } from 'lucide-react'
import { AppProvider, useApp } from './context/AppContext'
import { aplicarCorDestaque } from './utils/cores'
import Login from './components/Login'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Ranking from './pages/Ranking'
import Metas from './pages/Metas'
import Calendario from './pages/Calendario'
import Vendedoras from './pages/Vendedoras'
import Contratos from './pages/Contratos'
import Relatorios from './pages/Relatorios'
import Configuracoes from './pages/Configuracoes'

const PAGINAS = {
  dashboard: Dashboard,
  ranking: Ranking,
  metas: Metas,
  calendario: Calendario,
  vendedoras: Vendedoras,
  contratos: Contratos,
  relatorios: Relatorios,
  configuracoes: Configuracoes,
}

function Conteudo() {
  const { carregado, souAdmin, visitante, authUser, config } = useApp()
  const [pagina, setPagina] = useState('dashboard')
  const [menuAberto, setMenuAberto] = useState(false)

  useEffect(() => {
    if (config?.corDestaque) aplicarCorDestaque(config.corDestaque)
  }, [config?.corDestaque])

  useEffect(() => {
    document.title = config?.nomeEmpresa
      ? `${config.nomeEmpresa} — Ranking Empresarial`
      : 'Credibilita — Ranking Empresarial'
  }, [config?.nomeEmpresa])

  if (!carregado) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-950">
        <div className="flex flex-col items-center gap-3 text-ink-500">
          <Trophy className="animate-pulse text-gold-500" size={28} />
          <span className="text-sm">Carregando…</span>
        </div>
      </div>
    )
  }

  if (!authUser && !visitante) {
    return <Login />
  }

  const paginaAtiva = pagina === 'configuracoes' && !souAdmin ? 'dashboard' : pagina
  const Pagina = PAGINAS[paginaAtiva] || Dashboard

  return (
    <div className="flex min-h-screen bg-base-950">
      <Sidebar
        paginaAtiva={paginaAtiva}
        onMudarPagina={setPagina}
        aberta={menuAberto}
        onFechar={() => setMenuAberto(false)}
      />
      <main className="min-h-screen flex-1 overflow-x-hidden">
        <div key={paginaAtiva} className="animate-fadeIn">
          <Pagina onAbrirMenu={() => setMenuAberto(true)} />
        </div>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Conteudo />
    </AppProvider>
  )
}
