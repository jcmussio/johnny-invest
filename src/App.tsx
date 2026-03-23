import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Index from './pages/Index'
import Learn from './pages/Learn'
import Dashboard from './pages/Dashboard'
import Lesson from './pages/Lesson'
import Quiz from './pages/Quiz'
import Leaderboard from './pages/Leaderboard'
import Shop from './pages/Shop'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Success from './pages/Success'
import CadastroCompleto from './pages/CadastroCompleto'
import ResumoCompra from './pages/ResumoCompra'
import Layout from './components/Layout'
import Missions from './pages/Missions'
import Badges from './pages/Badges'
import { AppProvider } from './stores/useAppStore'
import { AuthProvider } from './hooks/use-auth'
import { ProtectedRoute } from './components/ProtectedRoute'

const App = () => (
  <BrowserRouter
    future={{ v7_startTransition: false, v7_relativeSplatPath: false }}
  >
    <AuthProvider>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Login />} />
            <Route path="/cadastro-completo" element={<CadastroCompleto />} />
            <Route path="/resumo-compra" element={<ResumoCompra />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/success" element={<Success />} />
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
              <Route path="/quiz/:lessonId" element={<Quiz />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </TooltipProvider>
      </AppProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App
