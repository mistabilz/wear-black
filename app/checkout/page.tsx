'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'

export default function CheckoutPage() {
  const router = useRouter()
  const { isAuthenticated, user } = useAuth()
  const { cart, clearCart } = useCart()
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'Canada',
    phone: '',
  })
  const [paymentInfo, setPaymentInfo] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  })
  const [billingInfo, setBillingInfo] = useState({
    sameAsShipping: true,
    addressLine1: '',
    addressLine2: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'Canada',
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')
  const [isGuest, setIsGuest] = useState(false)

  // Check if guest checkout
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search)
      if (searchParams.get('guest') === 'true') {
        setIsGuest(true)
      } else if (!isAuthenticated) {
        // If not guest and not authenticated, redirect to checkout start
        router.push('/checkout/start')
      }
    }
  }, [isAuthenticated, router])

  // Pre-fill shipping info if user is logged in
  useEffect(() => {
    if (user && !isGuest) {
      setShippingInfo((prev) => ({
        ...prev,
        fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      }))
      setPaymentInfo((prev) => ({
        ...prev,
        cardholderName: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      }))
    }
  }, [user, isGuest])

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      router.push('/cart')
    }
  }, [cart.length, router])

  // Sync billing with shipping when checkbox is checked
  useEffect(() => {
    if (billingInfo.sameAsShipping) {
      setBillingInfo({
        sameAsShipping: true,
        addressLine1: shippingInfo.addressLine1,
        addressLine2: shippingInfo.addressLine2,
        city: shippingInfo.city,
        province: shippingInfo.province,
        postalCode: shippingInfo.postalCode,
        country: shippingInfo.country,
      })
    }
  }, [billingInfo.sameAsShipping, shippingInfo])

  const calculateTotal = () => {
    const subtotal = cart.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('$', ''))
      return sum + price * (item.quantity || 1)
    }, 0)
    const tax = subtotal * 0.13
    const shipping = 15.0 // Fixed shipping cost
    return { subtotal, tax, shipping, total: subtotal + tax + shipping }
  }

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  // Format expiry date (MM/YY)
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  // Validate card number (Luhn algorithm)
  const validateCardNumber = (cardNumber: string): boolean => {
    const cleaned = cardNumber.replace(/\s/g, '')
    if (cleaned.length < 13 || cleaned.length > 19) return false
    
    let sum = 0
    let isEven = false
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i])
      if (isEven) {
        digit *= 2
        if (digit > 9) digit -= 9
      }
      sum += digit
      isEven = !isEven
    }
    return sum % 10 === 0
  }

  // Validate expiry date
  const validateExpiryDate = (expiry: string): boolean => {
    const [month, year] = expiry.split('/')
    if (!month || !year) return false
    const monthNum = parseInt(month)
    const yearNum = parseInt('20' + year)
    if (monthNum < 1 || monthNum > 12) return false
    
    const now = new Date()
    const expiryDate = new Date(yearNum, monthNum - 1)
    return expiryDate > now
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate shipping information
    if (
      !shippingInfo.fullName ||
      !shippingInfo.addressLine1 ||
      !shippingInfo.city ||
      !shippingInfo.province ||
      !shippingInfo.postalCode ||
      !shippingInfo.country ||
      !shippingInfo.phone
    ) {
      setError('Please fill in all required shipping fields')
      return
    }

    // Validate email (for guest checkout)
    if (isGuest || !isAuthenticated) {
      if (!shippingInfo.email) {
        setError('Please enter your email address')
        return
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(shippingInfo.email)) {
        setError('Please enter a valid email address')
        return
      }
    }

    // Validate payment information
    if (
      !paymentInfo.cardholderName ||
      !paymentInfo.cardNumber ||
      !paymentInfo.expiryDate ||
      !paymentInfo.cvc
    ) {
      setError('Please fill in all payment fields')
      return
    }

    // Validate card number format
    const cleanedCardNumber = paymentInfo.cardNumber.replace(/\s/g, '')
    if (cleanedCardNumber.length < 13 || cleanedCardNumber.length > 19) {
      setError('Please enter a valid card number')
      return
    }

    if (!validateCardNumber(paymentInfo.cardNumber)) {
      setError('Invalid card number. Please check and try again.')
      return
    }

    // Validate expiry date
    if (!validateExpiryDate(paymentInfo.expiryDate)) {
      setError('Invalid or expired card. Please check the expiry date.')
      return
    }

    // Validate CVC
    if (paymentInfo.cvc.length < 3 || paymentInfo.cvc.length > 4) {
      setError('Please enter a valid CVC/CVV (3-4 digits)')
      return
    }

    // Validate billing address if not same as shipping
    if (!billingInfo.sameAsShipping) {
      if (
        !billingInfo.addressLine1 ||
        !billingInfo.city ||
        !billingInfo.province ||
        !billingInfo.postalCode ||
        !billingInfo.country
      ) {
        setError('Please fill in all billing address fields')
        return
      }
    }

    setIsProcessing(true)

    // Mock payment processing
    // In production, this would integrate with Stripe or another payment processor
    // NEVER log or store raw card data - this is just for demonstration
    try {
      // Simulate API call to payment processor
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In production, you would:
      // 1. Send payment data to your backend securely
      // 2. Backend creates Stripe PaymentIntent
      // 3. Backend confirms payment
      // 4. On success, clear cart and redirect

      // Store order details before clearing cart
      const orderData = {
        items: [...cart],
        total: total,
        date: new Date().toISOString(),
      }
      localStorage.setItem('black_last_order', JSON.stringify(orderData))

      // Clear cart and redirect to order confirmation page
      clearCart()
      router.push('/order-confirmation')
    } catch (err) {
      setError('Payment processing failed. Please try again.')
      setIsProcessing(false)
    }
  }

  // Redirect if cart is empty
  if (cart.length === 0) {
    router.push('/cart')
    return null
  }

  // Show loading if checking guest status
  if (!isAuthenticated && !isGuest) {
    return null // Will redirect
  }

  const { subtotal, tax, shipping, total } = calculateTotal()

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-display font-bold uppercase tracking-wide mb-12">
          Checkout
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-8">
              {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded text-sm">
                  {error}
                </div>
              )}

              {/* Shipping Information */}
              <div>
                <h2 className="text-2xl font-semibold uppercase tracking-wide mb-6">
                  Shipping Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm uppercase tracking-wide mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={shippingInfo.fullName}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, fullName: e.target.value })
                      }
                      className="w-full bg-white/10 border border-white/30 rounded px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="addressLine1"
                      className="block text-sm uppercase tracking-wide mb-2"
                    >
                      Address Line 1 *
                    </label>
                    <input
                      type="text"
                      id="addressLine1"
                      value={shippingInfo.addressLine1}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, addressLine1: e.target.value })
                      }
                      className="w-full bg-white/10 border border-white/30 rounded px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="addressLine2"
                      className="block text-sm uppercase tracking-wide mb-2"
                    >
                      Address Line 2 (Optional)
                    </label>
                    <input
                      type="text"
                      id="addressLine2"
                      value={shippingInfo.addressLine2}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, addressLine2: e.target.value })
                      }
                      className="w-full bg-white/10 border border-white/30 rounded px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm uppercase tracking-wide mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, city: e.target.value })
                        }
                        className="w-full bg-white/10 border border-white/30 rounded px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="province"
                        className="block text-sm uppercase tracking-wide mb-2"
                      >
                        Province/State *
                      </label>
                      <input
                        type="text"
                        id="province"
                        value={shippingInfo.province}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, province: e.target.value })
                        }
                        className="w-full bg-white/10 border border-white/30 rounded px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="postalCode"
                        className="block text-sm uppercase tracking-wide mb-2"
                      >
                        Postal/ZIP Code *
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, postalCode: e.target.value })
                        }
                        className="w-full bg-white/10 border border-white/30 rounded px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm uppercase tracking-wide mb-2"
                      >
                        Country *
                      </label>
                      <select
                        id="country"
                        value={shippingInfo.country}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, country: e.target.value })
                        }
                        className="w-full bg-white/10 border border-white/30 rounded px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                        required
                      >
                        <option value="Canada">Canada</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm uppercase tracking-wide mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={shippingInfo.phone}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, phone: e.target.value })
                      }
                      className="w-full bg-white/10 border border-white/30 rounded px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-semibold uppercase tracking-wide mb-6">
                  Contact Information
                </h2>
                  <div>
                    <label htmlFor="email" className="block text-sm uppercase tracking-wide mb-2">
                      E-mail *
                    </label>
                    {isAuthenticated && user ? (
                      <input
                        type="email"
                        id="email"
                        value={user.email || ''}
                        className="w-full bg-white/10 border border-white/30 rounded px-4 py-3 text-white/70 cursor-not-allowed"
                        disabled
                      />
                    ) : (
                      <input
                        type="email"
                        id="email"
                        value={shippingInfo.email || ''}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, email: e.target.value })
                        }
                        className="w-full bg-white/10 border border-white/30 rounded px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                        placeholder="your@email.com"
                        required
                      />
                    )}
                  </div>
              </div>

              {/* Payment Information */}
              <div>
                <h2 className="text-2xl font-semibold uppercase tracking-wide mb-6">
                  Payment Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="cardholderName"
                      className="block text-sm uppercase tracking-wide mb-2"
                    >
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      id="cardholderName"
                      value={paymentInfo.cardholderName}
                      onChange={(e) =>
                        setPaymentInfo({ ...paymentInfo, cardholderName: e.target.value })
                      }
                      className="w-full bg-white/10 border border-white/30 rounded px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="cardNumber"
                      className="block text-sm uppercase tracking-wide mb-2"
                    >
                      Card Number *
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value)
                        setPaymentInfo({ ...paymentInfo, cardNumber: formatted })
                      }}
                      className="w-full bg-white/10 border border-white/30 rounded px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="expiryDate"
                        className="block text-sm uppercase tracking-wide mb-2"
                      >
                        Expiry Date (MM/YY) *
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => {
                          const formatted = formatExpiryDate(e.target.value)
                          setPaymentInfo({ ...paymentInfo, expiryDate: formatted })
                        }}
                        className="w-full bg-white/10 border border-white/30 rounded px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="cvc" className="block text-sm uppercase tracking-wide mb-2">
                        CVC/CVV *
                      </label>
                      <input
                        type="text"
                        id="cvc"
                        value={paymentInfo.cvc}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, '').slice(0, 4)
                          setPaymentInfo({ ...paymentInfo, cvc: v })
                        }}
                        className="w-full bg-white/10 border border-white/30 rounded px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                        placeholder="123"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div>
                <h2 className="text-2xl font-semibold uppercase tracking-wide mb-6">
                  Billing Address
                </h2>

                <div className="mb-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={billingInfo.sameAsShipping}
                      onChange={(e) =>
                        setBillingInfo({ ...billingInfo, sameAsShipping: e.target.checked })
                      }
                      className="w-4 h-4 rounded border-white/30 bg-white/10 text-soft-pink focus:ring-soft-pink focus:ring-offset-0"
                    />
                    <span className="text-sm text-white/70">Same as shipping address</span>
                  </label>
                </div>

                {!billingInfo.sameAsShipping && (
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="billingAddressLine1"
                        className="block text-sm uppercase tracking-wide mb-2"
                      >
                        Address Line 1 *
                      </label>
                      <input
                        type="text"
                        id="billingAddressLine1"
                        value={billingInfo.addressLine1}
                        onChange={(e) =>
                          setBillingInfo({ ...billingInfo, addressLine1: e.target.value })
                        }
                        className="w-full bg-white/10 border border-white/30 rounded px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                        required={!billingInfo.sameAsShipping}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="billingAddressLine2"
                        className="block text-sm uppercase tracking-wide mb-2"
                      >
                        Address Line 2 (Optional)
                      </label>
                      <input
                        type="text"
                        id="billingAddressLine2"
                        value={billingInfo.addressLine2}
                        onChange={(e) =>
                          setBillingInfo({ ...billingInfo, addressLine2: e.target.value })
                        }
                        className="w-full bg-white/10 border border-white/30 rounded px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="billingCity"
                          className="block text-sm uppercase tracking-wide mb-2"
                        >
                          City *
                        </label>
                        <input
                          type="text"
                          id="billingCity"
                          value={billingInfo.city}
                          onChange={(e) =>
                            setBillingInfo({ ...billingInfo, city: e.target.value })
                          }
                          className="w-full bg-white/10 border border-white/30 rounded px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                          required={!billingInfo.sameAsShipping}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="billingProvince"
                          className="block text-sm uppercase tracking-wide mb-2"
                        >
                          Province/State *
                        </label>
                        <input
                          type="text"
                          id="billingProvince"
                          value={billingInfo.province}
                          onChange={(e) =>
                            setBillingInfo({ ...billingInfo, province: e.target.value })
                          }
                          className="w-full bg-white/10 border border-white/30 rounded px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                          required={!billingInfo.sameAsShipping}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="billingPostalCode"
                          className="block text-sm uppercase tracking-wide mb-2"
                        >
                          Postal/ZIP Code *
                        </label>
                        <input
                          type="text"
                          id="billingPostalCode"
                          value={billingInfo.postalCode}
                          onChange={(e) =>
                            setBillingInfo({ ...billingInfo, postalCode: e.target.value })
                          }
                          className="w-full bg-white/10 border border-white/30 rounded px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                          required={!billingInfo.sameAsShipping}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="billingCountry"
                          className="block text-sm uppercase tracking-wide mb-2"
                        >
                          Country *
                        </label>
                        <select
                          id="billingCountry"
                          value={billingInfo.country}
                          onChange={(e) =>
                            setBillingInfo({ ...billingInfo, country: e.target.value })
                          }
                          className="w-full bg-white/10 border border-white/30 rounded px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                          required={!billingInfo.sameAsShipping}
                        >
                          <option value="Canada">Canada</option>
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 sticky top-32">
                <h2 className="text-xl font-semibold uppercase tracking-wide mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {cart.map((item) => {
                    const price = parseFloat(item.price.replace('$', ''))
                    const itemTotal = price * (item.quantity || 1)
                    return (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-white/70">
                          {item.name} x{item.quantity || 1}
                        </span>
                        <span>${itemTotal.toFixed(2)}</span>
                      </div>
                    )
                  })}
                  <div className="flex justify-between text-sm pt-4 border-t border-white/10">
                    <span className="text-white/70">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-4 border-t border-white/10">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-white text-black px-8 py-3 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                >
                  {isProcessing ? 'PROCESSING...' : 'COMPLETE PAYMENT'}
                </button>

                <Link
                  href="/cart"
                  className="block text-center text-sm text-white/70 hover:text-white transition-colors underline"
                >
                  Return to Cart
                </Link>

                <p className="mt-4 text-xs text-white/50 text-center">
                  Your payment information is secure and encrypted
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
