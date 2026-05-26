'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { RevealWords, RevealFade } from '@/components/ui/RevealText'
import Badge from '@/components/ui/Badge'

const steps = [
  {
    number: '01',
    label: 'Discovery',
    description: 'Deep-dive into your business, users, and goals. We research the competitive landscape and define what success looks like.',
    details: ['User research', 'Competitive analysis', 'Goal alignment', 'Technical audit'],
    color: 'blue',
    accent: '#4f8ef7',
  },
  {
    number: '02',
    label: 'Strategy',
    description: 'We map out the full product architecture, feature set, and roadmap. Every decision is made with purpose and precision.',
    details: ['Product roadmap', 'Tech stack selection', 'Sprint planning', 'KPI definition'],
    color: 'purple',
    accent: '#8b5cf6',
  },
  {
    number: '03',
    label: 'Design',
    description: 'From wireframes to high-fidelity prototypes — we craft interfaces that feel inevitable. Design systems built to scale.',
    details: ['UX wireframes', 'UI design system', 'Motion design', 'Prototype testing'],
    color: 'pink',
    accent: '#ec4899',
  },
  {
    number: '04',
    label: 'Development',
    description: 'Clean, performant code written by engineers who care about craft. Every line reviewed, every component tested.',
    details: ['Frontend build', 'Backend APIs', 'Testing & QA', 'Performance tuning'],
    color: 'emerald',
    accent: '#10b981',
  },
  {
    number: '05',
    label: 'Launch',
    description: 'Precision deployment with zero downtime. We handle CI/CD, monitoring, and stand by for the critical first 72 hours.',
    details: ['CI/CD pipeline', 'Monitoring setup', 'SEO & analytics', 'Post-launch support'],
    color: 'amber',
    accent: '#f59e0b',
  },
]

/* ─── Animated SVG line ─────────────────────────────────────── */
function TimelineLine() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <div ref={ref} className="absolute left-6 md:left-[88px] top-4 bottom-4 w-px pointer-events-none overflow-visible">
      {/* Base track */}
      <div className="absolute inset-0 bg-white/04" />
      {/* Animated fill */}
      <motion.div
        className="absolute top-0 left-0 right-0 origin-top"
        style={{ background: 'linear-gradient(to bottom, #4f8ef7, #8b5cf6, #ec4899, #10b981, #f59e0b)' }}
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 2.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}

function StepItem({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-18% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -28 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex gap-8 md:gap-12 pb-16 last:pb-0 group"
    >
      {/* Step marker */}
      <div className="relative flex-shrink-0 flex flex-col items-center w-12 md:w-[88px] pl-0 z-10">
        <div className="text-xs font-mono font-medium mb-3 hidden md:block" style={{ color: step.accent }}>
          {step.number}
        </div>

        {/* Dot with ping ring */}
        <div className="relative mt-1 md:mt-0">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.08 + 0.25, type: 'spring', stiffness: 260, damping: 18 }}
            className="relative w-3 h-3 rounded-full z-10"
            style={{
              background: step.accent,
              boxShadow: `0 0 20px ${step.accent}80`,
            }}
          >
            {/* Ping ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ borderColor: step.accent, border: `1px solid ${step.accent}` }}
              animate={isInView ? { scale: [1, 2.5], opacity: [0.6, 0] } : {}}
              transition={{ duration: 1.8, delay: index * 0.08 + 0.5, repeat: Infinity, ease: 'easeOut' }}
            />
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-16 last:pb-0 border-b border-white/04 group-last:border-0">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div className="flex-1">
            <div className="overflow-hidden mb-3">
              <motion.h3
                className="font-display font-bold text-2xl tracking-tight"
                style={{ color: step.accent }}
                initial={{ y: '105%' }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.75, delay: index * 0.08 + 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                {step.label}
              </motion.h3>
            </div>

            <motion.p
              className="text-white/45 text-[0.95rem] leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.08 + 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {step.description}
            </motion.p>
          </div>

          {/* Details pills */}
          <motion.div
            className="flex-shrink-0 grid grid-cols-2 gap-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.08 + 0.38 }}
          >
            {step.details.map((detail, di) => (
              <motion.div
                key={detail}
                initial={{ opacity: 0, scale: 0.85, y: 8 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.08 + 0.4 + di * 0.07, type: 'spring', stiffness: 350 }}
                className="flex items-center gap-2 text-xs px-2.5 py-1.5 rounded-lg border border-white/05"
                style={{ background: `${step.accent}08`, color: `${step.accent}99` }}
              >
                <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: step.accent, opacity: 0.6 }} />
                {detail}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Process() {
  const sectionRef = useRef(null)

  return (
    <section id="process" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-xl mb-20">
          <RevealFade delay={0.1}>
            <Badge variant="purple" className="mb-5">Our Process</Badge>
          </RevealFade>
          <RevealWords delay={0.2} className="font-display font-bold text-[clamp(2.2rem,5vw,4rem)] leading-[1.08] tracking-tight text-white mb-5">
            From idea to shipped product
          </RevealWords>
          <RevealFade delay={0.4}>
            <p className="text-white/40 text-[1.05rem] leading-relaxed">
              A proven methodology that eliminates uncertainty and delivers results consistently.
            </p>
          </RevealFade>
        </div>

        {/* Timeline */}
        <div className="relative">
          <TimelineLine />
          <div className="space-y-0">
            {steps.map((step, i) => (
              <StepItem key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
