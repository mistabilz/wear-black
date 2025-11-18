'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cart, wishlist } = useCart()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-4">
        {/* Mobile Layout */}
        <div className="flex items-center justify-between lg:hidden">
          {/* Hamburger Menu */}
          <button
            onClick={toggleMenu}
            className="text-white hover:text-soft-pink transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
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
          <Link href="#home" className="text-white font-bold text-xl uppercase tracking-wider">
            BLACK
          </Link>

          {/* Icons */}
          <div className="flex items-center gap-3">
            <button
              className="relative w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:border-white hover:scale-110 transition-all"
              aria-label="Wishlist"
            >
              <svg
                className="w-4 h-4 text-white"
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
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-soft-pink rounded-full border-2 border-black" />
              )}
            </button>
            <button
              className="relative w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:border-white hover:scale-110 transition-all"
              aria-label="Shopping cart"
            >
              <svg
                className="w-4 h-4 text-white"
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
            </button>
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
              Home
            </Link>
            <Link
              href="#new-drop"
              className="text-white hover:text-soft-pink transition-colors text-sm uppercase tracking-wide"
            >
              New Drop
            </Link>
            <Link
              href="#about"
              className="text-white hover:text-soft-pink transition-colors text-sm uppercase tracking-wide"
            >
              About
            </Link>
            <Link
              href="#shop"
              className="text-white hover:text-soft-pink transition-colors text-sm uppercase tracking-wide"
            >
              Shop
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3">
            <button
              className="relative w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:border-white hover:scale-110 transition-all"
              aria-label="Wishlist"
            >
              <svg
                className="w-4 h-4 text-white"
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
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-soft-pink rounded-full border-2 border-black" />
              )}
            </button>
            <button
              className="relative w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:border-white hover:scale-110 transition-all"
              aria-label="Shopping cart"
            >
              <svg
                className="w-4 h-4 text-white"
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
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-white/10">
            <div className="flex flex-col gap-4 pt-4">
              <Link
                href="#home"
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-soft-pink transition-colors text-sm uppercase tracking-wide"
              >
                Home
              </Link>
              <Link
                href="#new-drop"
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-soft-pink transition-colors text-sm uppercase tracking-wide"
              >
                New Drop
              </Link>
              <Link
                href="#about"
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-soft-pink transition-colors text-sm uppercase tracking-wide"
              >
                About
              </Link>
              <Link
                href="#shop"
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-soft-pink transition-colors text-sm uppercase tracking-wide"
              >
                Shop
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}


