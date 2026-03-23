import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button3D } from '@/components/ui/button-3d'
import { Check } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { createStripeCheckout } from '@/services/stripe'
import { toast } from 'sonner'

export function Pricing() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    if (!user) {
      toast.info('Por favor, crie sua conta primeiro para garantir a vaga.')
      navigate('/signup')
      return
    }

    if (profile?.is_premium) {
      navigate('/learn')
      return
    }

    try {
      setIsLoading(true)
      const priceId = import.meta.env.VITE_STRIPE_PRICE_ID || 'price_1Qx_dummy'
      const successUrl = `${window.location.origin}/learn?success=true`
      const cancelUrl = `${window.location.origin}/?canceled=true`

      const { data, error } = await createStripeCheckout(
        priceId,
        successUrl,
        cancelUrl,
      )

      if (error) {
        throw new Error(error.message || 'Erro ao conectar com o Stripe')
      }

      if (data?.url) {
        window.location.href = data.url
      } else {
        throw new Error('URL de checkout não retornada')
      }
    } catch (err: any) {
      console.error('Checkout error:', err)
      toast.error('Erro ao iniciar o pagamento', {
        description: err.message || 'Tente novamente mais tarde.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section
      id="pricing"
      className="py-24 px-4 lg:px-8 bg-[#22355c] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#10b981]/10 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-gradient-to-b from-[#c0c0c0]/80 to-[#c0c0c0]/20 p-[2px] rounded-2xl shadow-2xl shadow-black/50">
          <div className="bg-[#1a2a4a] rounded-2xl p-8 md:p-12 text-center h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#10b981] text-white text-xs font-bold px-8 py-2 transform translate-x-8 translate-y-6 rotate-45 shadow-md uppercase tracking-wider">
              Mais Popular
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">
              Acesso Completo
            </h2>
            <p className="text-[#c0c0c0] mb-8 max-w-xl mx-auto">
              Tudo que você precisa para dominar opções, sem mensalidades
              escondidas.
            </p>

            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-[#c0c0c0] line-through text-2xl font-semibold">
                de R$ 997
              </span>
              <span className="text-5xl md:text-6xl font-black text-white">
                R$ 297
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-12">
              {[
                'Curso Completo 8 Níveis',
                '40+ Aulas em Vídeo e Texto',
                'Quizzes Práticos de Fixação',
                'Sistema de Gamificação Completo',
                'Certificados por Nível',
                'Acesso ao Ranking (Leaderboard)',
                'Suporte Direto da Equipe',
                '7 Dias de Garantia Incondicional',
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="bg-[#10b981]/20 rounded-full p-1 mt-0.5 shrink-0">
                    <Check className="w-4 h-4 text-[#10b981]" strokeWidth={3} />
                  </div>
                  <span className="text-[#c0c0c0] font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <Button3D
              variant="success"
              className="w-full md:w-auto md:min-w-[400px] h-16 text-lg text-white"
              onClick={handleCheckout}
              disabled={isLoading || profile?.is_premium}
            >
              {isLoading
                ? 'Iniciando Checkout...'
                : profile?.is_premium
                  ? 'Você já é um aluno Premium'
                  : 'Garanta Sua Vaga Agora'}
            </Button3D>

            <p className="text-sm text-[#c0c0c0]/60 mt-6 font-medium">
              Pagamento 100% seguro. Acesso imediato após aprovação.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
