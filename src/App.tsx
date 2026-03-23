import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Loader2 } from 'lucide-react'

import { AppProvider } from './stores/useAppStore'
import { AuthProvider } from './hooks/use-auth'
import { ProtectedRoute } from './components/ProtectedRoute'
import Layout from './components/Layout'

const Index = lazy(() => import('./pages/Index'))
const Learn = lazy(() => import('./pages/Learn'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const DashboardPremium = lazy(() => import('./pages/DashboardPremium'))
const AulaPremium = lazy(() => import('./pages/AulaPremium'))
const QuizPremium = lazy(() => import('./pages/QuizPremium'))
const MissaoPremium = lazy(() => import('./pages/MissaoPremium'))
const Lesson = lazy(() => import('./pages/Lesson'))
const Leaderboard = lazy(() => import('./pages/Leaderboard'))
const Shop = lazy(() => import('./pages/Shop'))
const Profile = lazy(() => import('./pages/Profile'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const CadastroCompleto = lazy(() => import('./pages/CadastroCompleto'))
const Welcome = lazy(() => import('./pages/Welcome'))
const Missions = lazy(() => import('./pages/Missions'))
const Badges = lazy(() => import('./pages/Badges'))

const LoadingFallback = () => (
  <div className="min-h-screen bg-[#1a2a4a] flex items-center justify-center">
    <Loader2 className="w-12 h-12 animate-spin text-[#10b981]" />
  </div>
)

const App = () => (
  <BrowserRouter
    future={{ v7_startTransition: false, v7_relativeSplatPath: false }}
  >
    <AuthProvider>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/cadastro-completo" element={<CadastroCompleto />} />
              <Route path="/welcome" element={<Welcome />} />

              {/* Rotas de Aprendizado Liberadas (Sem Autenticação Obrigatória) */}
              <Route element={<Layout />}>
                <Route
                  path="/dashboard/premium"
                  element={<DashboardPremium />}
                />
              </Route>
              <Route path="/aula/:id" element={<AulaPremium />} />
              <Route path="/quiz/:id" element={<QuizPremium />} />
              <Route path="/missao/:id" element={<MissaoPremium />} />

              <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                  <Route path="/learn" element={<Learn />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/missions" element={<Missions />} />
                  <Route path="/badges" element={<Badges />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>

                <Route
                  path="/lesson"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/lesson/:id" element={<Lesson />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </TooltipProvider>
      </AppProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App
