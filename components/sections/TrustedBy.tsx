'use client'

import { motion } from 'framer-motion'

const stack = [
  'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion',
  'Node.js', 'PostgreSQL', 'Stripe', 'OpenAI', 'Vercel',
  'Figma', 'React Native', 'Supabase', 'Prisma', 'AWS',
  'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion',
  'Node.js', 'PostgreSQL', 'Stripe', 'OpenAI', 'Vercel',
  'Figma', 'React Native', 'Supabase', 'Prisma', 'AWS',
]

export default function TrustedBy() {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }} />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center text-[10px] text-white/18 tracking-[0.25em] uppercase mb-8"
      >
        Tecnologias que dominamos
      </motion.p>

      <div className="flex overflow-hidden">
        <div className="marquee-track flex items-center gap-10 whitespace-nowrap">
          {stack.map((name, i) => (
            <span key={i} className="text-[13px] font-medium text-white/22 hover:text-white/60 transition-colors duration-300 tracking-wide">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
