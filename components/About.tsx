import Link from 'next/link'

export default function About() {
  return (
    <section id="about" className="py-12 sm:py-16 lg:py-24 xl:py-32 bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold uppercase tracking-wide">
              Our Story
            </h2>
            <div className="space-y-4 text-off-white text-base sm:text-lg lg:text-xl leading-relaxed">
              <p>
                BLACK is more than a name. It's a voice, a rhythm, a movement. Rooted in Black culture, created for every shade, every shape, every soul bold enough to be seen.
              </p>
              <p>
                When you wear BLACK, you carry both history and the future, the confidence, the creativity, and the unshakable pride of a culture that shaped the world.
              </p>
              <p>
                This isn't exclusion; it's inclusion with intention. If you believe in our rise, you belong here.
              </p>
              <p>
                BLACK is unity. BLACK is movement. BLACK is purpose.
              </p>
              <p>
                Don't just wear it. Live it. And even if you're not Black, when you stand with us, you're part of us.
              </p>
            </div>
            
            {/* Sign Up Button - Full width on mobile */}
            <div className="mt-6 sm:mt-8 pt-2">
              <Link
                href="/join-the-movement"
                className="block w-full sm:inline-block sm:w-auto bg-soft-pink text-black px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm lg:text-base text-center min-h-[48px] flex items-center justify-center"
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

