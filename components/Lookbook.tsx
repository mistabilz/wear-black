import Image from 'next/image'

export default function Lookbook() {
  const looks = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop&q=80',
      title: 'Urban Elegance',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&h=1000&fit=crop&q=80',
      title: 'Street Sophistication',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&q=80',
      title: 'Modern Classic',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1000&fit=crop&q=80',
      title: 'Bold Statements',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1000&fit=crop&q=80',
      title: 'Refined Edge',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&q=80',
      title: 'Cultural Fusion',
    },
  ]

  return (
    <section id="lookbook" className="py-12 sm:py-16 md:py-20 lg:py-32 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold uppercase tracking-wide mb-3 sm:mb-4 break-words">
            Lookbook
          </h2>
          <p className="text-off-white text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Style inspiration from the streets to the runway.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {looks.map((look) => (
            <div
              key={look.id}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
                <Image
                  src={look.image}
                  alt={look.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-semibold uppercase tracking-wide">
                    {look.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

