'use client'

import dynamic from 'next/dynamic'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import TrustedBy from '@/components/sections/TrustedBy'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'
import Projects from '@/components/sections/Projects'
import Manifesto from '@/components/sections/Manifesto'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/sections/Footer'

const CustomCursor   = dynamic(() => import('@/components/layout/CustomCursor'),   { ssr: false })
const PageLoader     = dynamic(() => import('@/components/layout/PageLoader'),     { ssr: false })
const ScrollProgress = dynamic(() => import('@/components/layout/ScrollProgress'), { ssr: false })
const SmoothScroll   = dynamic(() => import('@/components/layout/SmoothScroll'),   { ssr: false })

export default function Home() {
  return (
    <>
      <PageLoader />
      <CustomCursor />
      <ScrollProgress />
      <SmoothScroll>
        <main className="relative overflow-hidden">
          <Navbar />
          <Hero />
          <TrustedBy />
          <Services />
          <Process />
          <Projects />
          <Manifesto />
          <CTA />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  )
}
