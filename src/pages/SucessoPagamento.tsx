import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button3D } from '@/components/ui/button-3d'
import { useAuth } from '@/hooks/use-auth'
import { supabase } from '@/lib/supabase/client'
import {
  CheckCircle,
  Rocket,
  PlayCircle,
  Trophy,
  ArrowRight,
} from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function SucessoPagamento() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      // Registra a data de acesso e atualiza para premium
      supabase
        .from('users')
        .update({
          updated_at: new Date().toISOString(),
          is_premium: true,
        })
        .eq('id', user.id)
        .then(({ error }) => {
          if (error) console.error('Erro ao atualizar perfil premium:', error)
        })
    }
  }, [user])

  const today = format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })

  return (
    <div className="min-h-screen bg-[#1a2a4a] flex items-center justify-center p-4 py-10 animate-fade-in">
      <div className="bg-[#22355c] border-2 border-[#c0c0c0]/20 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header Section */}
        <div className="bg-[#1a2a4a]/50 p-8 flex flex-col items-center text-center border-b border-[#c0c0c0]/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#10b981]/10 to-transparent opacity-50"></div>
          <div className="w-20 h-20 bg-[#10b981]/20 rounded-full flex items-center justify-center mb-6 relative z-10 animate-bounce">
            <CheckCircle className="w-12 h-12 text-[#10b981]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 relative z-10">
            Pagamento Confirmado!
          </h1>
          <p className="text-[#c0c0c0] font-medium text-lg relative z-10">
            Bem-vindo ao Johnny Invest. Sua jornada começa agora.
          </p>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8 flex flex-col gap-8">
          {/* Purchase Summary */}
          <div className="bg-[#1a2a4a] rounded-xl p-5 border border-[#c0c0c0]/20">
            <h2 className="text-sm font-bold text-[#c0c0c0] uppercase tracking-widest mb-4">
              Resumo da Inscrição
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center gap-4">
                <span className="text-slate-400">Curso:</span>
                <span className="text-white font-bold text-right">
                  Trilha de Opções e Derivativos
                </span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-slate-400">Aluno:</span>
                <span className="text-white font-bold text-right line-clamp-1">
                  {profile?.name || user?.email || 'Investidor'}
                </span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-slate-400">Data de Acesso:</span>
                <span className="text-white font-bold capitalize text-right">
                  {today}
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-[#c0c0c0]/20 mt-1">
                <span className="text-slate-400">Status:</span>
                <span className="text-[#10b981] font-bold flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Premium Ativo
                </span>
              </div>
            </div>
          </div>

          {/* How to start */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Rocket className="w-5 h-5 text-orange-500" />
              Como começar sua jornada
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4 bg-[#1a2a4a]/50 p-4 rounded-xl border border-[#c0c0c0]/10 hover:border-[#c0c0c0]/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                  <PlayCircle className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold">
                    1. Acesse sua primeira aula
                  </h3>
                  <p className="text-[#c0c0c0] text-sm mt-1">
                    Vá para o seu Dashboard e comece pelo Nível 1. A fundação
                    teórica é essencial.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-[#1a2a4a]/50 p-4 rounded-xl border border-[#c0c0c0]/10 hover:border-[#c0c0c0]/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                  <Trophy className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold">
                    2. Complete as Missões
                  </h3>
                  <p className="text-[#c0c0c0] text-sm mt-1">
                    Aplique o que aprendeu em cenários práticos simulados e
                    ganhe pontos de XP.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4 flex flex-col items-center">
            <Button3D
              variant="success"
              size="lg"
              className="w-full sm:w-auto min-w-[250px] text-lg py-6"
              onClick={() => navigate('/dashboard')}
            >
              ACESSAR CURSO <ArrowRight className="w-6 h-6 ml-2" />
            </Button3D>
            <p className="text-slate-500 text-sm mt-4 text-center">
              Você será redirecionado para o seu ambiente de aprendizado seguro.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
