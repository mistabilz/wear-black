'use client'

import { useSearchParams } from 'next/navigation'
import { products, contentItems } from '@/data/products'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { Suspense } from 'react'

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const { addToCart, addToWishlist } = useCart()

  // Search products
  const searchProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  )

  // Search content
  const searchContent = contentItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.excerpt.toLowerCase().includes(query.toLowerCase())
  )

  const hasResults = searchProducts.length > 0 || searchContent.length > 0

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl">
        {/* Search Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold uppercase tracking-wide mb-4">
            Search Results
          </h1>
          <p className="text-off-white text-base sm:text-lg">
            {query ? (
              <>
                Showing results for: <span className="text-white font-semibold">"{query}"</span>
              </>
            ) : (
              'Enter a search term to find products and content.'
            )}
          </p>
        </div>

        {!query ? (
          // No query entered
          <div className="text-center py-16">
            <svg
              className="w-20 h-20 mx-auto mb-6 text-white/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p className="text-off-white text-lg mb-6">Start searching for products, stories, and more.</p>
            <Link
              href="/"
              className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm"
            >
              Back to Home
            </Link>
          </div>
        ) : !hasResults ? (
          // No results found
          <div className="text-center py-16">
            <svg
              className="w-20 h-20 mx-auto mb-6 text-white/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-2xl font-display font-bold uppercase tracking-wide mb-4">
              No Results Found
            </h2>
            <p className="text-off-white text-base mb-6">
              We couldn't find anything matching "<span className="text-white font-semibold">{query}</span>".
            </p>
            <p className="text-off-white/70 text-sm mb-8">
              Try searching for: hoodie, jacket, tee, pants, or sneakers
            </p>
            <Link
              href="/"
              className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          // Results found
          <div className="space-y-12">
            {/* Product Results */}
            {searchProducts.length > 0 && (
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide mb-6 border-b border-white/10 pb-3">
                  Products ({searchProducts.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {searchProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white/5 border border-white/10 rounded-lg overflow-hidden group hover:border-soft-pink/50 transition-all"
                    >
                      <div className="relative h-80">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-5 space-y-3">
                        <div>
                          <p className="text-off-white text-xs uppercase tracking-wide mb-1">
                            {product.category}
                          </p>
                          <h3 className="text-lg font-semibold uppercase tracking-wide mb-2">
                            {product.name}
                          </h3>
                          <p className="text-white font-medium text-lg mb-2">{product.price}</p>
                          <p className="text-off-white/80 text-sm line-clamp-2">{product.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => addToCart(product)}
                            className="flex-1 bg-soft-pink text-black px-4 py-2.5 rounded-full font-semibold text-sm uppercase tracking-wide hover:scale-105 transition-all"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => addToWishlist(product)}
                            className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center hover:border-soft-pink hover:scale-110 transition-all"
                            aria-label="Add to wishlist"
                          >
                            <svg
                              className="w-5 h-5 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Content Results */}
            {searchContent.length > 0 && (
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide mb-6 border-b border-white/10 pb-3">
                  Content ({searchContent.length})
                </h2>
                <div className="space-y-4">
                  {searchContent.map((item) => (
                    <Link
                      key={item.id}
                      href={item.url}
                      className="block bg-white/5 border border-white/10 rounded-lg p-6 hover:border-soft-pink/50 transition-all group"
                    >
                      <h3 className="text-lg font-semibold uppercase tracking-wide mb-2 group-hover:text-soft-pink transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-off-white text-base">{item.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back to Home */}
            <div className="text-center pt-8">
              <Link
                href="/"
                className="inline-block text-off-white hover:text-white text-sm underline"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-soft-pink border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-off-white">Searching...</p>
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  )
}

