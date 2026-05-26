'use client'

import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'

const links = {
  Services: ['Web Development', 'SaaS Platforms', 'UI/UX Design', 'AI Automation', 'Branding', 'Mobile Apps'],
  Company:  ['About Us', 'Our Process', 'Case Studies', 'Careers', 'Blog'],
  Legal:    ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
}

const socials = [
  {
    name: 'X (Twitter)',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'GitHub',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
]

/* ─── Magnetic social icon ───────────────────────────────────── */
function SocialIcon({ social }: { social: typeof socials[0] }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useSpring(0, { stiffness: 300, damping: 22 })
  const y = useSpring(0, { stiffness: 300, damping: 22 })

  return (
    <motion.a
      ref={ref}
      href={social.href}
      aria-label={social.name}
      style={{ x, y }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * 0.45)
        y.set((e.clientY - r.top - r.height / 2) * 0.45)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.9 }}
      className="w-9 h-9 rounded-xl glass flex items-center justify-center text-white/30 hover:text-white hover:border-white/15 transition-colors duration-200"
    >
      {social.icon}
    </motion.a>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  const brandRef = useRef(null)
  const brandInView = useInView(brandRef, { once: true, margin: '-10%' })

  const linksRef = useRef(null)
  const linksInView = useInView(linksRef, { once: true, margin: '-10%' })

  return (
    <footer className="relative border-t border-white/05 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#020202] to-transparent pointer-events-none" />
      {/* subtle grid */}
      <div className="absolute inset-0 grid-pattern opacity-[0.06] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 py-16">
          {/* Brand */}
          <div ref={brandRef} className="md:col-span-2">
            <motion.a
              href="#"
              className="inline-flex items-center gap-2.5 mb-6"
              initial={{ opacity: 0, y: 16 }}
              animate={brandInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg,#4f8ef7,#8b5cf6)' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 4h4v4H3V4zm6 0h4v4H9V4zm-6 6h4v4H3v-4zm6 0h4v4H9v-4z" fill="white" fillOpacity="0.9"/>
                  </svg>
                </div>
              </div>
              <span className="font-display font-bold text-[17px] tracking-tight text-white">
                Stack<span className="text-blue-400">Labs</span>
              </span>
            </motion.a>

            <motion.p
              className="text-white/35 text-sm leading-relaxed max-w-xs mb-8"
              initial={{ opacity: 0, y: 12 }}
              animate={brandInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              We design and engineer premium digital experiences for ambitious companies.
              Obsessively crafted. Built to last.
            </motion.p>

            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={brandInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              {socials.map(s => <SocialIcon key={s.name} social={s} />)}
            </motion.div>
          </div>

          {/* Links columns */}
          <div ref={linksRef} className="md:col-span-3 grid grid-cols-3 gap-8">
            {Object.entries(links).map(([category, items], ci) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={linksInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: ci * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <h4 className="text-[10px] font-semibold text-white/25 tracking-[0.18em] uppercase mb-5">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {items.map((item, ii) => (
                    <motion.li key={item}
                      initial={{ opacity: 0, x: -8 }}
                      animate={linksInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: ci * 0.1 + ii * 0.04 + 0.15, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <a href="#"
                        className="group/link relative text-sm text-white/35 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5">
                        <span className="absolute -left-3 opacity-0 group-hover/link:opacity-100 transition-opacity text-[#4f8ef7] text-[10px]">▸</span>
                        {item}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <motion.div
          className="py-8 border-t border-white/05"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">Stay updated</h4>
              <p className="text-sm text-white/30">Get insights on product design and engineering.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 md:w-64 px-4 py-2.5 rounded-xl glass text-sm text-white placeholder:text-white/20
                  outline-none focus:ring-1 focus:ring-[#4f8ef7]/40 focus:border-white/15 transition-all duration-300"
              />
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-5 py-2.5 rounded-xl text-white text-sm font-medium whitespace-nowrap btn-shimmer"
                style={{
                  background: 'linear-gradient(135deg,#1a4fd8,#4f8ef7)',
                  boxShadow: '0 4px 20px rgba(79,142,247,0.3)',
                }}
              >
                Subscribe →
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6 border-t border-white/04">
          <p className="text-xs text-white/20 tracking-tight">
            © {year} StackLabs. All rights reserved. Built with obsession.
          </p>
          <div className="flex items-center gap-2 text-xs text-white/15">
            <div className="relative">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <motion.div
                className="absolute inset-0 rounded-full bg-emerald-400"
                animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              />
            </div>
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
