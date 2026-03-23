import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export function ProtectedRoute() {
  const { user, profile, loading } = useAuth()
  const toastShown = useRef(false)

  useEffect(() => {
    if (!loading && (!user || !profile?.is_premium)) {
      if (!toastShown.current) {
        toast.error('Acesso Restrito', {
          description:
            'Você precisa adquirir o curso para acessar este conteúdo.',
        })
        toastShown.current = true
      }
    }
  }, [user, profile, loading])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a2a4a] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#10b981]" />
      </div>
    )
  }

  if (!user || !profile?.is_premium) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
