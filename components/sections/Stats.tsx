'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 120, suffix: '+', label: 'Projects shipped', sub: 'Across 18 industries' },
  { value: 98,  suffix: '%', label: 'Client retention',  sub: 'Since 2020' },
  { value: 4,   suffix: '×', label: 'Average ROI',        sub: 'In the first year' },
  { value: 12,  suffix: 'M+', label: 'Users served',      sub: 'Across all platforms' },
]

function Stat({ value, suffix, label, sub, index }: typeof stats[0] & { index: number }) {
  const [n, setN] = useState(0)
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20%' })
  const fired  = useRef(false)

  useEffect(() => {
    if (!inView || fired.current) return
    fired.current = true
    const dur = 2400
    const start = performance.now()
    const ease = (t: number) => 1 - Math.pow(1 - t, 4)
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1)
      setN(Math.floor(ease(p) * value))
      if (p < 1) requestAnimationFrame(tick)
      else setN(value)
    }
    requestAnimationFrame(tick)
  }, [inView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, filter: 'blur(10px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 1, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      {/* Top accent line */}
      <div className="h-px mb-7 bg-white/05 overflow-hidden">
        <motion.div
          className="h-full"
          style={{ background: 'linear-gradient(to right, #4f8ef7, #8b5cf6, transparent)' }}
          initial={{ width: 0 }}
          animate={inView ? { width: '100%' } : {}}
          transition={{ duration: 1.6, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Value */}
      <div className="flex items-end gap-0.5 mb-2.5">
        <motion.span
          className="font-display font-bold text-white tabular"
          style={{ fontSize: 'clamp(3.5rem,6.5vw,5.8rem)', lineHeight: 1, letterSpacing: '-0.04em' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: index * 0.12 + 0.1, type: 'spring', stiffness: 200 }}
        >
          {n}
        </motion.span>
        <motion.span
          className="font-display font-bold text-gradient-blue mb-1"
          style={{ fontSize: 'clamp(2.5rem,4.5vw,4rem)', lineHeight: 1, letterSpacing: '-0.04em' }}
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.12 + 0.3 }}
        >
          {suffix}
        </motion.span>
      </div>

      <div className="font-semibold text-white text-[1rem] mb-1">{label}</div>
      <div className="text-[12px] text-white/25">{sub}</div>

      {/* Hover underline */}
      <div className="mt-4 h-px overflow-hidden">
        <motion.div
          className="h-full"
          style={{ background: 'linear-gradient(to right, #4f8ef7, transparent)' }}
          initial={{ scaleX: 0, originX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  )
}

export default function Stats() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-10%' })

  return (
    <section id="stats" className="relative py-36 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(79,142,247,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-20">
          <motion.div className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, x: -16 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="h-px w-10 bg-[#4f8ef7]/60" />
            <span className="text-[10px] text-white/28 tracking-[0.22em] uppercase">By the Numbers</span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(2.4rem,5vw,5rem)', letterSpacing: '-0.04em', lineHeight: 1.02 }}
              initial={{ y: '105%' }}
              animate={headerInView ? { y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              Results that speak
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              className="font-display font-bold text-white/18"
              style={{ fontSize: 'clamp(2.4rem,5vw,5rem)', letterSpacing: '-0.04em', lineHeight: 1.02 }}
              initial={{ y: '105%' }}
              animate={headerInView ? { y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              for themselves.
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {stats.map((s, i) => <Stat key={s.label} {...s} index={i} />)}
        </div>
      </div>
    </section>
  )
}
