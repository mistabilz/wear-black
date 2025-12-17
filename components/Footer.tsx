import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12">
          {/* Company Section */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wide mb-4 text-sm">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Privacy & Cookies
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Return Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wide mb-4 text-sm">
              Help
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  FAQ & Support
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Connected Section */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wide mb-4 text-sm">
              Get Connected
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Join the Movement
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Career Opportunities
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Live Shopping
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wide mb-4 text-sm">
              Follow Us
            </h3>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.instagram.com/wearblack.ca/?igsh=Mm96MWY0MWdhMmRm&utm_source=qr#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors text-sm"
              >
                Instagram
              </a>
              <Link
                href="#"
                className="text-white/70 hover:text-white transition-colors text-sm"
              >
                TikTok
              </Link>
              <Link
                href="#"
                className="text-white/70 hover:text-white transition-colors text-sm"
              >
                YouTube
              </Link>
              <Link
                href="#"
                className="text-white/70 hover:text-white transition-colors text-sm"
              >
                Pinterest
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 space-y-6">
          {/* Country & Currency */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-white/70 text-sm">
              Canada (CAD $)
            </div>
            <div className="text-white/70 text-sm">
              Email: <a href="mailto:info@wearblack.ca" className="hover:text-white transition-colors">info@wearblack.ca</a>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="bg-white/10 rounded-md px-4 py-2 text-xs text-white/70">
              Visa
            </div>
            <div className="bg-white/10 rounded-md px-4 py-2 text-xs text-white/70">
              Mastercard
            </div>
            <div className="bg-white/10 rounded-md px-4 py-2 text-xs text-white/70">
              Apple Pay
            </div>
            <div className="bg-white/10 rounded-md px-4 py-2 text-xs text-white/70">
              PayPal
            </div>
            <div className="bg-white/10 rounded-md px-4 py-2 text-xs text-white/70">
              Amex
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-white/50 text-xs pt-4">
            © {new Date().getFullYear()} BLACK. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}


