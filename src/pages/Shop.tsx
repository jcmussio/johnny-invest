import { Button3D } from '@/components/ui/button-3d'
import useAppStore from '@/stores/useAppStore'
import { Gem, Heart, Zap, Shield } from 'lucide-react'
import { toast } from 'sonner'

const items = [
  {
    id: 'hearts',
    title: 'Recarga de Vidas',
    description: 'Restaure todas as suas 5 vidas para continuar aprendendo.',
    price: 350,
    icon: Heart,
    color: 'text-duo-red',
  },
  {
    id: 'freeze',
    title: 'Bloqueio de Ofensiva',
    description:
      'Mantenha sua ofensiva mesmo se você esquecer de praticar por um dia.',
    price: 200,
    icon: Zap,
    color: 'text-duo-blue',
  },
  {
    id: 'outfit',
    title: 'Traje Formal',
    description: 'Aprenda com estilo. Seu mascote vai adorar.',
    price: 1000,
    icon: Shield,
    color: 'text-duo-yellow',
  },
]

export default function Shop() {
  const { state, dispatch } = useAppStore()

  const handleBuy = (price: number, type: string) => {
    if (state.gems >= price) {
      dispatch({ type: 'SPEND_GEMS', payload: price })
      if (type === 'hearts') dispatch({ type: 'REFILL_HEARTS' })

      toast.success('Item comprado com sucesso!')
    } else {
      toast.error('Gemas insuficientes!')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-duo-text mb-8">Loja</h1>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-slate-700">Poderes</h2>
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 border-t-2 border-duo-gray first:border-t-0"
            >
              <item.icon className={`w-12 h-12 ${item.color} stroke-[2.5px]`} />
              <div className="flex-1">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.description}</p>
              </div>
              <Button3D
                variant="ghost"
                className="min-w-[120px]"
                onClick={() => handleBuy(item.price, item.id)}
                disabled={state.gems < item.price}
              >
                <Gem className="w-4 h-4 mr-2 text-duo-blue fill-duo-blue" />
                {item.price}
              </Button3D>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
