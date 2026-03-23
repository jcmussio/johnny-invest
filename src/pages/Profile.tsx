import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useAuth } from '@/hooks/use-auth'
import { supabase } from '@/lib/supabase/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Flame,
  Trophy,
  BookOpen,
  BrainCircuit,
  Target,
  Calendar,
  Award,
  Loader2,
  Medal,
} from 'lucide-react'

interface Stats {
  lessons: number
  quizzes: number
  missions: number
}

interface LevelProgress {
  id: string
  title: string
  number: number
  total: number
  completed: number
  percent: number
}

export default function Profile() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)
  const [stats, setStats] = useState<Stats>({
    lessons: 0,
    quizzes: 0,
    missions: 0,
  })
  const [badges, setBadges] = useState<any[]>([])
  const [levelsProgress, setLevelsProgress] = useState<LevelProgress[]>([])
  const [nextLevelXp, setNextLevelXp] = useState(1000)

  useEffect(() => {
    if (!user) return

    const loadProfileData = async () => {
      try {
        // 1. User Profile
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single()

        setProfile(userData)

        // 2. User Progress (Lessons, Quizzes, Missions)
        const { data: progressData } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id)

        let lessonsCompleted = 0
        let quizzesCompleted = 0
        let missionsCompleted = 0

        const completedLessonIds = new Set()
        const completedMissionIds = new Set()

        progressData?.forEach((p) => {
          if (p.lesson_id && p.completed) {
            lessonsCompleted++
            completedLessonIds.add(p.lesson_id)
          }
          if (p.lesson_id && p.quiz_score && p.quiz_score > 0) {
            quizzesCompleted++
          }
          if (p.mission_id && p.completed) {
            missionsCompleted++
            completedMissionIds.add(p.mission_id)
          }
        })

        setStats({
          lessons: lessonsCompleted,
          quizzes: quizzesCompleted,
          missions: missionsCompleted,
        })

        // 3. User Badges
        const { data: badgesData } = await supabase
          .from('user_badges')
          .select('*, badges(*)')
          .eq('user_id', user.id)

        const extractedBadges =
          badgesData?.map((b: any) => b.badges).filter(Boolean) || []
        setBadges(extractedBadges)

        // 4. Levels Progress & XP thresholds
        const { data: levelsData } = await supabase
          .from('levels')
          .select(
            'id, title, level_number, xp_required, lessons(id), missions(id)',
          )
          .order('level_number')

        if (levelsData && levelsData.length > 0) {
          const currentXp = userData?.xp || 0
          const nextLevel = levelsData.find(
            (l) => (l.xp_required || 0) > currentXp,
          )

          if (nextLevel) {
            setNextLevelXp(nextLevel.xp_required || 1000)
          } else {
            const maxLevel = levelsData[levelsData.length - 1]
            setNextLevelXp((maxLevel?.xp_required || currentXp) + 500)
          }

          const progressList = levelsData.map((lvl) => {
            const totalItems =
              (lvl.lessons?.length || 0) + (lvl.missions?.length || 0)
            let completedItems = 0

            lvl.lessons?.forEach((l: any) => {
              if (completedLessonIds.has(l.id)) completedItems++
            })
            lvl.missions?.forEach((m: any) => {
              if (completedMissionIds.has(m.id)) completedItems++
            })

            return {
              id: lvl.id,
              title: lvl.title,
              number: lvl.level_number,
              total: totalItems,
              completed: completedItems,
              percent: totalItems > 0 ? (completedItems / totalItems) * 100 : 0,
            }
          })
          setLevelsProgress(progressList)
        }
      } catch (error) {
        console.error('Erro ao carregar perfil:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProfileData()
  }, [user])

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-emerald" />
      </div>
    )
  }

  const joinDate = profile?.created_at
    ? format(new Date(profile.created_at), "MMMM 'de' yyyy", { locale: ptBR })
    : 'Data desconhecida'

  const currentXp = profile?.xp || 0
  const xpPercent = Math.min((currentXp / nextLevelXp) * 100, 100)

  return (
    <div className="flex flex-col gap-10 pb-10 animate-fade-in max-w-4xl mx-auto">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between border-b-2 border-silver pb-8 gap-6 text-center md:text-left">
        <div className="flex flex-col gap-2 order-2 md:order-1">
          <h1 className="text-3xl md:text-4xl font-extrabold text-navy">
            {profile?.name || user?.email?.split('@')[0] || 'Investidor'}
          </h1>
          <p className="text-slate-500 font-medium text-lg">{user?.email}</p>
          <div className="flex items-center justify-center md:justify-start gap-2 text-slate-400 mt-2 font-semibold">
            <Calendar className="w-4 h-4" />
            Entrou em <span className="capitalize">{joinDate}</span>
          </div>
        </div>
        <Avatar className="w-28 h-28 md:w-32 md:h-32 border-4 border-white shadow-xl order-1 md:order-2 bg-slate-100">
          <AvatarImage
            src={`https://img.usecurling.com/ppl/large?seed=${user?.id || '1'}`}
          />
          <AvatarFallback className="text-3xl font-bold text-navy bg-silver">
            {profile?.name?.charAt(0).toUpperCase() || 'I'}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* XP Progress Bar */}
      <div className="bg-navy rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden border-2 border-navy-shade">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-400" />
          Progresso para o Próximo Nível
        </h2>
        <div className="flex items-end justify-between mb-4 mt-6">
          <span className="text-slate-300 font-medium text-lg">
            XP Acumulado
          </span>
          <div className="text-right">
            <span className="text-4xl font-extrabold text-emerald">
              {currentXp}
            </span>
            <span className="text-xl text-emerald/80 ml-1 font-bold">
              / {nextLevelXp} XP
            </span>
          </div>
        </div>
        <Progress
          value={xpPercent}
          className="h-4 bg-white/20 [&>div]:bg-emerald"
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-2 border-silver shadow-sm rounded-xl hover:border-navy transition-colors">
          <CardContent className="p-5 flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <Flame className="w-6 h-6 text-orange-500 fill-orange-500" />
            </div>
            <div>
              <h3 className="font-black text-2xl text-navy">
                {profile?.streak || 0}
              </h3>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mt-1">
                Ofensiva
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-silver shadow-sm rounded-xl hover:border-navy transition-colors">
          <CardContent className="p-5 flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-black text-2xl text-navy">{stats.lessons}</h3>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mt-1">
                Aulas
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-silver shadow-sm rounded-xl hover:border-navy transition-colors">
          <CardContent className="p-5 flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <BrainCircuit className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <h3 className="font-black text-2xl text-navy">{stats.quizzes}</h3>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mt-1">
                Quizzes
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-silver shadow-sm rounded-xl hover:border-navy transition-colors">
          <CardContent className="p-5 flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
              <Target className="w-6 h-6 text-emerald" />
            </div>
            <div>
              <h3 className="font-black text-2xl text-navy">
                {stats.missions}
              </h3>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mt-1">
                Missões
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Badges Section */}
      <div>
        <h2 className="text-2xl font-extrabold mb-6 text-navy flex items-center gap-2">
          <Medal className="w-7 h-7 text-yellow-500 fill-yellow-500" />
          Badges Conquistadas
        </h2>
        {badges.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {badges.map((badge, i) => (
              <div
                key={i}
                className="bg-white border-2 border-silver rounded-xl p-5 flex flex-col items-center text-center gap-3 hover:border-navy hover:shadow-md transition-all group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                  <span className="text-3xl">{badge.icon || '🏅'}</span>
                </div>
                <div>
                  <h3 className="font-bold text-navy leading-tight">
                    {badge.name}
                  </h3>
                  {badge.description && (
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {badge.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 border-2 border-dashed border-silver rounded-xl p-10 text-center flex flex-col items-center justify-center text-slate-500">
            <Award className="w-12 h-12 text-slate-300 mb-3" />
            <p className="font-medium text-lg">Nenhuma badge ainda.</p>
            <p className="text-sm">Complete níveis e missões para ganhar!</p>
          </div>
        )}
      </div>

      {/* Level Progress Section */}
      <div>
        <h2 className="text-2xl font-extrabold mb-6 text-navy flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-navy" />
          Histórico por Nível
        </h2>
        <div className="border-2 border-silver rounded-xl p-0 overflow-hidden bg-white shadow-sm flex flex-col">
          {levelsProgress.length > 0 ? (
            levelsProgress.map((level, i) => (
              <div
                key={level.id}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-6 border-b-2 border-silver last:border-0 hover:bg-slate-50 transition-colors items-start sm:items-center"
              >
                <div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-sm">
                  <span className="text-xs font-bold text-slate-400 uppercase leading-none">
                    Lvl
                  </span>
                  <span className="text-2xl font-black text-navy leading-none mt-1">
                    {level.number}
                  </span>
                </div>
                <div className="flex-1 w-full">
                  <h3 className="font-bold text-lg text-navy">{level.title}</h3>
                  <div className="flex items-center justify-between mb-2 mt-1">
                    <p className="text-slate-500 font-medium text-sm">
                      Progresso Geral
                    </p>
                    <p className="text-sm font-bold text-emerald">
                      {level.completed} / {level.total} concluídos
                    </p>
                  </div>
                  <Progress
                    value={level.percent}
                    className="h-3 bg-slate-100 [&>div]:bg-emerald"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-500 font-medium">
              Nenhum dado de nível disponível.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
