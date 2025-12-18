import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import ScrollToTop from '@/components/ScrollToTop'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wearblack.ca'

export const metadata: Metadata = {
  title: {
    default: 'BLACK - Streetwear',
    template: '%s | BLACK',
  },
  description: 'WEAR IT BLACK. WEAR IT BOLD. Built from Black culture. Made for the world.',
  keywords: ['streetwear', 'black culture', 'fashion', 'clothing', 'apparel', 'BLACK brand', 'wearblack'],
  authors: [{ name: 'BLACK' }],
  creator: 'BLACK',
  publisher: 'BLACK',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: siteUrl,
    siteName: 'BLACK',
    title: 'BLACK - Streetwear',
    description: 'WEAR IT BLACK. WEAR IT BOLD. Built from Black culture. Made for the world.',
    images: [
      {
        url: '/images/heroimagedesktop169.JPG',
        width: 1200,
        height: 630,
        alt: 'BLACK - Streetwear',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BLACK - Streetwear',
    description: 'WEAR IT BLACK. WEAR IT BOLD. Built from Black culture. Made for the world.',
    images: ['/images/heroimagedesktop169.JPG'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
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
          <ScrollToTop />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}


