import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'
import { Button3D } from '@/components/ui/button-3d'
import { Loader2, Medal } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlock_criteria: string
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
        const { data: badgesData, error: badgesError } = await supabase
          .from('badges')
          .select('*')
          .order('created_at', { ascending: true })

        if (badgesError) throw badgesError

        const { data: userBadgesData, error: userBadgesError } = await supabase
          .from('user_badges')
          .select('badge_id')
          .eq('user_id', user.id)

        if (userBadgesError) throw userBadgesError

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

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-emerald" />
      </div>
    )
  }

  const earnedCount = earnedBadges.size
  const totalCount = badges.length

  return (
    <div className="flex flex-col gap-8 pb-10 max-w-4xl mx-auto animate-fade-in">
      <div className="text-center md:text-left flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b-2 border-silver pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-navy flex items-center justify-center md:justify-start gap-3">
            <Medal className="w-8 h-8 text-yellow-500 fill-yellow-500" />
            Galeria de Badges
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            Acompanhe suas conquistas e descubra os próximos desafios.
          </p>
        </div>
        <div className="bg-white border-2 border-silver rounded-xl px-4 py-2 flex items-center gap-3 shrink-0 mx-auto md:mx-0 shadow-sm">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">
            Progresso
          </span>
          <span className="text-lg font-black text-emerald">
            {earnedCount} / {totalCount}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map((badge) => {
          const isEarned = earnedBadges.has(badge.id)

          return (
            <div
              key={badge.id}
              className={cn(
                'border-2 rounded-xl p-5 flex flex-col items-center text-center gap-3 transition-all duration-300',
                isEarned
                  ? 'bg-white border-silver hover:border-navy hover:shadow-md'
                  : 'bg-slate-50 border-slate-200 grayscale opacity-60',
              )}
            >
              <div
                className={cn(
                  'w-16 h-16 rounded-full flex items-center justify-center shadow-inner text-3xl shrink-0',
                  isEarned
                    ? 'bg-gradient-to-br from-yellow-100 to-yellow-200'
                    : 'bg-slate-200',
                )}
              >
                {badge.icon || '🏅'}
              </div>
              <div className="flex flex-col flex-1 w-full">
                <h3
                  className={cn(
                    'font-bold leading-tight',
                    isEarned ? 'text-navy' : 'text-slate-600',
                  )}
                >
                  {badge.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-3">
                  {badge.description}
                </p>
              </div>
              <div
                className={cn(
                  'mt-auto w-full py-1.5 px-2 rounded-md text-[10px] sm:text-xs font-bold border',
                  isEarned
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-slate-100 text-slate-500 border-slate-200',
                )}
              >
                {isEarned
                  ? 'CONQUISTADA'
                  : badge.unlock_criteria || 'Bloqueada'}
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
          onClick={() => navigate('/dashboard')}
          className="w-full sm:w-auto min-w-[250px] text-lg"
        >
          CONTINUAR JORNADA
        </Button3D>
      </div>
    </div>
  )
}
