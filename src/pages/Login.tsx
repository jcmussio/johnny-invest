import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button3D } from '@/components/ui/button-3d'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'sonner'
import { Shield, Loader2 } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loadingLocal, setLoadingLocal] = useState(false)
  const { signIn, user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard/premium')
    }
  }, [user, loading, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Preencha todos os campos')
      return
    }

    setLoadingLocal(true)
    try {
      const { error } = await signIn(email, password)

      if (error) {
        if (
          error.message === 'Invalid login credentials' ||
          error.message?.includes('invalid_credentials') ||
          error.code === 'invalid_credentials'
        ) {
          throw new Error(
            'Email ou senha incorretos. Verifique suas credenciais e tente novamente.',
          )
        }
        if (error.message?.includes('Email not confirmed')) {
          throw new Error('Por favor, confirme seu email antes de fazer login.')
        }
        throw error
      }

      toast.success('Login realizado com sucesso!')
      navigate('/dashboard/premium')
    } catch (error: any) {
      toast.error('Erro de autenticação', {
        description:
          error.message || 'Verifique suas credenciais e tente novamente.',
      })
    } finally {
      setLoadingLocal(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a2a4a] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#10b981]" />
      </div>
    )
  }

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
              disabled={loadingLocal}
              autoComplete="email"
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
              disabled={loadingLocal}
              autoComplete="current-password"
            />
          </div>

          <Button3D
            variant="success"
            className="w-full mt-4"
            disabled={loadingLocal}
            type="submit"
          >
            {loadingLocal ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            ) : (
              'Entrar'
            )}
          </Button3D>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/signup"
            className="text-[#10b981] text-sm font-semibold hover:underline"
          >
            Não tem uma conta? Cadastre-se
          </Link>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-[#c0c0c0] text-xs hover:text-white">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  )
}
