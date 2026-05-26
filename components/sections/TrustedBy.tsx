'use client'

import { motion } from 'framer-motion'

const brands = [
  'Veritas Capital', 'Nexum', 'Orbital Labs', 'Phantom AI',
  'Rift Systems', 'Meridian', 'Kova Tech', 'Solace VC',
  'Arclight', 'Vantage AI', 'Silo Ventures', 'Prism Labs',
]

export default function TrustedBy() {
  const doubled = [...brands, ...brands]

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Top/bottom rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/05" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/05" />

      {/* Label */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center mb-10"
      >
        <span className="text-[10px] text-white/20 tracking-[0.28em] uppercase font-medium">
          Trusted by teams building what's next
        </span>
      </motion.div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #050507, transparent)' }}
        />
        <div className="absolute right-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #050507, transparent)' }}
        />

        <div className="flex marquee-track">
          {doubled.map((name, i) => (
            <div key={i} className="flex items-center gap-10 flex-shrink-0 px-10 group">
              <span className="text-[13px] font-semibold tracking-[0.06em] text-white/18 hover:text-white/45 transition-colors duration-500 cursor-default whitespace-nowrap uppercase">
                {name}
              </span>
              <span className="text-white/08">·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
