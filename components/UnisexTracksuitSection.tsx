'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

// Price constant - to be updated later
const UNISEX_TRACKSUIT_PRICE = 0

export default function UnisexTracksuitSection() {
  const { addToCart } = useCart()
  const [showModal, setShowModal] = useState(false)
  const [selectedColor, setSelectedColor] = useState<'Black' | 'Orange'>('Black')
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L'>('M')

  const handleShopLook = () => {
    setShowModal(true)
  }

  const handleAddToCart = () => {
    const product = {
      id: 200,
      name: `Unisex Tracksuit - ${selectedColor} - ${selectedSize}`,
      price: `$${UNISEX_TRACKSUIT_PRICE}`,
      image: '/images/Unisex Tracksuit.jpg',
      category: 'Tracksuits',
      currency: 'CAD',
    }
    addToCart(product)
    setShowModal(false)
    // Reset to defaults
    setSelectedColor('Black')
    setSelectedSize('M')
  }

  return (
    <>
      <section className="py-16 sm:py-20 lg:py-24 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Desktop: Side-by-side | Mobile: Stacked */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left: Image */}
              <div className="w-full flex justify-center items-center bg-white/5 rounded-2xl p-6 sm:p-8">
                <div className="relative w-full max-w-lg">
                  <Image
                    src="/images/Unisex Tracksuit.jpg"
                    alt="Unisex Tracksuit - BLACK brand"
                    width={800}
                    height={1000}
                    className="object-contain w-full h-auto max-h-[600px]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Right: Content */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold uppercase tracking-wide mb-4">
                    Unisex Tracksuit
                  </h2>
                  <p className="text-off-white text-base sm:text-lg lg:text-xl mb-6">
                    Built for movement, made for every body.
                  </p>
                  <p className="text-soft-pink text-2xl sm:text-3xl font-bold">
                    ${UNISEX_TRACKSUIT_PRICE} CAD
                  </p>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <p className="text-off-white text-sm sm:text-base leading-relaxed mb-6">
                    Premium quality tracksuit designed for comfort and style. Available in Black and Orange. 
                    Perfect for everyday wear, workouts, or making a statement on the streets.
                  </p>
                </div>

                {/* Shop Look Button */}
                <button
                  onClick={handleShopLook}
                  className="w-full sm:w-auto bg-soft-pink text-black px-8 sm:px-12 py-4 rounded-full font-bold uppercase tracking-wide hover:scale-105 hover:shadow-xl transition-all duration-300 text-sm sm:text-base min-h-[56px]"
                >
                  Shop Look
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Options Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false)
          }}
        >
          <div className="relative w-full max-w-lg bg-black border-2 border-soft-pink rounded-2xl shadow-2xl overflow-hidden">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
              aria-label="Close"
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

            <div className="p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-wide mb-6 text-center">
                Customize Your Look
              </h3>

              {/* Color Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
                  Select Color
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedColor('Black')}
                    className={`flex-1 px-6 py-3 rounded-full font-semibold uppercase tracking-wide transition-all ${
                      selectedColor === 'Black'
                        ? 'bg-soft-pink text-black'
                        : 'bg-white/10 text-white border border-white/30 hover:border-white'
                    }`}
                  >
                    Black
                  </button>
                  <button
                    onClick={() => setSelectedColor('Orange')}
                    className={`flex-1 px-6 py-3 rounded-full font-semibold uppercase tracking-wide transition-all ${
                      selectedColor === 'Orange'
                        ? 'bg-soft-pink text-black'
                        : 'bg-white/10 text-white border border-white/30 hover:border-white'
                    }`}
                  >
                    Orange
                  </button>
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
                  Select Size
                </label>
                <div className="flex gap-3">
                  {(['S', 'M', 'L'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`flex-1 px-6 py-3 rounded-full font-semibold uppercase tracking-wide transition-all ${
                        selectedSize === size
                          ? 'bg-soft-pink text-black'
                          : 'bg-white/10 text-white border border-white/30 hover:border-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Options Summary */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
                <p className="text-sm text-off-white mb-2">Your Selection:</p>
                <p className="text-white font-semibold">
                  Unisex Tracksuit - {selectedColor} - Size {selectedSize}
                </p>
                <p className="text-soft-pink text-lg font-bold mt-2">
                  ${UNISEX_TRACKSUIT_PRICE} CAD
                </p>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-soft-pink text-black px-8 py-4 rounded-full font-bold uppercase tracking-wide hover:scale-105 hover:shadow-xl transition-all duration-300 text-sm sm:text-base min-h-[56px]"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

