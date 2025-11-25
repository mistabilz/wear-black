'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [serverError, setServerError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setServerError('')

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Automatically log in after registration
        const loginResponse = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        })

        if (loginResponse.ok) {
          router.push('/')
        } else {
          // Redirect to login page if auto-login fails
          router.push('/account/login?message=Account created successfully. Please log in.')
        }
      } else {
        setServerError(data.error || 'Registration failed. Please try again.')
      }
    } catch (error) {
      console.error('Registration error:', error)
      setServerError('Failed to connect to the server. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16">
      <div className="max-w-md w-full">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold uppercase tracking-wide mb-4 px-2">
            Create an account
          </h1>
          <p className="text-off-white text-sm sm:text-base px-2">
            Join BLACK and start your journey
          </p>
        </div>

        {serverError && (
          <div className="bg-red-500/20 text-red-300 p-3 sm:p-4 rounded-md mb-6 text-center text-sm">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-xs sm:text-sm font-medium text-off-white mb-2 uppercase tracking-wide">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full px-4 py-3 sm:py-3.5 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-pink text-white text-base min-h-[48px]"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
            {errors.fullName && <p className="text-red-400 text-sm mt-2">{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-off-white mb-2 uppercase tracking-wide">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 sm:py-3.5 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-pink text-white text-base min-h-[48px]"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-off-white mb-2 uppercase tracking-wide">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 sm:py-3.5 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-pink text-white text-base min-h-[48px]"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            {errors.password && <p className="text-red-400 text-sm mt-2">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-xs sm:text-sm font-medium text-off-white mb-2 uppercase tracking-wide">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-3 sm:py-3.5 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-pink text-white text-base min-h-[48px]"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
            {errors.confirmPassword && <p className="text-red-400 text-sm mt-2">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-off-white text-sm px-2">
            Already have an account?{' '}
            <Link
              href="/account/login"
              className="text-white hover:text-soft-pink transition-colors underline font-semibold"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

