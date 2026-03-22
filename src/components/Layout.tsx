import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './layout/Sidebar'
import { BottomNav } from './layout/BottomNav'
import { RightSidebar } from './layout/RightSidebar'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

export default function Layout() {
  const isMobile = useIsMobile()
  const location = useLocation()

  // Lesson page handles its own layout
  if (location.pathname === '/lesson') {
    return <Outlet />
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Sidebar (Desktop) */}
      <Sidebar />

      {/* Main Content Area */}
      <main
        className={cn(
          'flex-1 flex justify-center pb-24 lg:pb-0 lg:pl-[256px] lg:pr-[360px] min-h-screen',
          // If screen is smaller than lg but bigger than md, we don't have right sidebar, so pr is 0
          'max-lg:pr-0',
        )}
      >
        <div className="w-full max-w-[600px] px-4 py-6 md:py-8">
          <Outlet />
        </div>
      </main>

      {/* Right Sidebar (Desktop) */}
      <RightSidebar />

      {/* Bottom Nav (Mobile) */}
      <BottomNav />
    </div>
  )
}
