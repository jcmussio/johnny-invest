import { Button3D } from '@/components/ui/button-3d'
import useAppStore from '@/stores/useAppStore'
import { Gem, Shield, Zap, TrendingUp } from 'lucide-react'
import { toast } from 'sonner'

const items = [
  {
    id: 'hearts',
    title: 'Recarga de Vidas',
    description: 'Restaure todas as suas vidas para continuar operando.',
    price: 350,
    icon: Shield,
    color: 'text-emerald',
  },
  {
    id: 'freeze',
    title: 'Bloqueio de Prática',
    description:
      'Mantenha seus dias consecutivos mesmo se esquecer de praticar.',
    price: 200,
    icon: Zap,
    color: 'text-navy',
  },
  {
    id: 'outfit',
    title: 'Traje de Wall Street',
    description: 'Aprenda com estilo de alto padrão.',
    price: 1000,
    icon: TrendingUp,
    color: 'text-silver-shade',
  },
]

export default function Shop() {
  const { state, dispatch } = useAppStore()

  const handleBuy = (price: number, type: string) => {
    if (state.gems >= price) {
      dispatch({ type: 'SPEND_GEMS', payload: price })
      if (type === 'hearts') dispatch({ type: 'REFILL_HEARTS' })
      toast.success('Compra realizada com sucesso!')
    } else {
      toast.error('Gemas insuficientes!')
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-navy mb-8">
        Loja do Investidor
      </h1>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-slate-700">Recursos</h2>
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-5 p-5 border-2 border-silver-light rounded-lg bg-white shadow-sm hover:border-silver transition-colors"
            >
              <item.icon
                className={`w-12 h-12 ${item.color} stroke-[2.5px] shrink-0`}
              />
              <div className="flex-1">
                <h3 className="font-bold text-lg text-navy">{item.title}</h3>
                <p className="text-slate-500 text-sm font-medium mt-1">
                  {item.description}
                </p>
              </div>
              <Button3D
                variant="outline"
                className="min-w-[120px] shrink-0"
                onClick={() => handleBuy(item.price, item.id)}
                disabled={state.gems < item.price}
              >
                <Gem className="w-4 h-4 mr-2 text-emerald fill-emerald/20" />
                {item.price}
              </Button3D>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
