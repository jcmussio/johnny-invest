import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'
import { AulaCard } from '@/components/AulaCard'
import { Medal, Target, Loader2, Crown, Flame, Trophy } from 'lucide-react'

export default function DashboardPremium() {
  const { user, profile, loading } = useAuth()
  const navigate = useNavigate()
  const [aulas, setAulas] = useState<any[]>([])
  const [progress, setProgress] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (loading) return

    const loadDashboardData = async () => {
      setIsLoading(true)
      try {
        const { data: aulasData, error: aulasError } = await supabase
          .from('aulas')
          .select('*')
          .order('nivel')
          .order('numero_aula')

        if (aulasError) throw aulasError
        setAulas(aulasData || [])

        if (user) {
          const { data: progressData, error: progressError } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', user.id)
            .not('aula_id', 'is', null)

          if (!progressError && progressData) {
            const progMap: any = {}
            progressData.forEach((p: any) => {
              progMap[p.aula_id] = p
            })
            setProgress(progMap)
          }
        } else {
          setProgress({})
        }
      } catch (err: any) {
        console.error('Erro ao carregar Dashboard Premium:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboardData()
  }, [user, loading])

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-purple-600" />
      </div>
    )
  }

  const stats = {
    xp: profile?.xp || 0,
    streak: profile?.streak || 0,
    badges: Object.values(progress).filter((p: any) => p.badge_conquistada)
      .length,
    progress:
      aulas.length > 0
        ? (Object.values(progress).filter((p: any) => p.completada).length /
            aulas.length) *
          100
        : 0,
  }

  const aulasOrdenadas = [...aulas].sort((a, b) => {
    if (a.nivel !== b.nivel) return (a.nivel || 0) - (b.nivel || 0)
    return (a.numero_aula || 0) - (b.numero_aula || 0)
  })

  let previousCompleted = true
  const processedAulas = aulasOrdenadas.map((aula) => {
    const prog = progress[aula.id] || {}
    const isCompleted = prog.completada || false
    const isUnlocked =
      previousCompleted ||
      prog.status === 'desbloqueada' ||
      prog.status === 'em_progresso' ||
      prog.status === 'completa'

    if (!isCompleted) {
      previousCompleted = false
    }

    return {
      ...aula,
      prog,
      isCompleted,
      isUnlocked,
      hasQuiz: (prog.quiz_score || 0) >= 100,
      hasMissao: prog.missao_completada || false,
    }
  })

  const aulasPorNivel = processedAulas.reduce((acc: any, aula: any) => {
    const nivel = aula.nivel || 1
    if (!acc[nivel]) acc[nivel] = []
    acc[nivel].push(aula)
    return acc
  }, {})

  const niveis = Object.keys(aulasPorNivel).sort(
    (a, b) => Number(a) - Number(b),
  )

  return (
    <div className="flex flex-col gap-8 pb-10 max-w-4xl mx-auto animate-fade-in">
      <section className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden border-2 border-purple-500/30">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-yellow-400/20 rounded-lg">
            <Crown className="w-8 h-8 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              Johnny Invest Dashboard
            </h1>
            <p className="text-purple-200 font-medium mt-1">
              Sua jornada completa em Opções e Derivativos.
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border-2 border-silver shadow-sm flex flex-col items-center justify-center text-center gap-2 hover:border-orange-200 transition-colors">
          <Flame className="w-8 h-8 text-orange-500 fill-orange-500 animate-pulse" />
          <div>
            <p className="text-2xl font-black text-navy leading-none">
              {stats.streak}
            </p>
            <p className="text-[10px] font-bold text-slate-500 uppercase mt-1 tracking-wider">
              Dias Seguidos
            </p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border-2 border-silver shadow-sm flex flex-col items-center justify-center text-center gap-2 hover:border-yellow-200 transition-colors">
          <Trophy className="w-8 h-8 text-yellow-400 fill-yellow-400" />
          <div>
            <p className="text-2xl font-black text-navy leading-none">
              {stats.xp}
            </p>
            <p className="text-[10px] font-bold text-slate-500 uppercase mt-1 tracking-wider">
              XP Total
            </p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border-2 border-silver shadow-sm flex flex-col items-center justify-center text-center gap-2 hover:border-emerald-200 transition-colors">
          <Medal className="w-8 h-8 text-emerald fill-emerald" />
          <div>
            <p className="text-2xl font-black text-navy leading-none">
              {stats.badges}
            </p>
            <p className="text-[10px] font-bold text-slate-500 uppercase mt-1 tracking-wider">
              Badges
            </p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border-2 border-silver shadow-sm flex flex-col items-center justify-center text-center gap-2 hover:border-blue-200 transition-colors">
          <Target className="w-8 h-8 text-blue-500" />
          <div>
            <p className="text-2xl font-black text-navy leading-none">
              {stats.progress.toFixed(0)}%
            </p>
            <p className="text-[10px] font-bold text-slate-500 uppercase mt-1 tracking-wider">
              Progresso
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        {niveis.map((nivel) => (
          <div key={nivel} className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-navy flex items-center gap-2 border-b-2 border-silver pb-2">
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md text-sm">
                Nível {nivel}
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aulasPorNivel[nivel].map((aula: any) => (
                <AulaCard key={aula.id} aula={aula} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
