'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    consent: false,
  })
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    consent: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleClose = () => {
    localStorage.setItem('hasSeenSignupModal', 'true')
    onClose()
  }

  const validateForm = () => {
    const newErrors = {
      fullName: '',
      email: '',
      consent: '',
    }
    let isValid = true

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
      isValid = false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
      isValid = false
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
      isValid = false
    }

    if (!formData.consent) {
      newErrors.consent = 'You must agree to receive updates from BLACK'
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
          password: `temp_${Date.now()}`, // Generate temporary password for modal signups
          consent: formData.consent,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setShowSuccess(true)
        localStorage.setItem('hasSeenSignupModal', 'true')
        // Close modal after 3 seconds
        setTimeout(() => {
          onClose()
        }, 3000)
      } else {
        setServerError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setServerError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div className="relative w-full max-w-md bg-black border-2 border-soft-pink rounded-2xl shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {showSuccess ? (
          // Success State
          <div className="p-8 sm:p-10 text-center">
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
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-wide mb-4">
              You're In!
            </h2>
            <p className="text-off-white text-base mb-2">
              Your 15% discount code is on its way to your email.
            </p>
            <p className="text-off-white/80 text-sm">
              Welcome to the movement. 🔥
            </p>
          </div>
        ) : (
          // Form State
          <div className="p-6 sm:p-8">
            <div className="text-center mb-6">
              <h2
                id="modal-title"
                className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-wide mb-3"
              >
                Get 15% Off Your First Drop
              </h2>
              <p className="text-off-white text-sm sm:text-base">
                Sign up to join the movement and get 15% off your first order, plus early access to new drops.
              </p>
            </div>

            {serverError && (
              <div className="mb-4 p-3 bg-red-900/20 border border-red-500 rounded-lg">
                <p className="text-red-400 text-sm">{serverError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label htmlFor="modal-fullName" className="block text-white text-xs sm:text-sm font-semibold mb-2 uppercase tracking-wide">
                  Full Name
                </label>
                <input
                  type="text"
                  id="modal-fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white text-base placeholder-white/50 focus:outline-none focus:border-soft-pink focus:ring-1 focus:ring-soft-pink transition-colors min-h-[48px]"
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="mt-2 text-red-400 text-sm">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="modal-email" className="block text-white text-xs sm:text-sm font-semibold mb-2 uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  id="modal-email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white text-base placeholder-white/50 focus:outline-none focus:border-soft-pink focus:ring-1 focus:ring-soft-pink transition-colors min-h-[48px]"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-2 text-red-400 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Consent Checkbox */}
              <div>
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 rounded border-white/30 bg-white/10 text-soft-pink focus:ring-soft-pink focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="ml-3 text-white/90 text-sm sm:text-base leading-relaxed">
                    I agree to receive product updates, drops, and offers from BLACK.
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
                className="w-full bg-soft-pink text-black px-6 py-3.5 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-h-[48px] flex items-center justify-center"
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
                  'Sign Up & Get 15% Off'
                )}
              </button>

              {/* No Thanks Button */}
              <button
                type="button"
                onClick={handleClose}
                className="w-full text-off-white hover:text-white transition-colors text-sm underline py-2"
              >
                No thanks
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

