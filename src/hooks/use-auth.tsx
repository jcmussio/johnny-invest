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
          }
        } else if (mounted && data) {
          // Streak Logic
          const todayDate = new Date()
          const todayStr = new Date(
            todayDate.getTime() - todayDate.getTimezoneOffset() * 60000,
          )
            .toISOString()
            .split('T')[0]

          if (data.last_login_date !== todayStr) {
            let newStreak = data.streak || 0
            if (data.last_login_date) {
              const lastLogin = new Date(data.last_login_date)
              lastLogin.setUTCHours(0, 0, 0, 0)
              const today = new Date(todayStr)
              today.setUTCHours(0, 0, 0, 0)

              const diffTime = today.getTime() - lastLogin.getTime()
              const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))

              if (diffDays === 1) {
                newStreak += 1
              } else if (diffDays > 1) {
                newStreak = 1
              }
            } else {
              newStreak = 1
            }

            await supabase
              .from('users')
              .update({
                last_login_date: todayStr,
                streak: newStreak,
              })
              .eq('id', sessionUser.id)

            data.last_login_date = todayStr
            data.streak = newStreak
          }

          setProfile(data)
        }
      } catch (err) {
        if (mounted) {
          setProfile(null)
        }
      }
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (mounted) {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)

        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user)
          }, 0)
        } else {
          setProfile(null)
        }
      }
    })

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)

        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user)
          }, 0)
        } else {
          setProfile(null)
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
        emailRedirectTo: `${window.location.origin}/pricing`,
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
