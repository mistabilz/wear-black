import Image from 'next/image'
import Link from 'next/link'

export default function NewDrop() {
  return (
    <section id="new-drop" className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop&q=80"
          alt="New Drop"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-20 lg:py-32 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <p className="text-soft-pink text-sm uppercase tracking-[0.3em] font-semibold">
            New Collection
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-white uppercase tracking-wide leading-tight">
            THE CULTURE DROP
          </h2>
          <p className="text-off-white text-lg lg:text-xl max-w-2xl mx-auto">
            Introducing our latest collection, where heritage meets innovation. Limited edition pieces that celebrate culture, community, and uncompromising style.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#shop"
              className="bg-white text-black px-8 py-3 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm lg:text-base"
            >
              Shop Now
            </Link>
            <Link
              href="#lookbook"
              className="border border-white/30 text-white px-8 py-3 rounded-full font-semibold uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-300 text-sm lg:text-base"
            >
              View Lookbook
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

