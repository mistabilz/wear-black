// Product data for BLACK ecommerce site
export interface Product {
  id: number
  name: string
  slug: string
  price: string
  image: string
  category: string
  description: string
  isPreOrder?: boolean
  currency?: string
}

export const products: Product[] = [
  // PRE-ORDER PRODUCTS
  {
    id: 100,
    name: 'BLACK PANTHER PARTY Hoodie',
    slug: 'black-panther-party-hoodie',
    price: '$200',
    image: '/images/BLACK PANTHER PARTY.jpg',
    category: 'Pre-Order',
    description: 'Limited edition hoodie inspired by the spirit of the Black Panther Party. Heavyweight, bold, and built for statement makers.',
    isPreOrder: true,
    currency: 'CAD',
  },
  {
    id: 101,
    name: 'BLACK Socks',
    slug: 'black-socks',
    price: '$20',
    image: '/images/BLACK SOCKS.jpg',
    category: 'Pre-Order',
    description: 'Everyday BLACK socks for comfort, style, and movement. Designed to stay soft and breathable all day.',
    isPreOrder: true,
    currency: 'CAD',
  },
  // REGULAR PRODUCTS
  {
    id: 1,
    name: 'Classic Tee',
    slug: 'classic-tee',
    price: '$89',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop&q=80',
    category: 'Tops',
    description: 'Essential BLACK tee in premium cotton. Built from culture, made for the world.',
  },
  {
    id: 2,
    name: 'Signature Hoodie',
    slug: 'signature-hoodie',
    price: '$149',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop&q=80',
    category: 'Outerwear',
    description: 'Premium heavyweight hoodie. The movement starts here.',
  },
  {
    id: 3,
    name: 'Essential Pants',
    slug: 'essential-pants',
    price: '$129',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop&q=80',
    category: 'Bottoms',
    description: 'Luxury streetwear pants with perfect fit and comfort.',
  },
  {
    id: 4,
    name: 'Premium Jacket',
    slug: 'premium-jacket',
    price: '$249',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop&q=80',
    category: 'Outerwear',
    description: 'Statement jacket for those who live the culture.',
  },
  {
    id: 5,
    name: 'Street Sneakers',
    slug: 'street-sneakers',
    price: '$179',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop&q=80',
    category: 'Footwear',
    description: 'Bold sneakers designed for the streets. Culture on your feet.',
  },
  {
    id: 6,
    name: 'Crew Neck',
    slug: 'crew-neck',
    price: '$99',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop&q=80',
    category: 'Tops',
    description: 'Classic crew neck sweatshirt. Confidence in every thread.',
  },
]

// Content searchable items (for non-product searches)
export interface ContentItem {
  id: string
  title: string
  excerpt: string
  url: string
}

export const contentItems: ContentItem[] = [
  {
    id: 'our-story',
    title: 'Our Story',
    excerpt: 'BLACK is more than a name. It\'s a voice, a rhythm, a movement. Rooted in Black culture, created for every shade, every shape, every soul bold enough to be seen.',
    url: '/#about',
  },
  {
    id: 'join-movement',
    title: 'Join The Movement',
    excerpt: 'Sign up to be the first to know about new drops and get 15% off your first order.',
    url: '/join-the-movement',
  },
]

