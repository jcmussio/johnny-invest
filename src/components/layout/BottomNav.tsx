import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Home, Trophy, Store, User, Target, Medal } from 'lucide-react'

const navItems = [
  { label: 'APRENDER', icon: Home, path: '/dashboard' },
  { label: 'MISSÕES', icon: Target, path: '/missions' },
  { label: 'BADGES', icon: Medal, path: '/badges' },
  { label: 'RANKING', icon: Trophy, path: '/leaderboard' },
  { label: 'PERFIL', icon: User, path: '/profile' },
]

export function BottomNav() {
  const location = useLocation()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t-2 border-duo-gray flex justify-around items-center h-20 z-50 px-2 pb-safe">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path
        return (
          <Link
            key={item.path}
            to={item.path}
            className="flex-1 flex justify-center items-center h-full"
          >
            <div className="relative flex items-center justify-center w-12 h-12">
              <item.icon
                className={cn(
                  'w-6 h-6 sm:w-7 sm:h-7 transition-all stroke-[2.5px]',
                  isActive ? 'text-duo-blue scale-110' : 'text-stone-400',
                )}
              />
            </div>
          </Link>
        )
      })}
    </nav>
  )
}
