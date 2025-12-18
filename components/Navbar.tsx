'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { cart, wishlist } = useCart()
  const { t } = useLanguage()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        {/* Mobile Layout */}
        <div className="flex items-center justify-between lg:hidden">
          {/* Hamburger Menu */}
          <button
            onClick={toggleMenu}
            className="text-white hover:text-soft-pink transition-colors p-2 -ml-1 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Logo */}
          <Link href="#home" className="text-white font-bold text-base sm:text-lg md:text-xl uppercase tracking-wider flex-shrink-0">
            BLACK
          </Link>

          {/* Icons - Reduced gap on small screens */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <LanguageSwitcher />
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/30 flex items-center justify-center hover:border-white hover:scale-110 transition-all active:scale-95"
              aria-label="Search"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <Link
              href="/account/login"
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/30 flex items-center justify-center hover:border-white hover:scale-110 transition-all active:scale-95"
              aria-label="Account"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>
            <Link
              href="/wishlist"
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/30 flex items-center justify-center hover:border-white hover:scale-110 transition-all active:scale-95"
              aria-label="Wishlist"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                fill={wishlist.length > 0 ? 'currentColor' : 'none'}
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
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-soft-pink text-black text-xs font-bold rounded-full flex items-center justify-center px-1 border-2 border-black">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/30 flex items-center justify-center hover:border-white hover:scale-110 transition-all active:scale-95"
              aria-label="Shopping cart"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-soft-pink text-black text-xs font-bold rounded-full flex items-center justify-center px-1 border-2 border-black">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between">
          {/* Logo */}
          <Link href="#home" className="text-white font-bold text-xl uppercase tracking-wider hover:text-soft-pink transition-colors">
            BLACK
          </Link>

          {/* Menu Links */}
          <div className="flex items-center gap-8">
            <Link
              href="#home"
              className="text-white hover:text-soft-pink transition-colors text-sm uppercase tracking-wide"
            >
              {t('nav.home')}
            </Link>
            <Link
              href="#about"
              className="text-white hover:text-soft-pink transition-colors text-sm uppercase tracking-wide"
            >
              {t('nav.about')}
            </Link>
            <Link
              href="#shop"
              className="text-white hover:text-soft-pink transition-colors text-sm uppercase tracking-wide"
            >
              {t('nav.shop')}
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="relative w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:border-white hover:scale-110 transition-all"
              aria-label="Search"
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <Link
              href="/account/login"
              className="relative w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:border-white hover:scale-110 transition-all"
              aria-label="Account"
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>
            <Link
              href="/wishlist"
              className="relative w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:border-white hover:scale-110 transition-all"
              aria-label="Wishlist"
            >
              <svg
                className="w-5 h-5 text-white"
                fill={wishlist.length > 0 ? 'currentColor' : 'none'}
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
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-soft-pink text-black text-xs font-bold rounded-full flex items-center justify-center px-1 border-2 border-black">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              className="relative w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:border-white hover:scale-110 transition-all"
              aria-label="Shopping cart"
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-soft-pink text-black text-xs font-bold rounded-full flex items-center justify-center px-1 border-2 border-black">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-white/10">
            <div className="flex flex-col gap-4 pt-4">
              <Link
                href="#home"
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-soft-pink transition-colors text-sm uppercase tracking-wide py-2 min-h-[44px] flex items-center"
              >
                {t('nav.home')}
              </Link>
              <Link
                href="#about"
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-soft-pink transition-colors text-sm uppercase tracking-wide py-2 min-h-[44px] flex items-center"
              >
                {t('nav.about')}
              </Link>
              <Link
                href="#shop"
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-soft-pink transition-colors text-sm uppercase tracking-wide py-2 min-h-[44px] flex items-center"
              >
                {t('nav.shop')}
              </Link>
            </div>
          </div>
        )}

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute left-0 right-0 top-full mt-0 bg-black/95 backdrop-blur-md border-t border-white/10 shadow-2xl">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products or stories..."
                    autoFocus
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/10 border-2 border-white/30 rounded-full text-white text-sm sm:text-base placeholder-white/50 focus:outline-none focus:border-soft-pink focus:ring-2 focus:ring-soft-pink/50 transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-soft-pink text-black px-4 sm:px-6 py-2 rounded-full font-semibold text-xs sm:text-sm hover:scale-105 transition-all min-h-[44px]"
                  >
                    Search
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="mt-4 text-white/60 hover:text-white text-sm underline mx-auto block"
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}


