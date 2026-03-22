import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Index from './pages/Index'
import Learn from './pages/Learn'
import Lesson from './pages/Lesson'
import Leaderboard from './pages/Leaderboard'
import Shop from './pages/Shop'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import { AppProvider } from './stores/useAppStore'
import { AuthProvider } from './hooks/use-auth'

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
            <Route element={<Layout />}>
              <Route path="/learn" element={<Learn />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/lesson" element={<Lesson />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </TooltipProvider>
      </AppProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App
