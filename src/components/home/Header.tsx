import { Link, useNavigate } from 'react-router-dom'
import { Logo } from '@/components/ui/logo'
import { useAuth } from '@/hooks/use-auth'

export function Header() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleCTA = () => {
    if (user && profile?.is_premium) {
      navigate('/learn')
    } else if (user && !profile?.is_premium) {
      scrollTo('pricing')
    } else {
      navigate('/signup')
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a2a4a]/95 backdrop-blur-sm border-b border-[#c0c0c0]/10">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo className="w-[60px] h-[60px] lg:w-[80px] lg:h-[80px]" />
          <span className="text-xl lg:text-2xl font-bold tracking-tight text-white hidden sm:inline-block">
            Johnny Invest
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollTo('hero')}
            className="text-[#c0c0c0] font-semibold hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(192,192,192,0.8)]"
          >
            Home
          </button>
          <button
            onClick={() => scrollTo('blog')}
            className="text-[#c0c0c0] font-semibold hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(192,192,192,0.8)]"
          >
            Blog
          </button>
          <button
            onClick={() => scrollTo('sobre')}
            className="text-[#c0c0c0] font-semibold hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(192,192,192,0.8)]"
          >
            Sobre
          </button>
          <button
            onClick={() => scrollTo('faq')}
            className="text-[#c0c0c0] font-semibold hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(192,192,192,0.8)]"
          >
            Contato
          </button>
        </nav>

        <div className="flex items-center gap-4">
          {!user ? (
            <Link
              to="/login"
              className="text-[#c0c0c0] font-bold text-sm hover:text-white transition-colors uppercase tracking-wider hidden sm:block"
            >
              Entrar
            </Link>
          ) : (
            <span className="text-[#c0c0c0] font-bold text-sm hidden sm:block">
              Olá, {profile?.name || user.email?.split('@')[0]}
            </span>
          )}
          <button
            onClick={handleCTA}
            className="bg-[#10b981] hover:bg-[#0e9f6e] text-white px-6 py-2.5 rounded-lg font-bold text-sm uppercase tracking-widest border-b-4 border-[#047857] active:translate-y-[4px] active:border-b-0 transition-all duration-300"
          >
            {user && profile?.is_premium ? 'Acessar Curso' : 'Começar'}
          </button>
        </div>
      </div>
    </header>
  )
}
