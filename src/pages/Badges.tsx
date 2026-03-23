import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'
import { Button3D } from '@/components/ui/button-3d'
import { Loader2, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Badge {
  id: string
  name: string
  nome: string
  requisito: string
  beneficio: string
  icon: string
}

export default function Badges() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [badges, setBadges] = useState<Badge[]>([])
  const [earnedBadges, setEarnedBadges] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchBadges = async () => {
      try {
        const { data: badgesData } = await supabase
          .from('badges')
          .select('*')
          .order('created_at', { ascending: true })
        const { data: userBadgesData } = await supabase
          .from('user_badges')
          .select('badge_id')
          .eq('user_id', user.id)

        setBadges(badgesData || [])
        setEarnedBadges(new Set(userBadgesData?.map((ub) => ub.badge_id) || []))
      } catch (error) {
        console.error('Error fetching badges:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBadges()
  }, [user])

  if (loading)
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-emerald" />
      </div>
    )

  return (
    <div className="flex flex-col gap-8 pb-10 max-w-4xl mx-auto animate-fade-in">
      <div className="text-center md:text-left flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b-2 border-silver pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-navy flex items-center justify-center md:justify-start gap-3">
            <Trophy className="w-8 h-8 text-yellow-500 fill-yellow-500" />
            Galeria de Badges
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            Acompanhe suas conquistas na trilha premium.
          </p>
        </div>
        <div className="bg-white border-2 border-silver rounded-xl px-4 py-2 flex items-center gap-3 shrink-0 mx-auto md:mx-0 shadow-sm">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">
            Progresso
          </span>
          <span className="text-lg font-black text-emerald">
            {earnedBadges.size} / {badges.length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {badges.map((badge) => {
          const isEarned = earnedBadges.has(badge.id)

          return (
            <div
              key={badge.id}
              className={cn(
                'border-2 rounded-xl p-6 flex flex-col items-center text-center gap-3 transition-all duration-300',
                isEarned
                  ? 'bg-white border-silver shadow-md'
                  : 'bg-slate-50 border-slate-200 grayscale opacity-60',
              )}
            >
              <div
                className={cn(
                  'w-20 h-20 rounded-full flex items-center justify-center shadow-inner text-4xl shrink-0 border-4',
                  isEarned
                    ? 'bg-gradient-to-br from-yellow-200 to-yellow-400 border-yellow-100'
                    : 'bg-slate-200 border-slate-100',
                )}
              >
                {badge.icon || '🏅'}
              </div>
              <div className="flex flex-col flex-1 w-full mt-2">
                <h3
                  className={cn(
                    'font-bold text-lg leading-tight',
                    isEarned ? 'text-navy' : 'text-slate-600',
                  )}
                >
                  {badge.nome || badge.name}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mt-2 bg-slate-100 px-2 py-1 rounded-md">
                  {badge.requisito}
                </p>
                {badge.beneficio && (
                  <p className="text-xs font-bold text-emerald-600 mt-1">
                    {badge.beneficio}
                  </p>
                )}
              </div>
              <div
                className={cn(
                  'mt-auto w-full py-2 px-2 rounded-md text-xs font-black tracking-widest border uppercase',
                  isEarned
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-slate-100 text-slate-500 border-slate-200',
                )}
              >
                {isEarned ? 'CONQUISTADA' : 'Bloqueada'}
              </div>
            </div>
          )
        })}
      </div>

      {badges.length === 0 && (
        <div className="text-center p-10 border-2 border-dashed border-silver bg-slate-50 rounded-xl text-slate-500 font-medium">
          Nenhuma badge cadastrada na plataforma ainda.
        </div>
      )}

      <div className="flex justify-center mt-6">
        <Button3D
          variant="success"
          onClick={() => navigate('/dashboard/premium')}
          className="w-full sm:w-auto min-w-[250px] text-lg"
        >
          VOLTAR AO DASHBOARD
        </Button3D>
      </div>
    </div>
  )
}
