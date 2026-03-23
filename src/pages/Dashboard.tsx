import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'
import { Button3D } from '@/components/ui/button-3d'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Trophy, PlayCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface Quiz {
  id: string
}

interface Lesson {
  id: string
  number: number
  title: string
  quizzes: Quiz[]
  levelTitle?: string
  levelNumber?: number
}

interface Level {
  id: string
  number: number
  title: string
  description: string
  lessons: Lesson[]
}

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [levels, setLevels] = useState<Level[]>([])
  const [totalXP, setTotalXP] = useState(0)
  const [nextLessons, setNextLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return

      try {
        const { data: levelsData, error: levelsError } = await supabase
          .from('levels')
          .select(
            `
            id, number, title, description,
            lessons ( id, number, title, quizzes (id) )
          `,
          )
          .order('number')

        if (levelsError) throw levelsError

        const { data: progressData, error: progressError } = await supabase
          .from('user_progress')
          .select('lesson_id, completed, score')
          .eq('user_id', user.id)

        if (progressError) throw progressError

        const progressMap = new Map(progressData?.map((p) => [p.lesson_id, p]))

        const xp =
          progressData?.reduce((acc, curr) => acc + (curr.score || 0), 0) || 0
        setTotalXP(xp)

        const allLessons: Lesson[] = []
        levelsData?.forEach((lvl: any) => {
          lvl.lessons?.forEach((les: any) => {
            allLessons.push({
              ...les,
              levelTitle: lvl.title,
              levelNumber: lvl.number,
            })
          })
        })

        allLessons.sort((a, b) => {
          if (a.levelNumber !== b.levelNumber)
            return (a.levelNumber || 0) - (b.levelNumber || 0)
          return a.number - b.number
        })

        const upcoming = allLessons
          .filter((l) => !progressMap.get(l.id)?.completed)
          .slice(0, 3)

        setNextLessons(upcoming)
        setLevels(levelsData as any)
      } catch (error: any) {
        toast.error('Erro ao carregar dashboard', {
          description: error.message,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [user])

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-emerald" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-10 pb-10 max-w-4xl mx-auto animate-fade-in">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-extrabold text-navy">
          Dashboard do Curso
        </h1>
        <p className="text-slate-500 font-medium mt-2">
          Acompanhe sua jornada no mercado de derivativos.
        </p>
      </div>

      {/* Progress Bar Section */}
      <section className="bg-navy rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-400" />
          Seu Progresso Geral
        </h2>
        <div className="flex items-end justify-between mb-3 mt-6">
          <span className="text-slate-300 font-medium">XP Acumulado</span>
          <span className="text-4xl font-extrabold text-emerald">
            {totalXP} <span className="text-lg text-emerald/80">XP</span>
          </span>
        </div>
        <Progress
          value={Math.min((totalXP / 5000) * 100, 100)}
          className="h-3 bg-white/20 [&>div]:bg-emerald"
        />
      </section>

      {/* Next Lessons Section */}
      <section>
        <h2 className="text-2xl font-bold text-navy mb-5 flex items-center gap-2">
          <PlayCircle className="w-6 h-6 text-emerald" />
          Próximas Aulas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {nextLessons.length > 0 ? (
            nextLessons.map((lesson) => (
              <div
                key={lesson.id}
                onClick={() => navigate(`/lesson/${lesson.id}`)}
                className="border-2 border-silver rounded-xl p-5 bg-white hover:border-navy transition-colors flex flex-col justify-between group cursor-pointer shadow-sm hover:shadow-md"
              >
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Nível {lesson.levelNumber}
                  </span>
                  <h3 className="font-bold text-navy text-lg mt-1 line-clamp-2">
                    {lesson.number}. {lesson.title}
                  </h3>
                </div>
                <div className="mt-6 flex items-center text-emerald font-bold text-sm group-hover:translate-x-1 transition-transform">
                  <PlayCircle className="w-5 h-5 mr-2 fill-emerald/20" />
                  COMEÇAR AULA
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center p-8 border-2 border-dashed border-silver bg-slate-50 rounded-xl text-slate-500 font-medium">
              Você não tem aulas pendentes no momento. Parabéns!
            </div>
          )}
        </div>
      </section>

      {/* Levels List Section */}
      <section>
        <h2 className="text-2xl font-bold text-navy mb-5 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-navy" />
          Trilha do Investidor
        </h2>
        <div className="flex flex-col gap-4">
          {levels.map((level) => {
            const sortedLessons = [...(level.lessons || [])].sort(
              (a, b) => a.number - b.number,
            )
            const firstLesson = sortedLessons[0]

            return (
              <div
                key={level.id}
                className="bg-white border-2 border-silver shadow-sm rounded-xl p-6 flex flex-col md:flex-row gap-6 items-start md:items-center hover:border-slate-300 transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-blue-50 border-2 border-navy/10 flex items-center justify-center shrink-0">
                  <span className="text-2xl font-black text-navy">
                    {level.number}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-navy">{level.title}</h3>
                  <p className="text-slate-500 font-medium mt-1 text-sm md:text-base">
                    {level.description}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <span className="inline-flex items-center text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg">
                      <BookOpen className="w-3.5 h-3.5 mr-1.5" />{' '}
                      {level.lessons?.length || 0} Aulas
                    </span>
                    <span className="inline-flex items-center text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg">
                      <Trophy className="w-3.5 h-3.5 mr-1.5" />
                      {level.lessons?.reduce(
                        (acc, curr) => acc + (curr.quizzes?.length || 0),
                        0,
                      ) || 0}{' '}
                      Quizzes
                    </span>
                  </div>
                </div>
                <div className="w-full md:w-auto shrink-0 mt-2 md:mt-0">
                  <Button3D
                    variant="super"
                    fullWidth
                    onClick={() =>
                      firstLesson
                        ? navigate(`/lesson/${firstLesson.id}`)
                        : toast.error('Nenhuma aula disponível neste nível.')
                    }
                  >
                    INICIAR NÍVEL
                  </Button3D>
                </div>
              </div>
            )
          })}
          {levels.length === 0 && (
            <div className="text-center p-10 border-2 border-dashed border-silver rounded-xl text-slate-500 font-medium">
              Nenhum nível cadastrado ainda.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
