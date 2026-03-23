import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { BookOpen, Trophy, Store, User, Target, Medal } from 'lucide-react'
import { Logo } from '@/components/ui/logo'

const navItems = [
  { label: 'APRENDER', icon: BookOpen, path: '/learn', color: 'text-navy' },
  {
    label: 'MISSÕES',
    icon: Target,
    path: '/missions',
    color: 'text-orange-500',
  },
  {
    label: 'BADGES',
    icon: Medal,
    path: '/badges',
    color: 'text-yellow-500',
  },
  {
    label: 'RANKING',
    icon: Trophy,
    path: '/leaderboard',
    color: 'text-silver-shade',
  },
  { label: 'LOJA', icon: Store, path: '/shop', color: 'text-emerald' },
  { label: 'PERFIL', icon: User, path: '/profile', color: 'text-navy' },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <aside className="hidden lg:flex flex-col w-[256px] fixed left-0 top-0 h-screen border-r-2 border-silver-light px-4 py-6 bg-white z-20">
      <div className="mb-8 px-4 flex items-center gap-3">
        <Logo className="w-10 h-10" />
        <h1 className="text-navy text-2xl font-extrabold tracking-tight">
          Johnny Invest
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
                'flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-slate-50 group border-2',
                isActive
                  ? 'bg-blue-50/50 border-navy text-navy shadow-sm'
                  : 'border-transparent text-slate-500 hover:text-navy',
              )}
            >
              <item.icon
                className={cn(
                  'w-7 h-7 stroke-[2.5px]',
                  isActive ? item.color : 'text-inherit group-hover:text-navy',
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
