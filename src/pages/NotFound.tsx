import { useLocation, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { Button3D } from '@/components/ui/button-3d'
import { ShieldAlert } from 'lucide-react'

export default function NotFound() {
  const location = useLocation()

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname,
    )
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-[#1a2a4a] flex flex-col items-center justify-center p-4 text-center">
      <ShieldAlert className="w-24 h-24 text-[#ef4444] mb-6 animate-pulse" />
      <h1 className="text-5xl font-extrabold text-white mb-4">404</h1>
      <p className="text-xl text-[#c0c0c0] mb-8 max-w-md">
        Página não encontrada. Parece que você navegou para fora da trilha do
        investidor.
      </p>
      <Button3D variant="success" size="lg" asChild>
        <Link to="/dashboard/premium">Voltar para Dashboard</Link>
      </Button3D>
    </div>
  )
}
