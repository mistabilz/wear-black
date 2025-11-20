'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, isAuthenticated } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const redirect = searchParams.get('redirect') || '/'
      router.push(redirect)
    }
  }, [isAuthenticated, router, searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    const result = await login(email, password)
    setIsLoading(false)

    if (result.success) {
      const redirect = searchParams.get('redirect') || '/'
      router.push(redirect)
      router.refresh()
    } else {
      setError(result.error || 'Login failed. Please check your credentials.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-display font-bold uppercase tracking-wide mb-8 text-center">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm uppercase tracking-wide mb-2">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-white/30 rounded px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm uppercase tracking-wide mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/30 rounded px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black px-8 py-3 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/70">
          New customer?{' '}
          <Link href="/account/register" className="underline hover:text-white transition-colors">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}

