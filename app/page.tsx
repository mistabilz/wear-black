import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import NewDrop from '@/components/NewDrop'
import Featured from '@/components/Featured'
import About from '@/components/About'
import Shop from '@/components/Shop'
import Lookbook from '@/components/Lookbook'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <NewDrop />
      <Featured />
      <About />
      <Shop />
      <Lookbook />
      <Footer />
    </main>
  )
}


