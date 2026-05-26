'use client'

import { motion } from 'framer-motion'
import { RevealWords, RevealFade } from '@/components/ui/RevealText'
import Badge from '@/components/ui/Badge'

const testimonials = [
  {
    quote: "StackLabs didn't just build our platform — they fundamentally changed how we think about product. The quality is unlike anything I've seen from an agency.",
    author: 'Sarah Chen',
    role: 'CTO, Meridian Analytics',
    avatar: 'SC',
    color: '#3b82f6',
    stars: 5,
  },
  {
    quote: "From our first call to launch day, the attention to detail was extraordinary. Our conversion rate went up 40% in the first month. Worth every penny.",
    author: 'Marcus Webb',
    role: 'CEO, Phantom Commerce',
    avatar: 'MW',
    color: '#8b5cf6',
    stars: 5,
  },
  {
    quote: "They took our AI automation project and delivered something we couldn't have imagined. A tool that now saves us 200+ hours per week. Genuinely transformative.",
    author: 'Priya Patel',
    role: 'Head of Operations, Orbital AI',
    avatar: 'PP',
    color: '#10b981',
    stars: 5,
  },
  {
    quote: "I've worked with a dozen agencies. StackLabs is in a different category. They communicate like partners, build like craftspeople, and deliver like clockwork.",
    author: 'James Nakamura',
    role: 'Founder, Nexum',
    avatar: 'JN',
    color: '#ec4899',
    stars: 5,
  },
  {
    quote: "The design system they built for us is used by our team of 50 daily. It's become the foundation of our entire product — scalable, beautiful, and perfectly documented.",
    author: 'Emma Rodriguez',
    role: 'VP Product, Rift Systems',
    avatar: 'ER',
    color: '#f59e0b',
    stars: 5,
  },
  {
    quote: "Their AI automation work reduced our legal document processing time by 97%. That's not an improvement — it's a complete business model shift. Remarkable.",
    author: 'David Park',
    role: 'Managing Partner, Park & Associates',
    avatar: 'DP',
    color: '#06b6d4',
    stars: 5,
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#f59e0b">
          <path d="M7 1l1.6 3.3 3.6.5-2.6 2.5.6 3.6L7 9.1l-3.2 1.7.6-3.6L2 4.8l3.6-.5z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ t, index }: { t: typeof testimonials[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="testimonial-card group rounded-2xl p-7 hover:border-white/10 hover:bg-white/03 transition-all duration-500 cursor-default"
    >
      {/* Stars */}
      <Stars count={t.stars} />

      {/* Quote */}
      <p className="text-white/60 text-[0.92rem] leading-relaxed mb-7 group-hover:text-white/75 transition-colors duration-300">
        "{t.quote}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
          style={{ background: `${t.color}30`, border: `1px solid ${t.color}40` }}
        >
          {t.avatar}
        </div>
        <div>
          <div className="text-sm font-semibold text-white">{t.author}</div>
          <div className="text-xs text-white/35">{t.role}</div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/08 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <RevealFade delay={0.1}>
            <Badge variant="purple" className="mb-5">Testimonials</Badge>
          </RevealFade>
          <RevealWords delay={0.2} className="font-display font-bold text-[clamp(2.2rem,5vw,4rem)] leading-[1.08] tracking-tight text-white mb-5">
            Don't take our word for it
          </RevealWords>
          <RevealFade delay={0.4}>
            <p className="text-white/40 text-[1.05rem]">
              The people we've built with say it best.
            </p>
          </RevealFade>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.author} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
