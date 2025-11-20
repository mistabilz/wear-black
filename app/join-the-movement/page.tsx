'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function JoinTheMovementPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name || !email) {
      setError('Please fill in all fields')
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    if (!consent) {
      setError('Please agree to receive emails to continue')
      return
    }

    setIsLoading(true)

    // Mock API call - in production, this would call your backend
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Store subscription (in production, send to your API)
      const subscriptions = JSON.parse(localStorage.getItem('black_subscriptions') || '[]')
      subscriptions.push({ name, email, date: new Date().toISOString() })
      localStorage.setItem('black_subscriptions', JSON.stringify(subscriptions))

      setIsSuccess(true)
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-md text-center">
          <div className="mb-8">
            <svg
              className="w-20 h-20 mx-auto text-soft-pink mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h1 className="text-4xl font-display font-bold uppercase tracking-wide mb-6">
            You're In
          </h1>

          <p className="text-xl text-white/70 mb-8">
            Check your email for updates and your 10% off code.
          </p>

          <button
            onClick={() => router.push('/')}
            className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-md">
        <h1 className="text-4xl font-display font-bold uppercase tracking-wide mb-4 text-center">
          Join the Movement
        </h1>

        <p className="text-center text-white/70 mb-8">
          Sign up to be the first to know about new drops and get 10% off all new releases.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm uppercase tracking-wide mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/10 border border-white/30 rounded px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
              placeholder="Your name"
              required
            />
          </div>

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

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-white/30 bg-white/10 text-soft-pink focus:ring-soft-pink focus:ring-offset-0"
              required
            />
            <label htmlFor="consent" className="text-sm text-white/70">
              I agree to receive emails about new drops and promotions from BLACK.
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-soft-pink text-black px-8 py-3 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'SIGNING UP...' : 'SIGN UP'}
          </button>
        </form>
      </div>
    </div>
  )
}

