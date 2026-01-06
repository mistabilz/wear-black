'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Shop from '@/components/Shop'
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
        if (window.scrollY > 300) {
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

  // Smooth scroll handler for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement
      
      if (link) {
        const href = link.getAttribute('href')
        if (href && href.startsWith('#')) {
          e.preventDefault()
          const id = href.substring(1)
          const element = document.getElementById(id)
          
          if (element) {
            const offset = 72 // Navbar height
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - offset

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

  const handleCloseModal = () => {
    setShowModal(false)
    localStorage.setItem('hasSeenSignupModal', 'true')
  }

  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <Hero />
        <About />
        <Shop />
      </main>
      <Footer />
      <SignupModal isOpen={showModal} onClose={handleCloseModal} />
    </>
  )
}


