import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'

export const metadata: Metadata = {
  title: 'BLACK - Luxury Streetwear',
  description: 'Luxury streetwear stitched with culture, confidence, and community.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}


