'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface CartItem {
  id: number | string
  name: string
  price: string
  image: string
  category: string
  quantity?: number
  color?: string
  size?: string
  currency?: string
}

interface CartContextType {
  cart: CartItem[]
  wishlist: CartItem[]
  addToCart: (item: CartItem) => void
  addToWishlist: (item: CartItem) => void
  removeFromCart: (id: number | string) => void
  removeFromWishlist: (id: number | string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<CartItem[]>([])

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      // Check if item with same id and color already exists
      const existingIndex = prev.findIndex(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.color === item.color &&
          cartItem.size === item.size
      )

      if (existingIndex > -1) {
        // Item exists, increment quantity
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: (updated[existingIndex].quantity || 1) + (item.quantity || 1),
        }
        return updated
      }

      // New item, add with quantity
      return [...prev, { ...item, quantity: item.quantity || 1 }]
    })
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

  const removeFromCart = (id: number | string) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const removeFromWishlist = (id: number | string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCart([])
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
        clearCart,
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

