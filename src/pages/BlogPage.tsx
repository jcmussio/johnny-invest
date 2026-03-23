import { useState } from 'react'
import { Header } from '@/components/home/Header'
import { Footer } from '@/components/home/Footer'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const CATEGORIES = ['Todos', 'Fundamentos', 'Estratégias', 'Mindset']

const MOCK_POSTS = [
  {
    id: 1,
    title: 'Entendendo o Delta na Prática',
    category: 'Fundamentos',
    desc: 'Descubra como o Delta influencia o preço da sua opção em tempo real.',
    img: 'https://img.usecurling.com/p/400/250?q=stock%20chart&color=blue',
    date: '10 Mar, 2024',
  },
  {
    id: 2,
    title: 'O Mito da Venda Coberta',
    category: 'Estratégias',
    desc: 'Por que tantos traders erram ao executar a estratégia mais famosa do mercado.',
    img: 'https://img.usecurling.com/p/400/250?q=money&color=green',
    date: '05 Mar, 2024',
  },
  {
    id: 3,
    title: 'A Psicologia da Rolagem',
    category: 'Mindset',
    desc: 'Quando assumir o prejuízo ou rolar sua posição para o próximo mês.',
    img: 'https://img.usecurling.com/p/400/250?q=brain&color=purple',
    date: '01 Mar, 2024',
  },
  {
    id: 4,
    title: 'O Que é Gamma e Por Que Ele Importa?',
    category: 'Fundamentos',
    desc: 'Aceleração do Delta: entenda a segunda derivada mais importante da precificação.',
    img: 'https://img.usecurling.com/p/400/250?q=chart&color=yellow',
    date: '28 Fev, 2024',
  },
  {
    id: 5,
    title: 'Estratégia do Pó (Long Call): Vale a pena?',
    category: 'Estratégias',
    desc: 'Os riscos e a assimetria brutal de comprar opções muito fora do dinheiro.',
    img: 'https://img.usecurling.com/p/400/250?q=casino&color=red',
    date: '22 Fev, 2024',
  },
  {
    id: 6,
    title: 'Disciplina e Consistência no Trading',
    category: 'Mindset',
    desc: 'Como manter o foco e evitar o overtrading em dias de alta volatilidade.',
    img: 'https://img.usecurling.com/p/400/250?q=zen&color=orange',
    date: '15 Fev, 2024',
  },
]

export default function BlogPage() {
  const [search, setSearch] = useState('')
  const [activeCat, setActiveCat] = useState('Todos')

  const filtered = MOCK_POSTS.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase())
    const matchCat = activeCat === 'Todos' || p.category === activeCat
    return matchSearch && matchCat
  })

  return (
    <div className="min-h-screen bg-[#1a2a4a] font-sans selection:bg-[#10b981] selection:text-white">
      <Header />

      <main className="pt-32 pb-24 px-4 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Blog Johnny Invest
          </h1>
          <p className="text-lg text-[#c0c0c0] max-w-2xl mx-auto">
            Estratégias de opções, análises de mercado e insights para turbinar
            seus resultados.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar scroll-smooth snap-x">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors snap-center ${
                  activeCat === cat
                    ? 'bg-[#10b981] text-white'
                    : 'bg-[#22355c] text-[#c0c0c0] hover:bg-[#10b981]/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c0c0c0]" />
            <Input
              placeholder="Buscar artigos..."
              className="pl-10 bg-[#22355c] border-[#c0c0c0]/20 text-white placeholder:text-[#c0c0c0]/50 h-11 focus-visible:ring-[#10b981]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.length > 0 ? (
            filtered.map((post) => (
              <article
                key={post.id}
                className="bg-[#22355c] rounded-[8px] overflow-hidden border border-[#c0c0c0]/10 hover:-translate-y-1 transition-transform duration-300 flex flex-col group cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-48 object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#1a2a4a]/90 backdrop-blur text-[#10b981] text-xs font-bold px-2 py-1 rounded tracking-wider uppercase border border-[#c0c0c0]/20">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs text-[#c0c0c0] font-bold tracking-wider uppercase mb-3 block">
                    {post.date}
                  </span>

                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-[#10b981] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-[#c0c0c0] text-sm mb-6 line-clamp-3 flex-1">
                    {post.desc}
                  </p>

                  <button className="text-white text-sm font-semibold hover:text-[#10b981] transition-colors self-start mt-auto flex items-center gap-1 group-hover:gap-2">
                    Leia mais <span className="transition-all">&rarr;</span>
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full bg-[#22355c]/50 border border-[#c0c0c0]/10 rounded-xl py-16 text-center text-[#c0c0c0]">
              <Search className="w-12 h-12 text-[#c0c0c0]/30 mx-auto mb-4" />
              <p className="text-lg font-semibold text-white mb-2">
                Nenhum artigo encontrado
              </p>
              <p>
                Tente buscar por termos diferentes ou navegue por outras
                categorias.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
