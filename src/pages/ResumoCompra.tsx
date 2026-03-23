import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button3D } from '@/components/ui/button-3d'
import { createStripeCheckout } from '@/services/stripe'
import { toast } from 'sonner'
import {
  CheckCircle2,
  ShoppingCart,
  ArrowLeft,
  CreditCard,
  Loader2,
} from 'lucide-react'

export default function ResumoCompra() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      // In a real app, this price ID would come from your environment variables or database
      const priceId = import.meta.env.VITE_STRIPE_PRICE_ID || 'price_dummy'

      const { data, error } = await createStripeCheckout(
        priceId,
        `${window.location.origin}/sucesso-pagamento`,
        `${window.location.origin}/resumo-compra`,
      )

      if (error) throw error

      if (data?.url) {
        window.location.href = data.url
      } else {
        throw new Error('URL de checkout não retornada')
      }
    } catch (error: any) {
      console.error('Erro no checkout:', error)
      toast.error('Erro ao iniciar pagamento', {
        description: 'Tente novamente mais tarde.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1a2a4a] flex items-center justify-center p-4 py-10 animate-fade-in">
      <div className="bg-[#22355c] border-2 border-[#c0c0c0]/20 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#1a2a4a]/50 p-6 flex flex-col items-center text-center border-b border-[#c0c0c0]/10">
          <div className="w-16 h-16 bg-[#10b981]/20 rounded-full flex items-center justify-center mb-4">
            <ShoppingCart className="w-8 h-8 text-[#10b981]" />
          </div>
          <h1 className="text-2xl font-bold text-white">Resumo da Compra</h1>
          <p className="text-[#c0c0c0] text-sm mt-1">
            Revise os detalhes antes de finalizar.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold text-white">
              Johnny Invest - Opções e Derivativos
            </h2>
            <p className="text-3xl font-black text-[#10b981]">R$ 297,00</p>
          </div>

          <div className="bg-[#1a2a4a] rounded-xl p-5 border border-[#c0c0c0]/20">
            <h3 className="text-sm font-bold text-[#c0c0c0] uppercase tracking-widest mb-4">
              O que está incluso:
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                '8 níveis',
                '40+ aulas',
                '20+ quizzes',
                '15+ missões',
                'Sistema de badges',
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-white text-sm font-medium"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#10b981] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <Button3D
              variant="success"
              className="w-full h-14 text-[15px]"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  CONFIRMAR PAGAMENTO
                </>
              )}
            </Button3D>

            <button
              className="flex items-center justify-center w-full py-3 text-[#c0c0c0] hover:text-white transition-colors font-bold text-sm tracking-widest uppercase"
              onClick={() => navigate('/cadastro-completo')}
              disabled={loading}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              VOLTAR
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
