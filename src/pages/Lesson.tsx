import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'
import { Button3D } from '@/components/ui/button-3d'
import { Progress } from '@/components/ui/progress'
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Loader2,
  X,
  BookOpen,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function Lesson() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [lesson, setLesson] = useState<any>(null)
  const [level, setLevel] = useState<any>(null)
  const [allLessons, setAllLessons] = useState<any[]>([])
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set(),
  )
  const [loading, setLoading] = useState(true)
  const [completing, setCompleting] = useState(false)

  useEffect(() => {
    if (!user || !id) return

    const fetchLessonData = async () => {
      setLoading(true)
      try {
        // Fetch current lesson
        const { data: lessonData, error: lessonError } = await supabase
          .from('lessons')
          .select('*, level:levels(*)')
          .eq('id', id)
          .single()

        if (lessonError) throw lessonError

        setLesson(lessonData)
        setLevel(lessonData.level)

        // Fetch all lessons for this level
        const { data: levelLessons, error: levelError } = await supabase
          .from('lessons')
          .select('id, number, order')
          .eq('level_id', lessonData.level_id)
          .order('order', { ascending: true })

        if (levelError) throw levelError
        setAllLessons(levelLessons)

        // Fetch user progress for this level
        const { data: progressData, error: progressError } = await supabase
          .from('user_progress')
          .select('lesson_id, completed')
          .eq('user_id', user.id)
          .in(
            'lesson_id',
            levelLessons.map((l) => l.id),
          )

        if (progressError) throw progressError

        const completedIds = new Set(
          progressData?.filter((p) => p.completed).map((p) => p.lesson_id),
        )
        setCompletedLessons(completedIds)
      } catch (error: any) {
        toast.error('Erro ao carregar aula', { description: error.message })
        navigate('/dashboard')
      } finally {
        setLoading(false)
      }
    }

    fetchLessonData()
  }, [id, user, navigate])

  const currentIndex = allLessons.findIndex((l) => l.id === id)
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null

  const isCompleted = completedLessons.has(id || '')

  const progressPercent =
    allLessons.length > 0
      ? (completedLessons.size / allLessons.length) * 100
      : 0

  const handleComplete = async () => {
    if (!user || !id || isCompleted) return
    setCompleting(true)
    try {
      // Check if progress already exists to avoid unique constraint error
      const { data: existingProgress } = await supabase
        .from('user_progress')
        .select('id')
        .eq('user_id', user.id)
        .eq('lesson_id', id)
        .single()

      if (existingProgress) {
        await supabase
          .from('user_progress')
          .update({ completed: true, score: 50 })
          .eq('id', existingProgress.id)
      } else {
        await supabase.from('user_progress').insert({
          user_id: user.id,
          lesson_id: id,
          completed: true,
          score: 50,
        })
      }

      // Update User XP
      const { data: userData } = await supabase
        .from('users')
        .select('xp')
        .eq('id', user.id)
        .single()

      if (userData) {
        await supabase
          .from('users')
          .update({ xp: (userData.xp || 0) + 50 })
          .eq('id', user.id)
      }

      setCompletedLessons((prev) => new Set(prev).add(id))
      toast.success('Aula concluída!', { description: 'Você ganhou +50 XP!' })

      // Auto advance to next if available
      if (nextLesson) {
        setTimeout(() => navigate(`/lesson/${nextLesson.id}`), 1500)
      }
    } catch (error: any) {
      toast.error('Erro ao concluir aula', { description: error.message })
    } finally {
      setCompleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <Loader2 className="w-12 h-12 animate-spin text-emerald" />
      </div>
    )
  }

  if (!lesson) return null

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white overflow-hidden shadow-2xl border-x border-slate-100">
      <header className="flex items-center gap-4 p-6 border-b border-slate-100 bg-white z-10 shrink-0">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-slate-400 hover:text-navy transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            <span>{level?.title || 'Nível'}</span>
            <span>
              {completedLessons.size} / {allLessons.length}
            </span>
          </div>
          <Progress
            value={progressPercent}
            className="h-3 rounded-xl bg-slate-100 [&>div]:bg-emerald"
          />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-slate-50">
        <div className="max-w-3xl mx-auto flex flex-col gap-8 animate-fade-in-up">
          <div className="flex flex-col gap-4">
            <span className="inline-flex items-center w-fit text-sm font-bold bg-blue-100 text-navy px-4 py-1.5 rounded-lg">
              <BookOpen className="w-4 h-4 mr-2" />
              Aula {lesson.number || currentIndex + 1}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-navy">
              {lesson.title}
            </h1>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl border-2 border-silver shadow-sm text-lg text-slate-700 leading-relaxed min-h-[300px]">
            {lesson.content ? (
              <div
                className="prose prose-slate max-w-none prose-headings:text-navy prose-a:text-emerald"
                dangerouslySetInnerHTML={{
                  __html: lesson.content.replace(/\n/g, '<br/>'),
                }}
              />
            ) : (
              <p className="text-slate-400 italic text-center py-10">
                Conteúdo desta aula ainda não está disponível.
              </p>
            )}
          </div>
        </div>
      </div>

      <footer className="p-6 border-t-2 border-slate-200 bg-white shrink-0">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 max-w-3xl mx-auto">
          <Button3D
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => prevLesson && navigate(`/lesson/${prevLesson.id}`)}
            disabled={!prevLesson}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            ANTERIOR
          </Button3D>

          <Button3D
            variant={isCompleted ? 'secondary' : 'super'}
            size="lg"
            className={cn(
              'w-full sm:w-auto min-w-[200px]',
              isCompleted && 'bg-slate-100 text-emerald border-slate-200',
            )}
            onClick={handleComplete}
            disabled={completing || isCompleted}
          >
            {completing ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isCompleted ? (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                CONCLUÍDA
              </>
            ) : (
              'CONCLUIR AULA'
            )}
          </Button3D>

          <Button3D
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => nextLesson && navigate(`/lesson/${nextLesson.id}`)}
            disabled={!nextLesson}
          >
            PRÓXIMA
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button3D>
        </div>
      </footer>
    </div>
  )
}
