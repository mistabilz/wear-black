'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface CartItem {
  id: number
  name: string
  price: string
  image: string
  category: string
}

interface CartContextType {
  cart: CartItem[]
  wishlist: CartItem[]
  addToCart: (item: CartItem) => void
  addToWishlist: (item: CartItem) => void
  removeFromCart: (id: number) => void
  removeFromWishlist: (id: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<CartItem[]>([])

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item])
  }

  const addToWishlist = (item: CartItem) => {
    setWishlist((prev) => {
      // Check if item already exists in wishlist
      if (prev.some((i) => i.id === item.id)) {
        return prev
      }
      return [...prev, item]
    })
  }

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        addToWishlist,
        removeFromCart,
        removeFromWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

