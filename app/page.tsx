'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import PreOrderSection from '@/components/PreOrderSection'
import About from '@/components/About'
import Footer from '@/components/Footer'
import SignupModal from '@/components/SignupModal'

export default function Home() {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Check if user has already seen the modal
    const hasSeenModal = localStorage.getItem('hasSeenSignupModal')
    
    if (!hasSeenModal) {
      // Show modal after 3 seconds or on scroll
      const timer = setTimeout(() => {
        setShowModal(true)
      }, 3000)

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
      <PreOrderSection />
      <About />
      <Footer />
      <SignupModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </main>
  )
}


