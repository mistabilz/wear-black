# BLACK - Luxury Streetwear Website

A modern, luxury streetwear e-commerce website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎨 Dark, luxury aesthetic with black backgrounds and soft pink accents
- 📱 Fully responsive design (mobile-first)
- 🛒 Shopping cart functionality with item count indicators
- ❤️ Wishlist functionality with visual indicators
- 🖼️ Image gallery and lookbook sections
- 🎯 Multiple sections: Hero, Featured Collections, About, Shop, Lookbook
- ⚡ Built with Next.js 14 App Router
- 🎨 Styled with Tailwind CSS

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Images:** Next.js Image component with Unsplash placeholders

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd wear-black
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── globals.css      # Global styles and Tailwind imports
│   ├── layout.tsx       # Root layout with CartProvider
│   └── page.tsx         # Main page component
├── components/
│   ├── Navbar.tsx       # Navigation bar with cart/wishlist
│   ├── Hero.tsx         # Hero section with CTA
│   ├── UnisexTracksuitSection.tsx  # Featured tracksuit section
│   ├── About.tsx        # Brand story section
│   ├── SignupModal.tsx  # Newsletter signup modal
│   └── Footer.tsx       # Footer with links
├── context/
│   └── CartContext.tsx  # Cart and wishlist state management
└── public/
    └── images/          # Image assets
```

## Features in Detail

### Cart & Wishlist
- Add products to cart from the shop section
- Add products to wishlist
- Visual indicators in navbar showing cart count and wishlist status
- State managed globally with React Context

### Responsive Design
- Mobile-first approach
- Hamburger menu for mobile navigation
- Desktop horizontal menu
- All sections fully responsive

## Customization

### Colors
Edit `tailwind.config.js` to customize colors:
- `off-white`: #F5F5F5
- `soft-pink`: #FFC0CB

### Images
Replace Unsplash placeholder images in components with your own images.

### Content
- Edit brand story in `components/About.tsx`
- Update products in `components/Shop.tsx`
- Modify hero tagline in `components/Hero.tsx`

## Build for Production

```bash
npm run build
npm start
```

## License

This project is private and proprietary.

