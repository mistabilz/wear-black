'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { products } from '@/data/products'

export default function PreOrderSection() {
  const { addToCart } = useCart()
  
  // Get pre-order products
  const preOrderProducts = products.filter(p => p.isPreOrder)
  
  // Quantity state for each product
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({
    100: 1, // Hoodie
    101: 1, // Socks
  })

  const handleQuantityChange = (productId: number, value: number) => {
    if (value >= 1) {
      setQuantities(prev => ({ ...prev, [productId]: value }))
    }
  }

  const handlePreOrder = (product: any) => {
    const quantity = quantities[product.id] || 1
    
    // Add to cart multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    
    // Reset quantity to 1 after adding
    setQuantities(prev => ({ ...prev, [product.id]: 1 }))
  }

  if (preOrderProducts.length === 0) return null

  const hoodie = preOrderProducts.find(p => p.id === 100)
  const socks = preOrderProducts.find(p => p.id === 101)

  return (
    <section id="pre-order" className="py-16 sm:py-20 lg:py-24 bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold uppercase tracking-wide mb-4">
            Pre-Order Drops
          </h2>
          <p className="text-off-white text-base sm:text-lg">
            Secure your piece before it sells out.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* BLACK PANTHER PARTY Hoodie Card */}
          {hoodie && (
            <div className="bg-white/5 border-2 border-white/10 rounded-2xl overflow-hidden hover:border-soft-pink/50 transition-all duration-300 group">
              {/* Product Image */}
              <div className="relative h-80 sm:h-96 overflow-hidden bg-black">
                <Image
                  src={hoodie.image}
                  alt="BLACK PANTHER PARTY hoodie"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Pre-Order Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-soft-pink text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide">
                    Pre-Order
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 sm:p-8 space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide mb-2">
                    {hoodie.name}
                  </h3>
                  <p className="text-soft-pink text-2xl sm:text-3xl font-bold mb-3">
                    ${hoodie.price.replace('$', '')} {hoodie.currency}
                  </p>
                  <p className="text-off-white text-sm sm:text-base leading-relaxed">
                    {hoodie.description}
                  </p>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 pt-2">
                  <label htmlFor="hoodie-qty" className="text-sm uppercase tracking-wide font-semibold">
                    Quantity:
                  </label>
                  <div className="flex items-center border border-white/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => handleQuantityChange(hoodie.id, quantities[hoodie.id] - 1)}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <input
                      id="hoodie-qty"
                      type="number"
                      min="1"
                      value={quantities[hoodie.id]}
                      onChange={(e) => handleQuantityChange(hoodie.id, parseInt(e.target.value) || 1)}
                      className="w-16 px-3 py-2 text-center bg-transparent border-l border-r border-white/30 focus:outline-none focus:bg-white/5"
                    />
                    <button
                      onClick={() => handleQuantityChange(hoodie.id, quantities[hoodie.id] + 1)}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Pre-Order Button */}
                <button
                  onClick={() => handlePreOrder(hoodie)}
                  className="w-full bg-soft-pink text-black px-6 py-4 rounded-full font-bold uppercase tracking-wide hover:scale-105 hover:shadow-xl transition-all duration-300 text-sm sm:text-base min-h-[56px]"
                >
                  Pre-Order Hoodie
                </button>

                {/* Shipping Info */}
                <p className="text-xs sm:text-sm text-off-white/70 text-center italic">
                  Estimated shipping date will be confirmed by email.
                </p>
              </div>
            </div>
          )}

          {/* BLACK SOCKS Card */}
          {socks && (
            <div className="bg-white/5 border-2 border-white/10 rounded-2xl overflow-hidden hover:border-soft-pink/50 transition-all duration-300 group">
              {/* Product Image */}
              <div className="relative h-80 sm:h-96 overflow-hidden bg-black">
                <Image
                  src={socks.image}
                  alt="BLACK socks"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Pre-Order Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-soft-pink text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide">
                    Pre-Order
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 sm:p-8 space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide mb-2">
                    {socks.name}
                  </h3>
                  <p className="text-soft-pink text-2xl sm:text-3xl font-bold mb-3">
                    ${socks.price.replace('$', '')} {socks.currency}
                  </p>
                  <p className="text-off-white text-sm sm:text-base leading-relaxed">
                    {socks.description}
                  </p>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 pt-2">
                  <label htmlFor="socks-qty" className="text-sm uppercase tracking-wide font-semibold">
                    Quantity:
                  </label>
                  <div className="flex items-center border border-white/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => handleQuantityChange(socks.id, quantities[socks.id] - 1)}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <input
                      id="socks-qty"
                      type="number"
                      min="1"
                      value={quantities[socks.id]}
                      onChange={(e) => handleQuantityChange(socks.id, parseInt(e.target.value) || 1)}
                      className="w-16 px-3 py-2 text-center bg-transparent border-l border-r border-white/30 focus:outline-none focus:bg-white/5"
                    />
                    <button
                      onClick={() => handleQuantityChange(socks.id, quantities[socks.id] + 1)}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Pre-Order Button */}
                <button
                  onClick={() => handlePreOrder(socks)}
                  className="w-full bg-soft-pink text-black px-6 py-4 rounded-full font-bold uppercase tracking-wide hover:scale-105 hover:shadow-xl transition-all duration-300 text-sm sm:text-base min-h-[56px]"
                >
                  Pre-Order Socks
                </button>

                {/* Shipping Info */}
                <p className="text-xs sm:text-sm text-off-white/70 text-center italic">
                  Estimated shipping date will be confirmed by email.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

