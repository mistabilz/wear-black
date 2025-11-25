'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        // Redirect to home page on success
        router.push('/')
      } else {
        setError(data.error || 'Login failed. Please try again.')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Failed to connect to the server. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-display font-bold uppercase tracking-wide mb-4">
            Login
          </h1>
          <p className="text-off-white text-sm lg:text-base">
            Please enter your e-mail and password:
          </p>
        </div>

        {error && (
          <div className="bg-red-500/20 text-red-300 p-3 rounded-md mb-6 text-center text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-off-white mb-2">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-soft-pink text-white"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-off-white mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-soft-pink text-white"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <div className="flex justify-end">
            <Link
              href="#"
              className="text-sm text-off-white hover:text-white transition-colors underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black px-8 py-3 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-off-white text-sm">
            New customer?{' '}
            <Link
              href="/account/register"
              className="text-white hover:text-soft-pink transition-colors underline font-semibold"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

