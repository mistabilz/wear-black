'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface CartItem {
  id: number
  name: string
  price: string
  image: string
  category: string
  quantity?: number
  size?: string
}

interface CartContextType {
  cart: CartItem[]
  wishlist: CartItem[]
  addToCart: (item: CartItem) => void
  addToWishlist: (item: CartItem) => void
  removeFromCart: (id: number) => void
  removeFromWishlist: (id: number) => void
  updateCartQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  moveToCart: (item: CartItem) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<CartItem[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('black_cart')
    const storedWishlist = localStorage.getItem('black_wishlist')
    
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart))
      } catch (e) {
        localStorage.removeItem('black_cart')
      }
    }
    
    if (storedWishlist) {
      try {
        setWishlist(JSON.parse(storedWishlist))
      } catch (e) {
        localStorage.removeItem('black_wishlist')
      }
    }
  }, [])

  // Save to localStorage whenever cart or wishlist changes
  useEffect(() => {
    localStorage.setItem('black_cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('black_wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingItem = prev.find((i) => i.id === item.id)
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: (i.quantity || 1) + 1 }
            : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
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

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id))
  }

  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem('black_cart')
  }

  const moveToCart = (item: CartItem) => {
    addToCart(item)
    removeFromWishlist(item.id)
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
        updateCartQuantity,
        clearCart,
        moveToCart,
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

