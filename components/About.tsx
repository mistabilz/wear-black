import Link from 'next/link'

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-32 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-4xl lg:text-6xl font-display font-bold uppercase tracking-wide">
              Our Story
            </h2>
            <div className="space-y-4 text-off-white text-base lg:text-lg leading-relaxed">
              <p>
                BLACK is more than a name. It's a voice, a rhythm, a movement.<br />
                Rooted in Black culture, created for every shade, every shape, every soul bold enough to be seen.
              </p>
              <p>
                When you wear BLACK, you carry both history and the future,<br />
                the confidence, the creativity, and the unshakable pride of a culture that shaped the world.
              </p>
              <p>
                This isn't exclusion; it's inclusion with intention.<br />
                If you believe in our rise, you belong here.
              </p>
              <p>
                BLACK is unity.<br />
                BLACK is movement.<br />
                BLACK is purpose.
              </p>
              <p>
                Don't just wear it. Live it.<br />
                And even if you're not Black, when you stand with us, you're part of us.
              </p>
            </div>
            
            {/* Sign Up Button */}
            <div className="mt-8">
              <Link
                href="/join-the-movement"
                className="inline-block bg-soft-pink text-black px-8 py-3 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm lg:text-base text-center"
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

