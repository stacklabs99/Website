'use client'

import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'

const services = [
  {
    num: '01',
    title: 'Web Development',
    desc: 'Pixel-perfect applications built for performance, scalability, and impact. We engineer web products that users love and businesses scale on.',
    tags: ['Next.js', 'React', 'TypeScript', 'Edge'],
    accent: '#4f8ef7',
  },
  {
    num: '02',
    title: 'SaaS Platforms',
    desc: 'End-to-end SaaS architecture with auth, billing, dashboards, and multi-tenancy. From zero to enterprise-ready.',
    tags: ['Architecture', 'Stripe', 'Auth', 'Kubernetes'],
    accent: '#8b5cf6',
  },
  {
    num: '03',
    title: 'UI/UX Design',
    desc: 'Design systems built with obsessive intent. Every pixel, every transition, every micro-interaction crafted to feel inevitable.',
    tags: ['Figma', 'Design System', 'Motion', 'Research'],
    accent: '#ec4899',
  },
  {
    num: '04',
    title: 'AI Automation',
    desc: 'Intelligent workflows and AI-powered features on production-grade infrastructure. RAG pipelines, agents, custom fine-tuning.',
    tags: ['LLMs', 'RAG', 'Agents', 'Vector DBs'],
    accent: '#10b981',
  },
  {
    num: '05',
    title: 'Brand Identity',
    desc: 'Strategic branding that makes you the obvious choice in a crowded market — from naming to complete visual system.',
    tags: ['Strategy', 'Identity', 'Visual System', 'Voice'],
    accent: '#f59e0b',
  },
  {
    num: '06',
    title: 'Mobile Apps',
    desc: 'Native-feel mobile experiences for iOS and Android. High-performance React Native with real-time capabilities.',
    tags: ['React Native', 'iOS', 'Android', 'Expo'],
    accent: '#06b6d4',
  },
]

function ServiceRow({ s, index }: { s: typeof services[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12%' })

  /* 3-D tilt */
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [3, -3]),  { stiffness: 300, damping: 30 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]),  { stiffness: 300, damping: 30 })

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onMouseLeave = () => { mx.set(0); my.set(0) }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
      style={{ perspective: 1000 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Hover glow bg */}
      <motion.div
        className="absolute inset-0 -mx-4 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse 60% 80% at 30% 50%, ${s.accent}08, transparent 70%)` }}
      />

      {/* Divider */}
      <div className="relative h-px mb-8 overflow-hidden bg-white/05">
        <motion.div
          className="absolute inset-y-0 left-0 h-full"
          style={{ background: `linear-gradient(to right, ${s.accent}, transparent)` }}
          initial={{ width: 0 }}
          animate={inView ? { width: '100%' } : {}}
          transition={{ duration: 1.3, delay: index * 0.06 + 0.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="grid grid-cols-[48px_1fr] md:grid-cols-[48px_280px_1fr_auto] gap-6 md:gap-8 items-start pb-12"
      >
        {/* Number */}
        <motion.span
          className="font-mono text-[11px] font-bold tracking-[0.14em] pt-1 transition-all duration-300"
          style={{ color: s.accent }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.06 + 0.22, type: 'spring', stiffness: 300 }}
        >
          {s.num}
        </motion.span>

        {/* Title */}
        <div className="overflow-hidden">
          <motion.h3
            className="font-display font-bold text-[1.55rem] text-white tracking-tight leading-tight group-hover:text-white transition-colors duration-200"
            initial={{ y: '105%' }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.85, delay: index * 0.06 + 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {s.title}
          </motion.h3>
        </div>

        {/* Description */}
        <motion.p
          className="text-white/35 text-[0.92rem] leading-relaxed hidden md:block group-hover:text-white/50 transition-colors duration-300"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: index * 0.06 + 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          {s.desc}
        </motion.p>

        {/* Tags */}
        <div className="hidden md:flex flex-wrap gap-1.5 justify-end">
          {s.tags.map((t, ti) => (
            <motion.span key={t}
              initial={{ opacity: 0, scale: 0.8, y: 6 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: index * 0.06 + 0.36 + ti * 0.06, type: 'spring', stiffness: 400 }}
              whileHover={{ scale: 1.08, y: -2 }}
              className="text-[10px] font-medium px-2.5 py-1 rounded-lg tracking-wide"
              style={{
                background: `${s.accent}12`,
                color: `${s.accent}cc`,
                border: `1px solid ${s.accent}28`,
              }}
            >
              {t}
            </motion.span>
          ))}
        </div>

        {/* Mobile desc */}
        <motion.div
          className="md:hidden col-span-2 col-start-2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.06 + 0.28 }}
        >
          <p className="text-white/35 text-sm leading-relaxed mb-3">{s.desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {s.tags.map(t => (
              <span key={t}
                className="text-[10px] font-medium px-2.5 py-1 rounded-lg"
                style={{ background: `${s.accent}12`, color: `${s.accent}cc`, border: `1px solid ${s.accent}28` }}
              >{t}</span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function Services() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-10%' })

  return (
    <section id="services" className="relative py-36 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 50%, rgba(79,142,247,0.04) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-24">
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, x: -16 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="h-px w-10 bg-[#4f8ef7]/60" />
            <span className="text-[10px] text-white/28 tracking-[0.22em] uppercase font-medium">What We Do</span>
          </motion.div>

          <div className="overflow-hidden mb-5">
            <motion.h2
              className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(2.5rem,5.5vw,5.5rem)', letterSpacing: '-0.04em', lineHeight: 1.02 }}
              initial={{ y: '105%' }}
              animate={headerInView ? { y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              Everything to build
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              className="font-display font-bold text-white/18"
              style={{ fontSize: 'clamp(2.5rem,5.5vw,5.5rem)', letterSpacing: '-0.04em', lineHeight: 1.02 }}
              initial={{ y: '105%' }}
              animate={headerInView ? { y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              at the highest level.
            </motion.h2>
          </div>
        </div>

        <div>
          {services.map((s, i) => <ServiceRow key={s.num} s={s} index={i} />)}
        </div>
      </div>
    </section>
  )
}
