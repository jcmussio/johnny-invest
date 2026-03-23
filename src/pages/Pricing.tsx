import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button3D } from '@/components/ui/button-3d'
import { createStripeCheckout } from '@/services/stripe'
import { toast } from 'sonner'
import {
  CheckCircle2,
  ShoppingCart,
  CreditCard,
  Loader2,
  Rocket,
} from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { supabase } from '@/lib/supabase/client'

export default function Pricing() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const handleCheckout = async () => {
    const { data: sessionData } = await supabase.auth.getSession()
    const currentUser = sessionData.session?.user || user

    if (!currentUser) {
      console.warn(
        'Usuário não encontrado na sessão atual. Redirecionando para login.',
      )
      toast.error('Autenticação necessária', {
        description: 'Você precisa estar logado para iniciar o pagamento.',
      })
      navigate('/login')
      return
    }

    setLoading(true)
    try {
      const priceId = import.meta.env.VITE_STRIPE_PRICE_ID || 'price_dummy'

      console.log('Iniciando checkout com os parâmetros:', {
        user_id: currentUser.id,
        email: currentUser.email,
        price_id: priceId,
      })

      const { data, error } = await createStripeCheckout(
        priceId,
        `${window.location.origin}/sucesso-pagamento`,
        `${window.location.origin}/pricing`,
      )

      if (error) throw error

      if (data?.url) {
        window.location.href = data.url
      } else {
        throw new Error('URL de checkout não retornada pela função.')
      }
    } catch (error: any) {
      console.error('Erro detalhado no fluxo de checkout:', error)
      toast.error('Erro ao iniciar pagamento', {
        description: error.message || 'Tente novamente mais tarde.',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAtivarPremium = async () => {
    const { data: sessionData } = await supabase.auth.getSession()
    const currentUser = sessionData.session?.user || user

    if (!currentUser) {
      toast.error('Autenticação necessária')
      return navigate('/login')
    }

    setLoading(true)
    try {
      const { error } = await supabase
        .from('users')
        .update({ premium: true })
        .eq('id', currentUser.id)

      if (error) throw error

      toast.success('Premium ativado com sucesso!')
      navigate('/dashboard/premium')
    } catch (e: any) {
      toast.error('Erro ao ativar Premium', { description: e.message })
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
          <h1 className="text-2xl font-bold text-white">Planos e Preços</h1>
          <p className="text-[#c0c0c0] text-sm mt-1">
            Escolha o melhor plano para você.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold text-white">
              Johnny Invest - Acesso Completo
            </h2>
            <p className="text-3xl font-black text-[#10b981]">R$ 297,00</p>
          </div>

          <div className="bg-[#1a2a4a] rounded-xl p-5 border border-[#c0c0c0]/20">
            <h3 className="text-sm font-bold text-[#c0c0c0] uppercase tracking-widest mb-4">
              O que está incluso:
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                'Curso Completo 8 Níveis',
                '40+ Aulas em Vídeo e Texto',
                'Quizzes Práticos de Fixação',
                'Sistema de Gamificação Completo',
                'Acesso Imediato à Plataforma',
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
                  Continuar com Pagamento
                </>
              )}
            </Button3D>

            <Button3D
              variant="super"
              className="w-full h-14 text-[15px] bg-purple-600 border-purple-800 hover:bg-purple-700"
              onClick={handleAtivarPremium}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <Rocket className="w-5 h-5 mr-2" />
                  Ativar Premium (Acesso Fase 1)
                </>
              )}
            </Button3D>
          </div>
        </div>
      </div>
    </div>
  )
}
