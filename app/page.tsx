'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Footer from '@/components/Footer'
import SignupModal from '@/components/SignupModal'

export default function Home() {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Check if user has already seen the modal
    const hasSeenModal = localStorage.getItem('hasSeenSignupModal')
    
    if (!hasSeenModal) {
      // Show modal after 7 seconds or on scroll
      const timer = setTimeout(() => {
        setShowModal(true)
      }, 7000)

      const handleScroll = () => {
        if (window.scrollY > 300 && !hasSeenModal) {
          setShowModal(true)
          window.removeEventListener('scroll', handleScroll)
        }
      }

      window.addEventListener('scroll', handleScroll)

      return () => {
        clearTimeout(timer)
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Footer />
      <SignupModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </main>
  )
}


