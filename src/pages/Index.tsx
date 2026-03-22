import { Link } from 'react-router-dom'
import { Button3D } from '@/components/ui/button-3d'
import { CheckCircle2 } from 'lucide-react'
import { Logo } from '@/components/ui/logo'

export default function Index() {
  return (
    <div className="min-h-screen bg-navy text-white font-sans overflow-x-hidden selection:bg-emerald selection:text-white pb-20 md:pb-0">
      <header className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <Logo className="w-12 h-12" />
          <span className="text-2xl font-bold tracking-tight text-silver hidden sm:inline-block">
            Johnny Invest
          </span>
        </div>
        <Link to="/learn">
          <Button3D
            variant="outline"
            className="text-silver border-silver hover:bg-navy-shade px-8"
          >
            Entrar
          </Button3D>
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24 text-center flex flex-col items-center">
        <span className="bg-emerald/20 text-emerald border border-emerald px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest mb-8">
          Oferta de Lançamento
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-white">
          Aprenda Opções Como Você Aprende um Idioma — Progressivo, Intuitivo e
          Viciante
        </h1>
        <p className="text-lg md:text-xl text-silver mb-10 max-w-2xl leading-relaxed">
          Aulas curtas, prática diária, progresso real. Domine o mercado
          financeiro com a metodologia que realmente funciona.
        </p>
        <Link to="/learn" className="w-full sm:w-auto">
          <Button3D
            variant="super"
            size="lg"
            className="w-full sm:w-80 text-lg h-16 rounded-xl shadow-2xl shadow-emerald/20"
          >
            Começar Agora - R$ 297,00
          </Button3D>
        </Link>
      </main>

      <section className="bg-navy-shade py-20 border-y border-silver/10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
            Você Tem Tudo a Ganhar
          </h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              '7 Dias de Garantia 100%',
              'Acesso Vitalício',
              'Conteúdo Atualizado',
              'Suporte Direto do Johnny',
              'Certificado de Conclusão',
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-navy px-5 py-4 rounded-xl border border-silver/20 shadow-sm transition-transform hover:-translate-y-1"
              >
                <CheckCircle2 className="text-emerald w-6 h-6 shrink-0" />
                <span className="font-semibold text-silver">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-md mx-auto px-6">
          <div className="bg-gradient-to-b from-silver to-silver-shade p-[2px] rounded-2xl shadow-2xl">
            <div className="bg-navy rounded-xl p-8 text-center h-full">
              <h3 className="text-2xl font-bold mb-2 text-white">
                Acesso Completo
              </h3>
              <div className="text-silver line-through mb-2 text-lg">
                de R$ 997,00
              </div>
              <div className="text-5xl font-extrabold text-white mb-8">
                R$ 297,00
              </div>
              <ul className="text-left space-y-4 mb-10 text-silver">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald w-5 h-5" /> Curso
                  Completo Opções
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald w-5 h-5" /> 8 Níveis de
                  Domínio
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald w-5 h-5" /> Gamificação
                  e Certificados
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald w-5 h-5" /> Acesso
                  Vitalício
                </li>
              </ul>
              <Link to="/learn">
                <Button3D variant="super" className="w-full h-14 text-lg">
                  Comprar Agora
                </Button3D>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
