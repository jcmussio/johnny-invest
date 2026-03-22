import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Home, Trophy, Store, User } from 'lucide-react'

const navItems = [
  { label: 'APRENDER', icon: Home, path: '/', color: 'text-duo-blue' },
  {
    label: 'RANKING',
    icon: Trophy,
    path: '/leaderboard',
    color: 'text-duo-yellow',
  },
  { label: 'LOJA', icon: Store, path: '/shop', color: 'text-duo-purple' },
  { label: 'PERFIL', icon: User, path: '/profile', color: 'text-duo-red' },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <aside className="hidden lg:flex flex-col w-[256px] fixed left-0 top-0 h-screen border-r-2 border-duo-gray px-4 py-6 bg-white z-20">
      <div className="mb-8 px-4">
        <h1 className="text-duo-green text-3xl font-extrabold tracking-tighter">
          duolingo
        </h1>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-4 px-4 py-3 rounded-xl transition-transform hover:bg-slate-100 group',
                isActive
                  ? 'bg-blue-50/50 border-2 border-duo-blue text-duo-blue'
                  : 'text-slate-500 hover:text-slate-700',
              )}
            >
              <item.icon
                className={cn(
                  'w-7 h-7 stroke-[2.5px]',
                  isActive ? item.color : 'text-inherit',
                )}
              />
              <span
                className={cn(
                  'text-sm font-bold tracking-widest uppercase',
                  isActive ? item.color : 'text-inherit',
                )}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
