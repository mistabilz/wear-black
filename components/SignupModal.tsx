'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { locale } = useLanguage()
  const currentLocale = pathname?.split('/')[1] || locale || 'en'

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

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

  const handleSignup = () => {
    // Mark modal as seen
    localStorage.setItem('hasSeenSignupModal', 'true')
    // Navigate to the Google Form page with locale
    router.push(`/${currentLocale}/join-the-movement`)
    onClose()
  }

  const handleNoThanks = () => {
    localStorage.setItem('hasSeenSignupModal', 'true')
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity"
        onClick={handleNoThanks}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-black border-2 border-white/20 rounded-2xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleNoThanks}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors p-1"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className="text-center space-y-6">
            {/* Headline */}
            <div>
              <h2 id="modal-title" className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-wide text-white mb-3">
                Get 15% Off Your First Drop
              </h2>
              <p className="text-off-white text-sm sm:text-base leading-relaxed">
                Sign up to join the movement and get 15% off your first order, plus early access to new drops.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleSignup}
                className="w-full bg-soft-pink text-black px-6 py-3.5 rounded-full font-bold uppercase tracking-wide hover:scale-105 hover:shadow-xl transition-all duration-300 text-sm"
              >
                Sign Up & Get 15% Off
              </button>

              <button
                onClick={handleNoThanks}
                className="w-full text-off-white hover:text-white text-sm underline transition-colors"
              >
                No thanks
              </button>
            </div>

            {/* Trust Badge */}
            <p className="text-xs text-off-white/60 leading-relaxed">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
