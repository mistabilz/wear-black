import Link from 'next/link'

export default function About() {
  return (
    <section id="about" className="w-full bg-black text-white">
      <div className="min-h-screen flex items-center justify-center py-20 sm:py-24 lg:py-32 xl:py-40">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto">
            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-8 sm:mb-10 lg:mb-12">
              OUR STORY
            </h2>
            
            {/* Story Text Block */}
            <div className="text-white/80 sm:text-white/85 text-base sm:text-lg lg:text-xl xl:text-[22px] leading-relaxed sm:leading-8 lg:leading-9 tracking-wide font-light antialiased space-y-4">
              <p>
                BLACK is more than a name. It's a voice, a rhythm, a movement. Rooted in Black culture, created for every shade, every shape, every soul bold enough to be seen.
              </p>
              <p>
                When you wear BLACK, you carry both history and the future, the confidence, the creativity, and the unshakable pride of a culture that shaped the world.
              </p>
              <p>
                This isn't exclusion; it's inclusion with intention. If you believe in our rise, you belong here.
              </p>
              <p className="text-white/95 font-light tracking-wide my-6 sm:my-8">
                BLACK is unity. BLACK is movement. BLACK is purpose.
              </p>
              <p>
                Don't just wear it. Live it. And even if you're not Black, when you stand with us, you're part of us. Wear it!
              </p>
            </div>
            
            {/* Sign Up Button - Smaller size */}
            <div className="pt-12 sm:pt-14 lg:pt-16 text-center">
              <Link
                href="/join-the-movement"
                className="inline-block bg-soft-pink text-black px-5 sm:px-6 py-2 sm:py-2.5 rounded-full font-black uppercase tracking-widest hover:opacity-90 transition-opacity duration-300 text-xl sm:text-2xl text-center min-h-[36px] flex items-center justify-center"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

