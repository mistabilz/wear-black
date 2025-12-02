'use client'

import { useState, FormEvent } from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, clearCart } = useCart()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    paymentMethod: 'credit-card',
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''))
      return total + price
    }, 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.13 // 13% tax placeholder
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.country.trim()) newErrors.country = 'Country is required'
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required'

    if (!formData.cardholderName.trim()) newErrors.cardholderName = 'Cardholder name is required'
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required'
    } else if (formData.cardNumber.replace(/\s/g, '').length < 13) {
      newErrors.cardNumber = 'Invalid card number'
    }
    if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required'
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required'
    } else if (formData.cvv.length < 3) {
      newErrors.cvv = 'Invalid CVV'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate payment processing
    setTimeout(() => {
      // Clear cart and redirect to confirmation
      clearCart()
      router.push('/order-confirmation')
    }, 2000)
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-32">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-display font-bold uppercase tracking-wide mb-4">
            Your cart is empty
          </h1>
          <p className="text-off-white mb-8">
            Add some items to your cart before checking out.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-32">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl lg:text-5xl font-display font-bold uppercase tracking-wide mb-12 text-center">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h2 className="text-xl font-display font-bold uppercase tracking-wide mb-6">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-off-white mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-soft-pink text-white"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                    {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-off-white mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-soft-pink text-white"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
              </div>

              {/* Shipping Details */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h2 className="text-xl font-display font-bold uppercase tracking-wide mb-6">
                  Shipping Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-off-white mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-soft-pink text-white"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                    {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-off-white mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-soft-pink text-white"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                      {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium text-off-white mb-2">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-soft-pink text-white"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      />
                      {errors.postalCode && <p className="text-red-400 text-xs mt-1">{errors.postalCode}</p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-off-white mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-soft-pink text-white"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    />
                    {errors.country && <p className="text-red-400 text-xs mt-1">{errors.country}</p>}
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h2 className="text-xl font-display font-bold uppercase tracking-wide mb-6">
                  Payment Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="paymentMethod" className="block text-sm font-medium text-off-white mb-2">
                      Payment Method
                    </label>
                    <select
                      id="paymentMethod"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-soft-pink text-white"
                      value={formData.paymentMethod}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    >
                      <option value="credit-card">Credit Card</option>
                      <option value="paypal">PayPal</option>
                      <option value="apple-pay">Apple Pay</option>
                      <option value="google-pay">Google Pay</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="cardholderName" className="block text-sm font-medium text-off-white mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      id="cardholderName"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-soft-pink text-white"
                      value={formData.cardholderName}
                      onChange={(e) => setFormData({ ...formData, cardholderName: e.target.value })}
                    />
                    {errors.cardholderName && <p className="text-red-400 text-xs mt-1">{errors.cardholderName}</p>}
                  </div>
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-off-white mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-soft-pink text-white"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    />
                    {errors.cardNumber && <p className="text-red-400 text-xs mt-1">{errors.cardNumber}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-off-white mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-soft-pink text-white"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                      />
                      {errors.expiryDate && <p className="text-red-400 text-xs mt-1">{errors.expiryDate}</p>}
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-off-white mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-soft-pink text-white"
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                      />
                      {errors.cvv && <p className="text-red-400 text-xs mt-1">{errors.cvv}</p>}
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black px-8 py-4 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing Payment...' : 'Complete Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-display font-bold uppercase tracking-wide mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {cart.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex gap-3">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start gap-1 mb-1">
                        <h4 className="text-sm font-semibold uppercase">{item.name}</h4>
                        {item.isPreOrder && (
                          <span className="inline-block bg-soft-pink text-black px-1.5 py-0.5 rounded text-[10px] font-bold uppercase whitespace-nowrap">
                            Pre-Order
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-off-white">{item.category}</p>
                      <p className="text-sm font-medium">
                        {item.price} {item.currency && <span className="text-xs">{item.currency}</span>}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-white/10 pt-4">
                <div className="flex justify-between text-off-white">
                  <span>Subtotal</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-off-white">
                  <span>Tax (13%)</span>
                  <span>${calculateTax().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-off-white">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <div className="flex justify-between text-white font-semibold text-lg">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

