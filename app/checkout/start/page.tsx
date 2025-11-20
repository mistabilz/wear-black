'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'

export default function CheckoutStartPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const { cart } = useCart()

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      router.push('/cart')
    }
  }, [cart.length, router])

  // If already authenticated, go directly to checkout
  useEffect(() => {
    if (isAuthenticated && cart.length > 0) {
      router.push('/checkout')
    }
  }, [isAuthenticated, cart.length, router])

  if (cart.length === 0 || isAuthenticated) {
    return null
  }

  const handleGuestCheckout = () => {
    router.push('/checkout?guest=true')
  }

  const handleLoginCheckout = () => {
    router.push('/account/login?redirect=/checkout')
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-4xl font-display font-bold uppercase tracking-wide mb-12 text-center">
          Checkout
        </h1>

        <div className="bg-white/5 border border-white/10 rounded-lg p-8 space-y-6">
          <p className="text-center text-white/70 mb-8">
            Choose how you'd like to proceed with checkout
          </p>

          <div className="space-y-4">
            {/* Login / Create Account Option */}
            <button
              onClick={handleLoginCheckout}
              className="w-full bg-white text-black px-8 py-4 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 text-center"
            >
              Login / Create Account
            </button>

            <div className="text-center text-white/50 text-sm">OR</div>

            {/* Guest Checkout Option */}
            <button
              onClick={handleGuestCheckout}
              className="w-full border border-white/30 text-white px-8 py-4 rounded-full font-semibold uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-300 text-center"
            >
              Checkout as Guest
            </button>
          </div>

          <div className="pt-6 border-t border-white/10">
            <Link
              href="/cart"
              className="block text-center text-sm text-white/70 hover:text-white transition-colors underline"
            >
              Return to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

