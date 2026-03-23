import { Link } from 'react-router-dom'
import { Button3D } from '@/components/ui/button-3d'
import { ArrowRight } from 'lucide-react'

const posts = [
  {
    title: 'Entendendo o Delta na Prática',
    desc: 'Descubra como o Delta influencia o preço da sua opção em tempo real.',
    img: 'https://img.usecurling.com/p/400/250?q=stock%20chart&color=blue',
    date: '10 Mar, 2024',
  },
  {
    title: 'O Mito da Venda Coberta',
    desc: 'Por que tantos traders erram ao executar a estratégia mais famosa do mercado.',
    img: 'https://img.usecurling.com/p/400/250?q=money&color=green',
    date: '05 Mar, 2024',
  },
  {
    title: 'A Psicologia da Rolagem',
    desc: 'Quando assumir o prejuízo ou rolar sua posição para o próximo mês.',
    img: 'https://img.usecurling.com/p/400/250?q=brain&color=purple',
    date: '01 Mar, 2024',
  },
]

export function Blog() {
  return (
    <section id="blog" className="py-24 px-4 lg:px-8 bg-[#1a2a4a]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Últimos Artigos
            </h2>
            <p className="text-[#c0c0c0]">
              Mantenha-se atualizado com nossas análises de mercado.
            </p>
          </div>
          <Link
            to="/blog"
            className="text-[#10b981] font-bold hover:underline flex items-center gap-2"
          >
            Ver todos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {posts.map((post, i) => (
            <article
              key={i}
              className="bg-[#22355c] rounded-[8px] overflow-hidden border border-[#c0c0c0]/10 hover:-translate-y-1 transition-transform duration-300"
            >
              <img
                src={post.img}
                alt={post.title}
                className="w-full h-48 object-cover opacity-80"
                loading="lazy"
              />
              <div className="p-6">
                <span className="text-xs text-[#10b981] font-bold tracking-wider uppercase mb-2 block">
                  {post.date}
                </span>
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-[#c0c0c0] text-sm mb-4 line-clamp-2">
                  {post.desc}
                </p>
                <Link
                  to="/blog"
                  className="text-white text-sm font-semibold hover:text-[#10b981] transition-colors"
                >
                  Leia mais &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="bg-gradient-to-r from-[#22355c] to-[#1a2a4a] border border-[#c0c0c0]/20 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-xl">
          <h3 className="text-2xl font-bold text-white mb-4">
            Fique Atento às Novidades
          </h3>
          <p className="text-[#c0c0c0] mb-8">
            Receba estratégias de opções e insights exclusivos direto no seu
            email.
          </p>
          <div className="max-w-xl mx-auto space-y-5">
            <form
              className="flex flex-col sm:flex-row gap-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 bg-[#1a2a4a] border border-[#c0c0c0]/30 rounded-lg px-4 h-12 text-white focus:outline-none focus:border-[#10b981]"
                required
              />
              <Button3D
                variant="success"
                size="lg"
                className="h-12 w-full sm:w-auto shrink-0"
              >
                Inscrever-se para Atualizações
              </Button3D>
            </form>

            <div className="pt-2 border-t border-[#c0c0c0]/10 mt-6">
              <Button3D
                asChild
                variant="outline"
                size="lg"
                className="h-12 w-full sm:w-auto mx-auto border-[#c0c0c0] text-[#c0c0c0] hover:text-white bg-[#1a2a4a]/30 mt-4"
              >
                <Link to="/blog">Acessar o Blog</Link>
              </Button3D>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
