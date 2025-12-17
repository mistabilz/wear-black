import Image from 'next/image'

export default function UnisexTracksuitSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Featured Product - Clean Visual */}
          <div className="bg-white/5 rounded-2xl p-6 sm:p-8 lg:p-10 hover:bg-white/[0.07] transition-colors duration-300">
            <div className="relative w-full max-w-md mx-auto mb-6">
              <Image
                src="/images/Unisex Tracksuit.jpg"
                alt="Unisex Tracksuit - BLACK brand"
                width={600}
                height={750}
                className="object-contain w-full h-auto max-h-[500px] sm:max-h-[550px]"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold uppercase tracking-wide text-white">
              Unisex Tracksuit
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}

