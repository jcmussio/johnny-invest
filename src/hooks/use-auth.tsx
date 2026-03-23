import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

type UserProfile = Database['public']['Tables']['users']['Row']

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: UserProfile | null
  signUp: (
    email: string,
    password: string,
  ) => Promise<{ data: any; error: any }>
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ data: any; error: any }>
  signOut: () => Promise<{ error: any }>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const fetchProfile = async (sessionUser: User) => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', sessionUser.id)
          .single()

        if (error && error.code === 'PGRST116') {
          // Row not found, let's create it automatically for robustness
          const { data: newData, error: insertError } = await supabase
            .from('users')
            .insert({
              id: sessionUser.id,
              email: sessionUser.email!,
            })
            .select('*')
            .single()

          if (!insertError && mounted) {
            setProfile(newData)
            setLoading(false)
            return
          }
        }

        if (mounted) {
          setProfile(data)
          setLoading(false)
        }
      } catch (err) {
        if (mounted) {
          setProfile(null)
          setLoading(false)
        }
      }
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (mounted) {
        setSession(session)
        setUser(session?.user ?? null)
        if (session?.user) {
          fetchProfile(session.user)
        } else {
          setProfile(null)
          setLoading(false)
        }
      }
    })

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        setSession(session)
        setUser(session?.user ?? null)
        if (session?.user) {
          fetchProfile(session.user)
        } else {
          setProfile(null)
          setLoading(false)
        }
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/cadastro-completo`,
      },
    })
    return { data, error }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  return (
    <AuthContext.Provider
      value={{ user, session, profile, signUp, signIn, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}
