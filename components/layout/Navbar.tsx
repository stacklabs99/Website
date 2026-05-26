'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useSpring } from 'framer-motion'

const links = [
  { label: 'Serviços', href: '#services' },
  { label: 'Trabalho', href: '#projects' },
  { label: 'Processo', href: '#process'  },
  { label: 'Sobre',    href: '#stats'    },
]

function NavLink({ label, href, active }: { label: string; href: string; active: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useSpring(0, { stiffness: 350, damping: 28 })
  const y = useSpring(0, { stiffness: 350, damping: 28 })

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x, y }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * 0.35)
        y.set((e.clientY - r.top - r.height / 2) * 0.35)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className={`
        relative px-4 py-2 text-[13px] rounded-xl hover:bg-white/04
        transition-all duration-200 tracking-tight font-medium
        ${active ? 'text-white' : 'text-white/38 hover:text-white/80'}
      `}
    >
      {label}
      {active && (
        <motion.div
          layoutId="nav-active"
          className="absolute inset-0 rounded-xl bg-white/05 -z-10"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </motion.a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = links.map(l => l.href.slice(1))
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActive('#' + id); break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const ctaRef = useRef<HTMLAnchorElement>(null)
  const ctaX = useSpring(0, { stiffness: 300, damping: 24 })
  const ctaY = useSpring(0, { stiffness: 300, damping: 24 })

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-5 pt-5"
      >
        <div className={`
          relative flex items-center justify-between w-full max-w-6xl px-5 py-2.5 rounded-2xl
          transition-all duration-500
          ${scrolled ? 'border border-white/06 shadow-[0_20px_60px_rgba(0,0,0,0.5)]' : 'border border-transparent'}
        `} style={scrolled ? { background: 'rgba(5,5,7,0.84)', backdropFilter: 'blur(32px) saturate(1.5)' } : {}}>

          {/* Logo */}
          <motion.a href="#" className="flex items-center gap-2.5 group" whileHover={{ x: 2 }}>
            <div className="relative">
              <motion.div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#4f8ef7,#8b5cf6)' }}
                whileHover={{ rotate: 8, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="2" y="2" width="4" height="4" rx="0.5" fill="white" fillOpacity="0.9" />
                  <rect x="8" y="2" width="4" height="4" rx="0.5" fill="white" fillOpacity="0.9" />
                  <rect x="2" y="8" width="4" height="4" rx="0.5" fill="white" fillOpacity="0.9" />
                  <rect x="8" y="8" width="4" height="4" rx="0.5" fill="white" fillOpacity="0.6" />
                </svg>
              </motion.div>
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg,#4f8ef7,#8b5cf6)', filter: 'blur(8px)' }} />
            </div>
            <span className="font-display font-bold text-[16px] tracking-tight text-white">
              Stack<span className="text-[#4f8ef7]">Labs</span>
            </span>
          </motion.a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center">
            {links.map(link => (
              <NavLink key={link.label} label={link.label} href={link.href} active={active === link.href} />
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <motion.a
              ref={ctaRef}
              href="#contact"
              style={{
                x: ctaX, y: ctaY,
                background: 'linear-gradient(135deg,#1a4fd8,#4f8ef7)',
                boxShadow: '0 0 0 1px rgba(79,142,247,0.35),0 4px 20px rgba(79,142,247,0.25)',
              }}
              onMouseMove={(e) => {
                const r = ctaRef.current!.getBoundingClientRect()
                ctaX.set((e.clientX - r.left - r.width / 2) * 0.4)
                ctaY.set((e.clientY - r.top - r.height / 2) * 0.4)
              }}
              onMouseLeave={() => { ctaX.set(0); ctaY.set(0) }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-[13px] font-semibold text-white btn-shimmer"
            >
              Começar
              <span className="text-white/60">→</span>
            </motion.a>
          </div>

          {/* Mobile button */}
          <button onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/05 transition-all">
            <div className="w-5 h-3.5 flex flex-col justify-between">
              <motion.div animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }} className="h-px bg-current rounded-full" />
              <motion.div animate={{ opacity: open ? 0 : 1 }} className="h-px bg-current rounded-full" />
              <motion.div animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }} className="h-px bg-current rounded-full" />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center"
            style={{ background: 'rgba(5,5,7,0.97)', backdropFilter: 'blur(40px)' }}
            onClick={() => setOpen(false)}
          >
            {links.map((link, i) => (
              <motion.a key={link.label} href={link.href} onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-bold text-[2.8rem] text-white/60 hover:text-white transition-colors my-2"
                style={{ letterSpacing: '-0.03em' }}
              >{link.label}</motion.a>
            ))}
            <motion.a href="#contact" onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 px-8 py-4 rounded-2xl font-semibold text-white btn-shimmer"
              style={{ background: 'linear-gradient(135deg,#1a4fd8,#4f8ef7)' }}
            >Começar →</motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
