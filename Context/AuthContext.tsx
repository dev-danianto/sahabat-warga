import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase, User } from '@/lib/supabase'

interface AuthContextType {
    session: Session | null
    user: User | null
    loading: boolean
    signUp: (email: string, password: string, userData: { name: string; phone?: string }) => Promise<{ error: any }>
    signIn: (email: string, password: string) => Promise<{ error: any }>
    signOut: () => Promise<void>
    updateProfile: (userData: Partial<User>) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            if (session?.user) {
                fetchUserProfile(session.user.id)
            } else {
                setLoading(false)
            }
        })

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            if (session?.user) {
                fetchUserProfile(session.user.id)
            } else {
                setUser(null)
                setLoading(false)
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    const fetchUserProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('user_id', userId)
                .maybeSingle()
            if (error) throw error
            if (data) {
                setUser(data)
            } else {
                setUser(null)
            }
        } catch (error) {
            console.error('Error fetching user profile:', error)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const signUp = async (email: string, password: string, userData: { name: string; phone?: string }) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            })
            if (error) throw error
            if (data.user) {
                const { error: profileError } = await supabase
                    .from('users')
                    .insert([
                        {
                            user_id: data.user.id,
                            email: email,
                            name: userData.name,
                            phone: userData.phone,
                            password_hash: 'handled_by_supabase_auth',
                        }
                    ])
                if (profileError) throw profileError
            }
            return { error: null }
        } catch (error) {
            return { error }
        }
    }

    const signIn = async (email: string, password: string) => {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            return { error }
        } catch (error) {
            return { error }
        }
    }

    const signOut = async () => {
        await supabase.auth.signOut()
    }

    const updateProfile = async (userData: Partial<User>) => {
        try {
            if (!user) throw new Error('No user logged in')
            const { error } = await supabase
                .from('users')
                .update({ ...userData, updated_at: new Date().toISOString() })
                .eq('user_id', user.user_id)
            if (error) throw error
            setUser(currentUser => currentUser ? { ...currentUser, ...userData } as User : null)
            return { error: null }
        } catch (error) {
            return { error }
        }
    }

    const value = {
        session,
        user,
        loading,
        signUp,
        signIn,
        signOut,
        updateProfile,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}