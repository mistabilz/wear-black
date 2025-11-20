'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('black_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        localStorage.removeItem('black_user')
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Mock authentication - in production, this would call an API
    const storedUsers = localStorage.getItem('black_users')
    const users = storedUsers ? JSON.parse(storedUsers) : []

    const foundUser = users.find((u: any) => u.email === email && u.password === password)
    
    if (foundUser) {
      const userData = {
        id: foundUser.id,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
      }
      setUser(userData)
      localStorage.setItem('black_user', JSON.stringify(userData))
      return { success: true }
    }

    return { success: false, error: 'Invalid email or password' }
  }

  const register = async (firstName: string, lastName: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Mock registration - in production, this would call an API
    const storedUsers = localStorage.getItem('black_users')
    const users = storedUsers ? JSON.parse(storedUsers) : []

    // Check if user already exists
    if (users.some((u: any) => u.email === email)) {
      return { success: false, error: 'An account with this email already exists' }
    }

    const newUser = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      password, // In production, this would be hashed
    }

    users.push(newUser)
    localStorage.setItem('black_users', JSON.stringify(users))

    const userData = {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    }
    setUser(userData)
    localStorage.setItem('black_user', JSON.stringify(userData))

    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('black_user')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

