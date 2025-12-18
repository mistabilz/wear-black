'use client'

import Link from 'next/link'

export default function JoinTheMovement() {
  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold uppercase tracking-wide mb-4">
            Join The Movement
          </h1>
          <p className="text-off-white text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
            Sign up to be the first to know about new drops from BLACK and get 15% off your first order.
          </p>
        </div>

        {/* Google Form Embed */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 lg:p-8">
          <div className="relative w-full overflow-hidden rounded-lg">
            {/* Desktop/Tablet iframe */}
            <div className="hidden sm:block">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSdC1xmdFM5co6eNhNvoNvNExM0pSzQ70XY-FI7yQBFZn-Ddsg/viewform?embedded=true"
                width="100%"
                height="965"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="w-full"
                title="Join The Movement Form"
              >
                Loading…
              </iframe>
            </div>

            {/* Mobile iframe - shorter height for better mobile experience */}
            <div className="block sm:hidden">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSdC1xmdFM5co6eNhNvoNvNExM0pSzQ70XY-FI7yQBFZn-Ddsg/viewform?embedded=true"
                width="100%"
                height="800"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="w-full"
                title="Join The Movement Form"
              >
                Loading…
              </iframe>
            </div>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="mt-6 sm:mt-8">
          <Link
            href="/"
            className="block w-full sm:w-auto sm:max-w-md sm:mx-auto bg-[#F7B6C8] hover:bg-[#f5a3ba] text-black font-bold uppercase tracking-wide py-3 rounded-full text-center transition-all duration-300 hover:scale-105 hover:shadow-lg min-h-[44px] flex items-center justify-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
