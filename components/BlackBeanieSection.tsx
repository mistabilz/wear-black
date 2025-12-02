'use client'

import Image from 'next/image'
import { useCart } from '@/context/CartContext'

// Price constant - to be updated later
const BLACK_BEANIE_PRICE_CAD = 0

interface BeanieVariant {
  id: number
  color: string
  image: string
  slug: string
}

const beanieVariants: BeanieVariant[] = [
  {
    id: 300,
    color: 'Pink',
    image: '/images/Pink.PNG',
    slug: 'black-beanie-pink',
  },
  {
    id: 301,
    color: 'Grey',
    image: '/images/Grey.PNG',
    slug: 'black-beanie-grey',
  },
  {
    id: 302,
    color: 'Aqua Blue',
    image: '/images/Aqua Blue.JPEG',
    slug: 'black-beanie-aqua',
  },
]

export default function BlackBeanieSection() {
  const { addToCart } = useCart()

  const handlePreOrder = (variant: BeanieVariant) => {
    const product = {
      id: variant.id,
      name: `BLACK Beanie - ${variant.color}`,
      price: `$${BLACK_BEANIE_PRICE_CAD}`,
      image: variant.image,
      category: 'Pre-Order',
      isPreOrder: true,
      currency: 'CAD',
    }
    addToCart(product)
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-black text-white border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold uppercase tracking-wide mb-4">
            BLACK Beanie – Pre-Order
          </h2>
          <p className="text-off-white text-base sm:text-lg max-w-2xl mx-auto">
            Limited run. Choose your shade and secure your beanie before it drops.
          </p>
        </div>

        {/* Beanie Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {beanieVariants.map((variant) => (
            <div
              key={variant.id}
              className="bg-white/5 border-2 border-white/10 rounded-2xl overflow-hidden hover:border-soft-pink/50 transition-all duration-300 group"
            >
              {/* Product Image */}
              <div className="relative w-full flex justify-center items-center bg-black rounded-t-2xl p-6 min-h-[300px] sm:min-h-[350px]">
                <div className="relative w-full h-full max-h-[400px]">
                  <Image
                    src={variant.image}
                    alt={`BLACK Beanie - ${variant.color}`}
                    width={400}
                    height={400}
                    className="object-contain w-full h-auto max-h-[400px] group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                {/* Pre-Order Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-soft-pink text-black px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                    Pre-Order
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 sm:p-6 space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide mb-2">
                    BLACK Beanie
                  </h3>
                  <p className="text-off-white text-sm sm:text-base mb-3">
                    Color: <span className="text-white font-semibold">{variant.color}</span>
                  </p>
                  <p className="text-soft-pink text-xl sm:text-2xl font-bold">
                    ${BLACK_BEANIE_PRICE_CAD} CAD
                  </p>
                </div>

                {/* Pre-Order Button */}
                <button
                  onClick={() => handlePreOrder(variant)}
                  className="w-full bg-soft-pink text-black px-6 py-3.5 rounded-full font-bold uppercase tracking-wide hover:scale-105 hover:shadow-xl transition-all duration-300 text-sm min-h-[52px]"
                >
                  Pre-Order Now
                </button>

                {/* Shipping Info */}
                <p className="text-xs text-off-white/70 text-center italic">
                  Ships soon - exact date confirmed by email
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

