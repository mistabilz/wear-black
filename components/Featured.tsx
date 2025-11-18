import Image from 'next/image'
import Link from 'next/link'

export default function Featured() {
  const collections = [
    {
      id: 1,
      title: 'ESSENTIALS',
      description: 'Timeless pieces for everyday wear',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=1000&fit=crop&q=80',
      href: '#',
    },
    {
      id: 2,
      title: 'SIGNATURE',
      description: 'Iconic designs that define BLACK',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop&q=80',
      href: '#',
    },
    {
      id: 3,
      title: 'LIMITED',
      description: 'Exclusive drops, limited quantities',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop&q=80',
      href: '#',
    },
  ]

  return (
    <section className="py-20 lg:py-32 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-display font-bold uppercase tracking-wide mb-4">
            Featured Collections
          </h2>
          <p className="text-off-white text-lg max-w-2xl mx-auto">
            Discover our curated selections, each telling a unique story of culture and style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={collection.href}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="relative h-[500px] lg:h-[600px]">
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl lg:text-3xl font-display font-bold uppercase tracking-wide mb-2">
                    {collection.title}
                  </h3>
                  <p className="text-off-white text-sm lg:text-base">
                    {collection.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

