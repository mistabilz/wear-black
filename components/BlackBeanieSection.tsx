'use client'

import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { products } from '@/data/products'
import { useState } from 'react'

// Price constant
export const BLACK_BEANIE_PRICE_CAD = 30

export default function BlackBeanieSection() {
  const { addToCart } = useCart()
  const [addedToCart, setAddedToCart] = useState<number | null>(null)

  // Get all BLACK BEANIE variants from products data
  const beanieVariants = products.filter(
    (p) => p.name === 'BLACK Beanie'
  )

  const handleAddToCart = (product: typeof products[0]) => {
    if (!product.color) {
      alert('Please select a color')
      return
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      color: product.color,
      quantity: 1,
      currency: product.currency || 'CAD',
    }
    
    addToCart(cartItem)
    
    // Show feedback
    setAddedToCart(product.id)
    setTimeout(() => setAddedToCart(null), 2000)
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-black text-white border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold uppercase tracking-wide mb-4">
            BLACK Beanie
          </h2>
          <p className="text-off-white text-base sm:text-lg max-w-2xl mx-auto">
            Limited run. Choose your shade and own your look.
          </p>
        </div>

        {/* Beanie Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {beanieVariants.map((product) => (
            <div
              key={product.id}
              className="bg-white/5 border-2 border-white/10 rounded-2xl overflow-hidden hover:border-soft-pink/50 transition-all duration-300 group"
            >
              {/* Product Image */}
              <div className="relative w-full flex justify-center items-center bg-black rounded-t-2xl p-6 min-h-[300px] sm:min-h-[350px]">
                <div className="relative w-full h-full max-h-[400px]">
                  <Image
                    src={product.image}
                    alt={`BLACK Beanie - ${product.color}`}
                    width={400}
                    height={400}
                    className="object-contain w-full h-auto max-h-[400px] group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 sm:p-6 space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide mb-2">
                    {product.name}
                  </h3>
                  <p className="text-off-white text-sm sm:text-base mb-3">
                    Color: <span className="text-white font-semibold">{product.color}</span>
                  </p>
                  <p className="text-soft-pink text-xl sm:text-2xl font-bold">
                    {product.price} {product.currency}
                  </p>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`w-full px-6 py-3.5 rounded-full font-bold uppercase tracking-wide transition-all duration-300 text-sm min-h-[52px] ${
                    addedToCart === product.id
                      ? 'bg-green-500 text-white'
                      : 'bg-soft-pink text-black hover:scale-105 hover:shadow-xl'
                  }`}
                  disabled={addedToCart === product.id}
                >
                  {addedToCart === product.id ? '✓ Added to Cart' : 'Add to Cart'}
                </button>

                {/* Shipping Info */}
                <p className="text-xs text-off-white/70 text-center italic">
                  Free shipping on orders over $100
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

