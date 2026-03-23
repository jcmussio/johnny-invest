import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'
import { Button3D } from '@/components/ui/button-3d'
import { BadgeAnimation } from '@/components/BadgeAnimation'
import {
  ArrowLeft,
  BrainCircuit,
  Target,
  CheckCircle,
  Loader2,
  BookOpen,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AulaPremium() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [aula, setAula] = useState<any>(null)
  const [prog, setProg] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showBadge, setShowBadge] = useState<string | null>(null)

  useEffect(() => {
    if (!user || !id) return
    const fetchAula = async () => {
      try {
        const { data: aulaData } = await supabase
          .from('aulas')
          .select('*')
          .eq('id', id)
          .single()
        setAula(aulaData)

        const { data: progData } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('aula_id', id)
          .single()
        setProg(progData || {})
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchAula()
  }, [id, user])

  useEffect(() => {
    if (
      prog &&
      prog.quiz_score >= 70 &&
      prog.missao_completada &&
      !prog.completada
    ) {
      const completeAula = async () => {
        try {
          const newXpGanho = (prog.xp_ganho || 0) + 100
          await supabase
            .from('user_progress')
            .update({
              completada: true,
              badge_conquistada: true,
              xp_ganho: newXpGanho,
            })
            .eq('id', prog.id)

          const { data: u } = await supabase
            .from('users')
            .select('xp')
            .eq('id', user!.id)
            .single()
          if (u) {
            await supabase
              .from('users')
              .update({ xp: (u.xp || 0) + 100 })
              .eq('id', user!.id)
          }

          if (aula?.badge_nome) {
            const { data: b } = await supabase
              .from('badges')
              .select('id')
              .eq('nome', aula.badge_nome)
              .single()
            if (b) {
              await supabase
                .from('user_badges')
                .insert({ user_id: user!.id, badge_id: b.id })
            }
          }
          setProg({
            ...prog,
            completada: true,
            badge_conquistada: true,
            xp_ganho: newXpGanho,
          })
          if (aula?.badge_nome) setShowBadge(aula.badge_nome)
        } catch (e) {
          console.error('Error completing aula', e)
        }
      }
      completeAula()
    }
  }, [prog, aula, user])

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
      </div>
    )
  if (!aula)
    return (
      <div className="p-10 text-center text-slate-500">
        Aula não encontrada.
      </div>
    )

  const hasQuiz = (prog?.quiz_score || 0) >= 70
  const hasMissao = prog?.missao_completada

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-10">
      {showBadge && (
        <BadgeAnimation
          badgeName={showBadge}
          onClose={() => setShowBadge(null)}
        />
      )}

      <header className="bg-white border-b-2 border-slate-200 p-4 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard/premium')}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-navy text-lg line-clamp-1">
              Nível {aula.nivel} • Aula {aula.numero_aula}
            </h1>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-3xl w-full mx-auto p-6 flex flex-col gap-6 animate-fade-in-up">
        <div className="bg-white border-2 border-silver rounded-2xl p-6 md:p-8 shadow-sm text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 border border-purple-200">
            <BookOpen className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-navy">
            {aula.titulo}
          </h2>
          <p className="text-slate-600 font-medium mt-3 text-lg">
            {aula.objetivo}
          </p>
          <div className="bg-slate-100 rounded-xl p-4 mt-6 w-full text-left border border-slate-200">
            <h4 className="font-bold text-slate-500 text-sm uppercase mb-2">
              Tópicos:
            </h4>
            <p className="text-navy font-semibold leading-relaxed">
              {aula.topicos}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center px-2">
          <h3 className="font-bold text-xl text-navy">Desafios da Aula</h3>
          {prog?.completada && (
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
              AULA CONCLUÍDA
            </span>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div
            className={cn(
              'bg-white border-2 rounded-xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 transition-all shadow-sm',
              hasQuiz
                ? 'border-emerald bg-emerald-50/30'
                : 'border-silver hover:border-purple-300',
            )}
          >
            <div className="flex flex-col items-center md:flex-row gap-4 text-center md:text-left w-full">
              <div
                className={cn(
                  'w-14 h-14 rounded-full flex items-center justify-center shrink-0 border',
                  hasQuiz
                    ? 'bg-emerald-100 border-emerald-200'
                    : 'bg-blue-50 border-blue-200',
                )}
              >
                <BrainCircuit
                  className={cn(
                    'w-7 h-7',
                    hasQuiz ? 'text-emerald-600' : 'text-blue-500',
                  )}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-navy text-xl">Quiz Interativo</h3>
                <p className="text-sm text-slate-500 font-medium mt-1">
                  Valide seus conhecimentos (+50 XP)
                </p>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto shrink-0 justify-center">
                {hasQuiz && (
                  <div className="font-black text-emerald text-xl">
                    {prog.quiz_score}%
                  </div>
                )}
                <Button3D
                  variant={hasQuiz ? 'outline' : 'super'}
                  className={cn(
                    'w-full md:w-auto',
                    !hasQuiz &&
                      'bg-purple-600 border-purple-800 hover:bg-purple-700',
                  )}
                  onClick={() => navigate(`/quiz/${id}`)}
                >
                  {hasQuiz ? 'REFAZER' : 'INICIAR QUIZ'}
                </Button3D>
              </div>
            </div>
          </div>

          <div
            className={cn(
              'bg-white border-2 rounded-xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 transition-all shadow-sm',
              hasMissao
                ? 'border-emerald bg-emerald-50/30'
                : 'border-silver hover:border-orange-300',
            )}
          >
            <div className="flex flex-col items-center md:flex-row gap-4 text-center md:text-left w-full">
              <div
                className={cn(
                  'w-14 h-14 rounded-full flex items-center justify-center shrink-0 border',
                  hasMissao
                    ? 'bg-emerald-100 border-emerald-200'
                    : 'bg-orange-50 border-orange-200',
                )}
              >
                <Target
                  className={cn(
                    'w-7 h-7',
                    hasMissao ? 'text-emerald-600' : 'text-orange-500',
                  )}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-navy text-xl">Missão Prática</h3>
                <p className="text-sm text-slate-500 font-medium mt-1">
                  Resolva um cenário real (+150 XP)
                </p>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto shrink-0 justify-center">
                {hasMissao && <CheckCircle className="w-8 h-8 text-emerald" />}
                <Button3D
                  variant={hasMissao ? 'outline' : 'super'}
                  className={cn(
                    'w-full md:w-auto',
                    !hasMissao &&
                      'bg-orange-500 border-orange-700 hover:bg-orange-600',
                  )}
                  onClick={() => navigate(`/missao/${id}`)}
                >
                  {hasMissao ? 'REVISAR' : 'INICIAR MISSÃO'}
                </Button3D>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
