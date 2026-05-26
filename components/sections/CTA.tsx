'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

export default function CTA() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const y1     = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2     = useTransform(scrollYProgress, [0, 1], [-70, 70])
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8])

  const innerRef = useRef(null)
  const inView   = useInView(innerRef, { once: true, margin: '-15%' })

  const lines = ['Ready to Build', 'Something', 'Exceptional?']

  return (
    <section id="contact" ref={ref} className="relative py-40 px-6 overflow-hidden">
      {/* Layered background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-pattern opacity-[0.22]" />

        <motion.div
          style={{ y: y1, scale: scale1, background: 'radial-gradient(circle, rgba(79,142,247,0.22) 0%, transparent 65%)' }}
          className="absolute w-[800px] h-[800px] rounded-full top-[-30%] left-[-20%]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={{ y: y2, background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 65%)' }}
          className="absolute w-[650px] h-[650px] rounded-full bottom-[-25%] right-[-15%]"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 30%, rgba(5,5,7,0.65) 100%)' }}
        />
        {/* Vertical light */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-px top-0 bottom-0"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(79,142,247,0.1) 40%, rgba(79,142,247,0.08) 60%, transparent 100%)' }}
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Horizontal light lines */}
        {[25, 75].map((pct) => (
          <motion.div key={pct}
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{ top: `${pct}%`, background: 'linear-gradient(90deg, transparent 0%, rgba(79,142,247,0.06) 40%, rgba(139,92,246,0.08) 60%, transparent 100%)' }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>

      <div ref={innerRef} className="relative max-w-5xl mx-auto text-center">
        {/* Status */}
        <motion.div
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/07 mb-14"
          style={{ background: 'rgba(255,255,255,0.03)' }}
          initial={{ opacity: 0, y: -12, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />
          <span className="text-[11px] text-white/40 tracking-wide">Accepting 3 new clients for Q3 2025</span>
        </motion.div>

        {/* Headline */}
        <div className="mb-10">
          {lines.map((line, i) => (
            <div key={line} className="overflow-hidden">
              <motion.div
                className={`font-display font-bold ${i === 1 ? 'text-gradient' : 'text-white'}`}
                style={{
                  fontSize: 'clamp(3.8rem,9.5vw,10rem)',
                  letterSpacing: '-0.045em',
                  lineHeight: 0.9,
                  paddingBottom: '0.08em',
                }}
                initial={{ y: '108%', opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 1.05, delay: 0.15 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Sub */}
        <motion.p
          className="text-white/32 text-[1.05rem] leading-relaxed max-w-md mx-auto mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          We take a limited number of projects each quarter to ensure every client
          receives our full attention and best work.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.a
            href="mailto:stacklabs99@gmail.com"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.96 }}
            className="relative group px-10 py-5 rounded-2xl text-[15px] font-semibold text-white btn-shimmer btn-glow overflow-hidden"
            style={{
              background: 'linear-gradient(135deg,#1a4fd8 0%,#4f8ef7 50%,#6366f1 100%)',
            }}
          >
            {/* Inner glow on hover */}
            <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.12) 0%, transparent 60%)' }} />
            Start a Conversation →
          </motion.a>

          <motion.a
            href="#projects"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="px-10 py-5 rounded-2xl text-[15px] font-medium text-white/42 hover:text-white/70 transition-colors duration-300"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            See Our Work
          </motion.a>
        </motion.div>

        {/* Guarantees */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-5 md:gap-10 text-[11px] text-white/20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
        >
          {['No long-term contracts', 'Fixed-scope pricing', 'Weekly progress updates', '30-day guarantee'].map((item, i) => (
            <motion.span key={item}
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1 + i * 0.08 }}
            >
              <span className="text-emerald-500/60">✓</span>
              {item}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
