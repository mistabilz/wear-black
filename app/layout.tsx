import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'

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
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}


