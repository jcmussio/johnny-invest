import { Logo } from '@/components/ui/logo'
import { Link } from 'react-router-dom'

export function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#0f172a] pt-16 pb-8 px-4 lg:px-8 border-t border-[#c0c0c0]/10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <Logo className="w-10 h-10" />
            <span className="text-xl font-bold tracking-tight text-white">
              Johnny Invest
            </span>
          </div>
          <p className="text-[#c0c0c0] text-sm leading-relaxed mb-6">
            A primeira plataforma gamificada do Brasil focada exclusivamente em
            opções e derivativos.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-sm">
            Navegação
          </h4>
          <ul className="space-y-3 text-sm text-[#c0c0c0]">
            <li>
              <Link
                to="/dashboard/premium"
                className="hover:text-white transition-colors"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <button
                onClick={() => scrollTo('sobre')}
                className="hover:text-white transition-colors"
              >
                Sobre
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollTo('faq')}
                className="hover:text-white transition-colors"
              >
                FAQ / Contato
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-sm">
            Redes Sociais
          </h4>
          <div className="flex gap-4 mt-2">
            {['Twitter', 'LinkedIn', 'Instagram'].map((social) => (
              <a
                key={social}
                href="#"
                className="w-10 h-10 rounded-full bg-[#1a2a4a] flex items-center justify-center text-[#c0c0c0] hover:bg-[#10b981] hover:text-white transition-colors"
                aria-label={social}
              >
                <div
                  className="w-5 h-5 bg-current"
                  style={{
                    maskImage:
                      'url(https://img.usecurling.com/i?q=' +
                      social +
                      '&shape=fill)',
                    maskSize: 'cover',
                  }}
                ></div>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-sm">
            Legal
          </h4>
          <ul className="space-y-3 text-sm text-[#c0c0c0]">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Termos de Uso
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Política de Privacidade
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Aviso de Risco
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-8 border-t border-[#c0c0c0]/10 text-center flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[#c0c0c0]/60 text-xs">
          &copy; {new Date().getFullYear()} Johnny Invest. Todos os direitos
          reservados.
        </p>
        <p className="text-[#c0c0c0]/40 text-xs max-w-xl text-left md:text-right">
          Operar opções envolve riscos. Este material tem fins estritamente
          educacionais e não constitui recomendação de investimento.
        </p>
      </div>
    </footer>
  )
}
