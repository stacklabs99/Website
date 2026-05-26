'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'

const principles = [
  {
    num: '001',
    title: "Não lançamos rápido. Lançamos certo.",
    body: 'Velocidade sem qualidade é apenas dívida com prazo. Arquitetamos corretamente da primeira vez — porque o código mais rápido é o que nunca tens de reescrever.',
    accent: '#4f8ef7',
  },
  {
    num: '002',
    title: 'Design não é decoração.',
    body: 'Cada pixel, cada interação, cada transição existe para servir um propósito. A melhor interface é aquela em que o utilizador nunca pensa conscientemente.',
    accent: '#8b5cf6',
  },
  {
    num: '003',
    title: "Tratamos o teu produto como se fosse nosso.",
    body: "Obcecamo-nos com as tuas métricas, a tua retenção, o teu crescimento. Não porque nos pedem. Porque quando tu ganhas, nós ganhamos.",
    accent: '#10b981',
  },
  {
    num: '004',
    title: 'Craft é uma vantagem competitiva.',
    body: "Num mundo de mediocridade gerada por IA, craft excecional é o último diferenciador verdadeiro. Construímos para empresas que se recusam a ser mediocres.",
    accent: '#f59e0b',
  },
]

function PrincipleRow({ p, i }: { p: typeof principles[0]; i: number }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })

  /* hover glow */
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const gx = useTransform(mx, [-0.5, 0.5], ['0%', '100%'])
  const gy = useTransform(my, [-0.5, 0.5], ['0%', '100%'])

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onMouseLeave = () => { mx.set(0); my.set(0) }

  return (
    <div
      ref={ref}
      className="relative group"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Cursor-following glow */}
      <motion.div
        className="absolute inset-0 -mx-6 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle 350px at ${gx} ${gy}, ${p.accent}08, transparent 70%)` }}
      />

      {/* Divider */}
      <div className="relative h-px mb-10 bg-white/05 overflow-hidden">
        <motion.div
          className="absolute inset-0 h-full"
          style={{ background: `linear-gradient(to right, ${p.accent}90, transparent 80%)` }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="grid grid-cols-[40px_1fr] md:grid-cols-[80px_1fr_auto] gap-6 md:gap-12 pb-16">
        {/* Number */}
        <motion.span
          className="font-mono text-[10px] tracking-[0.18em] font-bold pt-2"
          style={{ color: p.accent }}
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {p.num}
        </motion.span>

        {/* Content */}
        <div>
          <div className="overflow-hidden mb-4">
            <motion.h3
              className="font-display font-bold text-white leading-tight group-hover:text-white transition-colors"
              style={{ fontSize: 'clamp(1.5rem,3vw,2.4rem)', letterSpacing: '-0.03em' }}
              initial={{ y: '105%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              {p.title}
            </motion.h3>
          </div>
          <motion.p
            className="text-white/35 text-[0.95rem] leading-relaxed max-w-2xl group-hover:text-white/50 transition-colors duration-400"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {p.body}
          </motion.p>
        </div>

        {/* Spinning accent */}
        <motion.div
          className="hidden md:flex items-start pt-2"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 0.3, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4, type: 'spring', stiffness: 200 }}
          whileHover={{ opacity: 0.65, scale: 1.15 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            className="w-10 h-10 rounded-full border relative"
            style={{ borderColor: p.accent }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
              style={{ background: p.accent }} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default function Manifesto() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const yShift = useTransform(scrollYProgress, [0, 1], [40, -40])

  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-10%' })

  return (
    <section ref={sectionRef} className="relative py-36 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 80% 50%, rgba(79,142,247,0.04) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-24">
          <motion.div
            className="flex items-center gap-3 mb-10"
            initial={{ opacity: 0, x: -16 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="h-px w-10 bg-[#4f8ef7]/60" />
            <span className="text-[10px] text-white/28 tracking-[0.22em] uppercase">Como Pensamos</span>
          </motion.div>

          <motion.div style={{ y: yShift }}>
            <div className="overflow-hidden mb-2">
              <motion.p
                className="font-display font-bold text-white"
                style={{ fontSize: 'clamp(2.6rem,5.8vw,6rem)', letterSpacing: '-0.04em', lineHeight: 1 }}
                initial={{ y: '105%' }}
                animate={headerInView ? { y: 0 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                A internet merece
              </motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.p
                className="font-display font-bold text-white/18"
                style={{ fontSize: 'clamp(2.6rem,5.8vw,6rem)', letterSpacing: '-0.04em', lineHeight: 1 }}
                initial={{ y: '105%' }}
                animate={headerInView ? { y: 0 } : {}}
                transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                software melhor.
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Principles */}
        {principles.map((p, i) => <PrincipleRow key={p.num} p={p} i={i} />)}

        {/* Bottom quote */}
        <div className="mt-8 pt-14 border-t border-white/05">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <motion.blockquote
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-semibold text-white/45 max-w-md leading-relaxed"
              style={{ fontSize: 'clamp(1.1rem,2vw,1.4rem)', letterSpacing: '-0.02em' }}
            >
              "Não construímos apenas produtos.<br />Construímos as empresas por detrás deles."
            </motion.blockquote>

            <motion.a
              href="#contact"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ x: 4 }}
              className="flex items-center gap-2 text-sm font-semibold text-[#4f8ef7] hover:text-blue-300 transition-colors group whitespace-nowrap"
            >
              Trabalha connosco
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >→</motion.span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
