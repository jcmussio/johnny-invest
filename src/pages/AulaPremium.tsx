import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'
import { Button3D } from '@/components/ui/button-3d'
import { Progress } from '@/components/ui/progress'
import { BadgeAnimation } from '@/components/BadgeAnimation'
import { useToast } from '@/components/ui/use-toast'
import {
  ArrowLeft,
  BrainCircuit,
  Target,
  CheckCircle,
  Loader2,
  List,
  Lock,
  Trophy,
  Rocket,
  ChevronRight,
  BookOpen,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AulaPremium() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { user, loading: authLoading } = useAuth()
  const [aula, setAula] = useState<any>(null)
  const [prog, setProg] = useState<any>(null)
  const [nextAulaId, setNextAulaId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [showBadge, setShowBadge] = useState<string | null>(null)

  const completingRef = useRef(false)

  useEffect(() => {
    if (!id) return
    const fetchAula = async () => {
      try {
        // Fetch current lesson
        const { data: aulaData } = await supabase
          .from('aulas')
          .select('*')
          .eq('id', id)
          .single()
        setAula(aulaData)

        // Fetch all lessons to determine the next one based on order
        if (aulaData) {
          const { data: allAulas } = await supabase
            .from('aulas')
            .select('id, nivel, numero_aula')
            .order('nivel', { ascending: true })
            .order('numero_aula', { ascending: true })

          if (allAulas) {
            const currentIndex = allAulas.findIndex((a) => a.id === id)
            if (currentIndex !== -1 && currentIndex < allAulas.length - 1) {
              setNextAulaId(allAulas[currentIndex + 1].id)
            }
          }
        }

        // Fetch user progress if logged in
        if (user) {
          const { data: progData } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', user.id)
            .eq('aula_id', id)
            .single()
          setProg(progData || {})
        } else {
          setProg({})
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (!authLoading) {
      fetchAula()
    }
  }, [id, user, authLoading])

  // Auto-complete lesson logic via Edge Function
  useEffect(() => {
    if (
      user &&
      prog &&
      prog.quiz_score >= 70 &&
      prog.missao_completada &&
      !prog.completada &&
      !completingRef.current
    ) {
      const completeAula = async () => {
        completingRef.current = true
        try {
          console.log('Calling Edge Function: update-user-progress')
          const { data, error } = await supabase.functions.invoke(
            'update-user-progress',
            {
              body: {
                user_id: user.id,
                aula_id: id,
                quiz_score: prog.quiz_score,
                missao_completa: prog.missao_completada,
              },
            },
          )

          console.log('Edge Function Response:', data, error)

          if (error) throw error

          if (data?.status === 'sucesso') {
            const newXpGanho = (prog.xp_ganho || 0) + 100
            setProg((prev: any) => ({
              ...prev,
              completada: true,
              badge_conquistada: !!data.badge_nome,
              xp_ganho: newXpGanho,
            }))

            toast({
              title: 'Parabéns!',
              description: data.message || 'Aula concluída com sucesso.',
            })

            if (data.badge_nome) {
              setShowBadge(data.badge_nome)
            }
          } else {
            toast({
              title: 'Aviso',
              description:
                data?.message || 'Ocorreu um erro ao atualizar o progresso.',
              variant: 'destructive',
            })
          }
        } catch (e) {
          console.error('Error completing aula via Edge Function', e)
        } finally {
          completingRef.current = false
        }
      }
      completeAula()
    }
  }, [
    prog?.quiz_score,
    prog?.missao_completada,
    prog?.completada,
    id,
    user,
    toast,
  ])

  if (loading || authLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
      </div>
    )

  if (!aula)
    return (
      <div className="p-10 text-center text-slate-500 font-bold">
        Aula não encontrada.
      </div>
    )

  const hasQuiz = (prog?.quiz_score || 0) >= 70
  const hasMissao = prog?.missao_completada
  const isCompleted = prog?.completada

  let progressPercent = 0
  if (hasQuiz) progressPercent += 50
  if (hasMissao) progressPercent += 50

  const getNivelName = (nivel: number) => {
    switch (nivel) {
      case 1:
        return '• Fundamentos'
      case 2:
        return '• Estratégias'
      case 3:
        return '• Análise'
      case 4:
        return '• Avançado'
      default:
        return ''
    }
  }

  const renderTopicos = (text: string | null) => {
    if (!text)
      return <p className="text-slate-500 italic">Nenhum tópico cadastrado.</p>
    let items: string[] = []
    try {
      const parsed = JSON.parse(text)
      if (Array.isArray(parsed)) items = parsed
      else items = [text]
    } catch {
      items = text
        .split('\n')
        .map((s) => s.replace(/^[-•]\s*/, '').trim())
        .filter(Boolean)
      if (items.length === 0) items = [text]
    }

    return (
      <ul className="space-y-4 mt-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-4">
            <div className="mt-2 w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />
            <span className="text-slate-700 font-medium text-lg leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>
    )
  }

  const renderMarkdown = (text: string) => {
    if (!text) return null
    const lines = text.split('\n')
    const elements: React.ReactNode[] = []
    let listItems: string[] = []

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`ul-${elements.length}`} className="space-y-4 mt-4 mb-6">
            {listItems.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="mt-2.5 w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                <span className="text-slate-700 text-lg leading-relaxed">
                  {renderInline(item)}
                </span>
              </li>
            ))}
          </ul>,
        )
        listItems = []
      }
    }

    const renderInline = (str: string) => {
      const parts = str.split(/(\*\*.*?\*\*)/g)
      return parts.map((part, j) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={j} className="font-extrabold text-navy">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )
    }

    lines.forEach((line, idx) => {
      const trimmed = line.trim()
      if (!trimmed) {
        flushList()
        return
      }

      if (trimmed.startsWith('## ')) {
        flushList()
        elements.push(
          <h3
            key={`h3-${idx}`}
            className="text-2xl font-extrabold text-navy mt-8 mb-4 border-b-2 border-slate-100 pb-2"
          >
            {trimmed.replace('## ', '')}
          </h3>,
        )
      } else if (trimmed.startsWith('- ')) {
        listItems.push(trimmed.replace(/^- /, ''))
      } else {
        flushList()
        elements.push(
          <p
            key={`p-${idx}`}
            className="text-slate-700 text-lg leading-relaxed mb-4"
          >
            {renderInline(trimmed)}
          </p>,
        )
      }
    })

    flushList()

    return <div className="space-y-2">{elements}</div>
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-24">
      {showBadge && (
        <BadgeAnimation
          badgeName={showBadge}
          onClose={() => setShowBadge(null)}
        />
      )}

      {/* HEADER */}
      <header className="bg-white border-b-2 border-slate-200 px-4 py-3 sticky top-0 z-20 flex flex-col gap-3 shadow-sm">
        <div className="max-w-5xl mx-auto w-full flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard/premium')}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors shrink-0"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1 flex flex-col">
            <h1 className="font-extrabold text-navy text-xl line-clamp-1">
              {aula.titulo}
            </h1>
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
              Nível {aula.nivel} {getNivelName(aula.nivel)}
            </span>
          </div>
        </div>
        <div className="max-w-5xl mx-auto w-full flex items-center gap-4 pl-14 pr-2">
          <Progress
            value={progressPercent}
            className="h-3 flex-1 bg-slate-100 [&>div]:bg-emerald-500"
          />
          <span className="text-sm font-black text-emerald-600 w-10 text-right">
            {progressPercent}%
          </span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN (Content & Actions) */}
        <div className="lg:col-span-2 flex flex-col gap-8 animate-fade-in-up">
          {/* Objective */}
          <div className="bg-white border-2 border-slate-200 border-b-4 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0 border border-blue-200">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-extrabold text-navy">
                Objetivo da Aula
              </h2>
            </div>
            <p className="text-slate-600 font-medium text-lg leading-relaxed md:ml-16">
              {aula.objetivo}
            </p>
          </div>

          {/* Topics / Content */}
          <div className="bg-white border-2 border-slate-200 border-b-4 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center shrink-0 border border-purple-200">
                {aula.conteudo_markdown ? (
                  <BookOpen className="w-6 h-6 text-purple-600" />
                ) : (
                  <List className="w-6 h-6 text-purple-600" />
                )}
              </div>
              <h2 className="text-2xl font-extrabold text-navy">
                {aula.conteudo_markdown
                  ? 'Material de Estudo'
                  : 'Tópicos de Estudo'}
              </h2>
            </div>
            <div className="md:ml-16">
              {aula.conteudo_markdown
                ? renderMarkdown(aula.conteudo_markdown)
                : renderTopicos(aula.topicos)}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-2">
            <h3 className="font-extrabold text-2xl text-navy mb-4 px-2">
              Desafios Práticos
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Button3D
                  variant={hasQuiz ? 'outline' : 'super'}
                  className={cn(
                    'w-full py-8 text-lg',
                    !hasQuiz &&
                      'bg-purple-600 border-purple-800 hover:bg-purple-700',
                  )}
                  onClick={() => navigate(`/quiz/${id}`)}
                >
                  {hasQuiz ? 'Refazer Quiz' : 'Fazer Quiz'}
                </Button3D>
                {prog?.quiz_score !== undefined &&
                  prog.quiz_score < 70 &&
                  !hasQuiz && (
                    <p className="text-xs font-bold text-red-500 text-center px-4 bg-red-50 py-2 rounded-xl border border-red-100">
                      Complete o quiz com 70%+ para desbloquear a próxima aula.
                      Atual: {prog.quiz_score}%
                    </p>
                  )}
              </div>

              <div className="flex flex-col gap-3">
                <Button3D
                  variant={hasMissao ? 'outline' : 'super'}
                  className={cn(
                    'w-full py-8 text-lg',
                    !hasMissao &&
                      'bg-orange-500 border-orange-700 hover:bg-orange-600',
                  )}
                  onClick={() => navigate(`/missao/${id}`)}
                >
                  {hasMissao ? 'Revisar Missão' : 'Fazer Missão'}
                </Button3D>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (Sidebar) */}
        <aside className="lg:col-span-1 flex flex-col gap-4">
          <h3 className="font-extrabold text-xl text-navy mb-2 px-2">
            Seu Progresso
          </h3>

          {/* Quiz Card */}
          <div
            className={cn(
              'border-2 border-b-4 rounded-2xl p-5 flex flex-col gap-3 transition-colors',
              hasQuiz
                ? 'bg-emerald-50 border-emerald-200'
                : 'bg-white border-slate-200',
            )}
          >
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center shrink-0 border',
                  hasQuiz
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-600'
                    : 'bg-slate-100 border-slate-200 text-slate-400',
                )}
              >
                <BrainCircuit className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-extrabold text-navy text-lg leading-tight">
                  Quiz
                </h4>
                <p className="text-sm font-semibold text-slate-500 line-clamp-1 mt-0.5">
                  {aula.quiz_nome || 'Validação'}
                </p>
              </div>
              {hasQuiz ? (
                <CheckCircle className="w-7 h-7 text-emerald-500" />
              ) : (
                <Lock className="w-6 h-6 text-slate-300" />
              )}
            </div>
            {hasQuiz && (
              <div className="text-xs font-black text-emerald-700 bg-emerald-200 px-3 py-1.5 rounded-lg w-fit mt-1 uppercase tracking-widest border border-emerald-300">
                Score: {prog.quiz_score}%
              </div>
            )}
          </div>

          {/* Mission Card */}
          <div
            className={cn(
              'border-2 border-b-4 rounded-2xl p-5 flex items-center gap-4 transition-colors',
              hasMissao
                ? 'bg-emerald-50 border-emerald-200'
                : 'bg-white border-slate-200',
            )}
          >
            <div
              className={cn(
                'w-12 h-12 rounded-full flex items-center justify-center shrink-0 border',
                hasMissao
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-600'
                  : 'bg-slate-100 border-slate-200 text-slate-400',
              )}
            >
              <Rocket className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-extrabold text-navy text-lg leading-tight">
                Missão
              </h4>
              <p className="text-sm font-semibold text-slate-500 line-clamp-1 mt-0.5">
                {aula.missao_nome || 'Prática'}
              </p>
            </div>
            {hasMissao ? (
              <CheckCircle className="w-7 h-7 text-emerald-500" />
            ) : (
              <Lock className="w-6 h-6 text-slate-300" />
            )}
          </div>

          {/* Badge Card */}
          {aula.badge_nome && (
            <div
              className={cn(
                'border-2 border-b-4 rounded-2xl p-5 flex items-center gap-4 transition-colors',
                isCompleted
                  ? 'bg-yellow-50 border-yellow-300'
                  : 'bg-white border-slate-200',
              )}
            >
              <div
                className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center shrink-0 border',
                  isCompleted
                    ? 'bg-yellow-100 border-yellow-400 text-yellow-600'
                    : 'bg-slate-100 border-slate-200 text-slate-400',
                )}
              >
                <Trophy className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-extrabold text-navy text-lg leading-tight">
                  Badge
                </h4>
                <p className="text-sm font-semibold text-slate-500 line-clamp-2 mt-0.5 leading-tight">
                  {isCompleted ? aula.badge_nome : 'Requisito: Completar aula'}
                </p>
              </div>
              {isCompleted ? (
                <CheckCircle className="w-7 h-7 text-yellow-500" />
              ) : (
                <Lock className="w-6 h-6 text-slate-300" />
              )}
            </div>
          )}
        </aside>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t-2 border-slate-200 p-4 fixed bottom-0 left-0 right-0 z-30 shadow-[0_-10px_20px_rgba(0,0,0,0.03)]">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <Button3D
            variant="outline"
            className="hidden md:flex min-w-[200px]"
            onClick={() => navigate('/dashboard/premium')}
          >
            Voltar para Dashboard
          </Button3D>
          <Button3D
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => navigate('/dashboard/premium')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button3D>

          <Button3D
            variant={isCompleted ? 'success' : 'locked'}
            size="lg"
            onClick={() => {
              if (isCompleted && nextAulaId) navigate(`/aula/${nextAulaId}`)
              else if (isCompleted && !nextAulaId)
                navigate('/dashboard/premium')
            }}
            disabled={!isCompleted}
            className="flex-1 md:flex-none md:min-w-[300px]"
          >
            {isCompleted
              ? nextAulaId
                ? 'Próxima Aula'
                : 'Módulo Concluído!'
              : 'Complete para Avançar'}
            {isCompleted && nextAulaId && (
              <ChevronRight className="ml-2 w-5 h-5" />
            )}
          </Button3D>
        </div>
      </footer>
    </div>
  )
}
