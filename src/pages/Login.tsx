import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button3D } from '@/components/ui/button-3d'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'sonner'
import { Shield } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loadingLocal, setLoadingLocal] = useState(false)
  const { signIn, user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard')
    }
  }, [user, loading, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoadingLocal(true)
    try {
      const { error } = await signIn(email, password)
      if (error) throw error

      toast.success('Login realizado com sucesso!')
      navigate('/dashboard')
    } catch (error: any) {
      setLoadingLocal(false)
      toast.error('Erro de autenticação', {
        description:
          error.message || 'Verifique suas credenciais e tente novamente.',
      })
    }
  }

  if (loading) return null

  return (
    <div className="min-h-screen bg-[#1a2a4a] flex items-center justify-center px-4">
      <div className="bg-[#22355c] p-8 rounded-2xl w-full max-w-md border border-[#c0c0c0]/20 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <Shield className="w-16 h-16 text-[#10b981] mb-4" />
          <h1 className="text-2xl font-bold text-white text-center">
            Bem-vindo de volta
          </h1>
          <p className="text-[#c0c0c0] text-sm mt-2 text-center">
            Acesse sua conta para continuar aprendendo.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-semibold text-[#c0c0c0] mb-1 block">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1a2a4a] border border-[#c0c0c0]/30 rounded-lg px-4 h-12 text-white focus:outline-none focus:border-[#10b981] transition-colors"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#c0c0c0] mb-1 block">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1a2a4a] border border-[#c0c0c0]/30 rounded-lg px-4 h-12 text-white focus:outline-none focus:border-[#10b981] transition-colors"
              required
              minLength={6}
            />
          </div>

          <Button3D
            variant="success"
            className="w-full mt-4"
            disabled={loadingLocal}
          >
            {loadingLocal ? 'Processando...' : 'Entrar'}
          </Button3D>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="text-[#10b981] text-sm font-semibold hover:underline"
          >
            Não tem uma conta? Cadastre-se
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-[#c0c0c0] text-xs hover:text-white"
          >
            Voltar para a página inicial
          </button>
        </div>
      </div>
    </div>
  )
}
