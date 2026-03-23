import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export function ProtectedRoute() {
  const { user, loading } = useAuth()
  const toastShown = useRef(false)

  useEffect(() => {
    if (!loading && !user) {
      if (!toastShown.current) {
        toast.error('Acesso Restrito', {
          description: 'Você precisa estar logado para acessar este conteúdo.',
        })
        toastShown.current = true
      }
    }
  }, [user, loading])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a2a4a] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#10b981]" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
