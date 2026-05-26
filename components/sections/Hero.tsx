'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useScroll } from 'framer-motion'

/* ─── Canvas Particle System w/ connections ──────────────────── */
function Particles() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')!
    let raf: number

    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const pts = Array.from({ length: 90 }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: Math.random() * 1.3 + 0.3,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      a: Math.random() * 0.28 + 0.06,
      ph: Math.random() * Math.PI * 2,
    }))

    const MAX_DIST = 120

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height)
      t += 0.005
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy
        if (p.x < -4) p.x = c.width + 4
        if (p.x > c.width + 4) p.x = -4
        if (p.y < -4) p.y = c.height + 4
        if (p.y > c.height + 4) p.y = -4
        const alpha = p.a * (0.4 + 0.6 * Math.sin(t + p.ph))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(110,162,255,${alpha})`
        ctx.fill()
      }
      /* draw connection lines */
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const lineA = (1 - dist / MAX_DIST) * 0.12
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(79,142,247,${lineA})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf) }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.7 }} />
}

/* ─── Magnetic Button ────────────────────────────────────────── */
function MagBtn({ children, href, primary }: { children: React.ReactNode; href: string; primary?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useSpring(0, { stiffness: 200, damping: 20 })
  const y = useSpring(0, { stiffness: 200, damping: 20 })

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{
        x, y,
        ...(primary ? {
          background: 'linear-gradient(135deg,#1a4fd8 0%,#4f8ef7 55%,#6366f1 100%)',
          boxShadow: '0 0 0 1px rgba(99,102,241,0.38),0 6px 28px rgba(79,142,247,0.38),inset 0 1px 0 rgba(255,255,255,0.14)',
        } : {
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
        }),
      }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * 0.5)
        y.set((e.clientY - r.top - r.height / 2) * 0.5)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      whileHover={{ scale: primary ? 1.05 : 1.03 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative inline-flex items-center gap-2 px-7 py-4 rounded-[14px]
        text-[14px] font-semibold tracking-tight btn-shimmer
        ${primary ? 'text-white btn-glow' : 'text-white/50 hover:text-white/80 transition-colors duration-300'}
      `}
    >
      {children}
    </motion.a>
  )
}

/* ─── Word Cycle ─────────────────────────────────────────────── */
const WORDS = ['World-class.', 'Unmatched.', 'Exceptional.', 'Elite.']

function WordCycle() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI(n => (n + 1) % WORDS.length), 3200)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="relative inline-block" style={{ minWidth: '10ch' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          className="inline-block text-gradient-blue"
          initial={{ y: '105%', opacity: 0, filter: 'blur(12px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-60%', opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {WORDS[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/* ─── Proof Counter ──────────────────────────────────────────── */
function Counter({ to, suffix, delay = 0 }: { to: number; suffix: string; delay?: number }) {
  const [n, setN] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // start after delay
    const tid = setTimeout(() => {
      const dur = 1800
      const start = performance.now()
      const ease = (t: number) => 1 - Math.pow(1 - t, 3)
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1)
        setN(Math.floor(ease(p) * to))
        if (p < 1) requestAnimationFrame(tick)
        else setN(to)
      }
      requestAnimationFrame(tick)
    }, delay)
    return () => clearTimeout(tid)
  }, [to, delay])

  return <span ref={ref} className="tabular">{n}{suffix}</span>
}

/* ─── Dashboard Mockup ───────────────────────────────────────── */
function Dashboard() {
  const metrics = [
    { v: '$284K', l: 'MRR', d: '+18%', c: '#4f8ef7' },
    { v: '92.4K', l: 'Users', d: '+31%', c: '#8b5cf6' },
    { v: '99.98%', l: 'Uptime', d: '↑', c: '#10b981' },
  ]
  const bars = [28, 42, 36, 60, 52, 74, 64, 82, 72, 90, 81, 100]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.3, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Glow */}
      <div className="absolute -inset-4 -bottom-8 rounded-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(79,142,247,0.14) 0%, transparent 70%)' }}
      />

      {/* Main card */}
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg,rgba(10,10,22,0.98) 0%,rgba(6,6,16,0.99) 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.85),0 0 0 1px rgba(255,255,255,0.055),inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        {/* Chrome */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/05">
          <div className="flex gap-1.5">
            {['#ff5f57','#ffbd2e','#28c840'].map(c => (
              <div key={c} className="w-2.5 h-2.5 rounded-full opacity-70" style={{ background: c }} />
            ))}
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/04">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-white/25 font-mono">app.client.io/dashboard</span>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-3.5">
          {/* Metrics */}
          <div className="grid grid-cols-3 gap-2.5">
            {metrics.map((m, idx) => (
              <motion.div key={m.l}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="p-3 rounded-xl border border-white/05"
                style={{ background: `${m.c}09` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] uppercase tracking-[0.14em] text-white/25">{m.l}</span>
                  <span className="text-[9px] font-medium text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">{m.d}</span>
                </div>
                <div className="text-[1.05rem] font-bold font-display text-white tabular">{m.v}</div>
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <div className="rounded-xl border border-white/04 p-3.5 bg-white/01">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold text-white/60">Revenue Growth</span>
              <span className="text-[10px] text-white/22">12 months</span>
            </div>
            <div className="flex items-end gap-1 h-[52px]">
              {bars.map((h, idx) => (
                <motion.div key={idx}
                  className="flex-1 rounded-t-sm"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 1.85 + idx * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    height: `${h}%`,
                    transformOrigin: 'bottom',
                    background: idx >= 10
                      ? 'linear-gradient(to top,#4f8ef7,#8b5cf6)'
                      : `rgba(79,142,247,${0.1 + (idx / 11) * 0.25})`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Activity */}
          <div className="space-y-1.5">
            {[
              { color: '#10b981', text: 'v4.2.1 deployed to production', t: '2m' },
              { color: '#4f8ef7', text: 'Enterprise contract signed',     t: '1h' },
            ].map((a, idx) => (
              <motion.div key={idx}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.15 + idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg border border-white/04 bg-white/02"
              >
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: a.color }} />
                <span className="text-[11px] text-white/38 flex-1 truncate">{a.text}</span>
                <span className="text-[10px] text-white/18 flex-shrink-0">{a.t}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating accent — latency */}
      <motion.div
        initial={{ opacity: 0, x: -20, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 2.55, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -left-14 top-14 w-[130px] rounded-2xl p-3.5 border border-white/07"
        style={{
          background: 'rgba(8,8,20,0.95)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.65)',
          backdropFilter: 'blur(24px)',
        }}
      >
        <div className="text-[9px] text-white/28 uppercase tracking-[0.14em] mb-1.5">Latency</div>
        <div className="text-[1.4rem] font-bold font-display text-emerald-400 tabular">38ms</div>
        <div className="mt-2.5 h-1 rounded-full bg-white/06 overflow-hidden">
          <motion.div className="h-full rounded-full bg-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: '94%' }}
            transition={{ delay: 2.9, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </motion.div>

      {/* Floating accent — deploy */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 2.75, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -right-10 -bottom-8 w-[140px] rounded-2xl p-3.5 border border-white/07"
        style={{
          background: 'rgba(8,8,20,0.95)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.65)',
          backdropFilter: 'blur(24px)',
        }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-4 h-4 rounded-md bg-emerald-500/20 flex items-center justify-center">
            <span className="text-emerald-400 text-[9px]">✓</span>
          </div>
          <span className="text-[10px] text-white/40 font-medium">Deployed</span>
        </div>
        <div className="text-xs text-white/60 font-medium">Production live</div>
        <div className="text-[10px] text-white/22 mt-0.5">Just now</div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Hero ────────────────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })

  /* parallax scroll fade */
  const contentY  = useTransform(scrollYProgress, [0, 1], [0, -80])
  const contentOp = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  /* mouse parallax */
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 28, damping: 22 })
  const sy = useSpring(my, { stiffness: 28, damping: 22 })

  const orb1x = useTransform(sx, [0,1], [-55, 55])
  const orb1y = useTransform(sy, [0,1], [-38, 38])
  const orb2x = useTransform(sx, [0,1], [38, -38])
  const orb2y = useTransform(sy, [0,1], [28, -28])
  const cardX = useTransform(sx, [0,1], [16, -16])
  const cardY = useTransform(sy, [0,1], [12, -12])
  const spotLeft = useTransform(sx, [0,1], ['5%', '95%'])
  const spotTop  = useTransform(sy, [0,1], ['5%', '95%'])

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth)
      my.set(e.clientY / window.innerHeight)
    }
    window.addEventListener('mousemove', fn, { passive: true })
    return () => window.removeEventListener('mousemove', fn)
  }, [mx, my])

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] flex items-center overflow-hidden">

      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 110% 70% at 50% -5%,rgba(79,142,247,0.09) 0%,transparent 55%)' }}
        />
        <div className="absolute inset-0 grid-pattern opacity-[0.28]" />
        <Particles />
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 700, height: 700,
            left: spotLeft, top: spotTop,
            x: '-50%', y: '-50%',
            background: 'radial-gradient(circle,rgba(79,142,247,0.075) 0%,transparent 68%)',
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            x: orb1x, y: orb1y,
            width: 900, height: 900,
            top: '-20%', left: '-18%',
            background: 'radial-gradient(circle,rgba(79,142,247,0.14) 0%,transparent 62%)',
          }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            x: orb2x, y: orb2y,
            width: 750, height: 750,
            bottom: '-25%', right: '-12%',
            background: 'radial-gradient(circle,rgba(139,92,246,0.12) 0%,transparent 62%)',
          }}
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%,transparent 40%,rgba(5,5,7,0.55) 100%)' }}
        />
        {/* horizontal light beam */}
        <motion.div
          className="absolute left-0 right-0 h-px"
          style={{ top: '58%', background: 'linear-gradient(90deg,transparent 0%,rgba(79,142,247,0.12) 30%,rgba(139,92,246,0.18) 60%,transparent 100%)' }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 2.2, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* ── Content ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOp }}
        className="relative z-10 w-full max-w-[1320px] mx-auto px-6 lg:px-10 pt-28 pb-16"
      >
        <div className="grid lg:grid-cols-[1fr_460px] xl:grid-cols-[1fr_500px] gap-12 xl:gap-20 items-center">

          {/* Left */}
          <div>
            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full mb-10 border border-white/07"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                animate={{ opacity: [1, 0.35, 1] }}
                transition={{ duration: 2.2, repeat: Infinity }}
              />
              <span className="text-[11px] text-white/40 tracking-wide">Q3 2025 — 3 project slots remaining</span>
              <span className="text-[11px] font-semibold text-[#4f8ef7]">Apply →</span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display font-bold mb-7" style={{ lineHeight: 0.91, letterSpacing: '-0.04em' }}>
              {[
                { text: 'Engineering',  color: 'rgba(255,255,255,1)',    delay: 0.38 },
                { text: 'Digital',      color: 'rgba(255,255,255,0.18)', delay: 0.54 },
                { text: 'Products at',  color: 'rgba(255,255,255,1)',    delay: 0.70 },
              ].map(({ text, color, delay }) => (
                <span key={text} className="block overflow-hidden pb-1">
                  <motion.span
                    className="block"
                    style={{ fontSize: 'clamp(3.4rem,6.8vw,7.2rem)', color }}
                    initial={{ y: '108%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {text}
                  </motion.span>
                </span>
              ))}

              <span className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  style={{ fontSize: 'clamp(3.4rem,6.8vw,7.2rem)' }}
                  initial={{ y: '108%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.86, ease: [0.16, 1, 0.3, 1] }}
                >
                  <WordCycle />
                </motion.span>
              </span>
            </h1>

            {/* Sub */}
            <motion.p
              className="text-white/35 text-[1.05rem] leading-relaxed max-w-[420px] mb-10"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
            >
              We design and engineer the digital products that define ambitious
              companies. Strategy, craft, and execution — obsessively unified.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex items-center gap-3 mb-14"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <MagBtn primary href="#contact">Start a Project →</MagBtn>
              <MagBtn href="#projects">View Work</MagBtn>
            </motion.div>

            {/* Proof strip */}
            <motion.div
              className="flex items-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.7 }}
            >
              {[
                { v: 120, suffix: '+', l: 'Projects shipped', delay: 2000 },
                { v: 98,  suffix: '%', l: 'Client retention',  delay: 2200 },
                { v: 4,   suffix: '×', l: 'Average ROI',       delay: 2400 },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display font-bold text-[1.5rem] text-white">
                    <Counter to={s.v} suffix={s.suffix} delay={s.delay} />
                  </div>
                  <div className="text-[11px] text-white/25 mt-0.5 tracking-wide">{s.l}</div>
                </div>
              ))}

              <div className="w-px h-9 bg-white/08 mx-1 hidden sm:block" />
              <div className="hidden sm:block text-[11px] text-white/20 leading-relaxed">
                Trusted by teams<br />at Series A → IPO
              </div>
            </motion.div>
          </div>

          {/* Right */}
          <motion.div style={{ x: cardX, y: cardY }} className="hidden lg:block">
            <Dashboard />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
      >
        <motion.div
          className="w-[18px] h-7 rounded-full border border-white/12 flex items-start justify-center pt-1.5"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-0.5 h-1.5 rounded-full bg-white/25" />
        </motion.div>
      </motion.div>
    </section>
  )
}
