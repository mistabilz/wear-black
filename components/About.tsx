import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-32 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative h-[400px] lg:h-[600px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1200&fit=crop&q=80"
              alt="BLACK Brand Story"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-6xl font-display font-bold uppercase tracking-wide">
              Our Story
            </h2>
            <div className="space-y-4 text-off-white text-base lg:text-lg leading-relaxed">
              <p>
                Born from the streets, elevated by culture. BLACK emerged from a vision to create luxury streetwear that speaks to the soul of communities often overlooked by mainstream fashion.
              </p>
              <p>
                Founded in 2020, we set out to bridge the gap between high-end fashion and authentic street culture. Every piece in our collection is designed with intention, crafted with precision, and delivered with purpose.
              </p>
              <p>
                We believe fashion is more than clothing—it's a statement, a movement, a celebration of identity. BLACK is built for people of color, made for the world. We're not just selling clothes; we're curating a lifestyle that honors heritage while embracing the future.
              </p>
              <p>
                Our commitment extends beyond the threads. We partner with artisans, support local communities, and champion sustainable practices. When you wear BLACK, you're wearing a piece of a movement that values authenticity, quality, and cultural pride.
              </p>
            </div>
            <Link
              href="#shop"
              className="inline-block border border-white/30 px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-wide text-sm font-semibold"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

