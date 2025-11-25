'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'

export default function JoinTheMovement() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    consent: false,
  })
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    consent: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState('')

  const validateForm = () => {
    const newErrors = {
      fullName: '',
      email: '',
      password: '',
      consent: '',
    }
    let isValid = true

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
      isValid = false
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
      isValid = false
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
      isValid = false
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
      isValid = false
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
      isValid = false
    }

    // Consent validation
    if (!formData.consent) {
      newErrors.consent = 'You must agree to receive messages from BLACK'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setServerError('')

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/join-the-movement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          password: formData.password,
          consent: formData.consent,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setFormData({
          fullName: '',
          email: '',
          password: '',
          consent: false,
        })
        setErrors({
          fullName: '',
          email: '',
          password: '',
          consent: '',
        })
      } else {
        setServerError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setServerError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-soft-pink rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-white uppercase tracking-wide mb-4">
              WELCOME TO THE MOVEMENT
            </h1>
            <p className="text-off-white text-lg mb-2">
              You're officially part of something bigger. A community built on culture, confidence, and purpose.
            </p>
            <p className="text-off-white text-base">
              Your 10% discount is on its way to your email. Stay tuned. You'll be the first to know when the next drop arrives.
            </p>
          </div>
          <Link
            href="/"
            className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-block text-white font-bold text-2xl uppercase tracking-wider mb-6 hover:text-soft-pink transition-colors"
          >
            BLACK
          </Link>
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-white uppercase tracking-wide mb-4">
            Join the Movement
          </h1>
          <p className="text-off-white text-base lg:text-lg">
            Sign up to be the first to know about new drops from BLACK and get 10% off your next release.
          </p>
        </div>

        {serverError && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg">
            <p className="text-red-400 text-sm">{serverError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-white text-sm font-semibold mb-2 uppercase tracking-wide">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-soft-pink focus:ring-1 focus:ring-soft-pink transition-colors"
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="mt-2 text-red-400 text-sm">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-white text-sm font-semibold mb-2 uppercase tracking-wide">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-soft-pink focus:ring-1 focus:ring-soft-pink transition-colors"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="mt-2 text-red-400 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-white text-sm font-semibold mb-2 uppercase tracking-wide">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-soft-pink focus:ring-1 focus:ring-soft-pink transition-colors"
              placeholder="Minimum 8 characters"
            />
            {errors.password && (
              <p className="mt-2 text-red-400 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Consent Checkbox */}
          <div>
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-1 w-5 h-5 rounded border-white/30 bg-white/10 text-soft-pink focus:ring-soft-pink focus:ring-offset-0 cursor-pointer"
              />
              <span className="ml-3 text-white/90 text-sm">
                I agree to receive product messages, updates, and discounts from BLACK.
              </span>
            </label>
            {errors.consent && (
              <p className="mt-2 text-red-400 text-sm">{errors.consent}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-soft-pink text-black px-8 py-3 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing Up...
              </span>
            ) : (
              'Sign Up'
            )}
          </button>

          <p className="text-center text-white/60 text-sm">
            You can unsubscribe at any time.
          </p>
        </form>
      </div>
    </div>
  )
}

