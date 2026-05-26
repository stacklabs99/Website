'use client'

import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { RevealWords, RevealFade } from '@/components/ui/RevealText'
import Badge from '@/components/ui/Badge'

function TastlyProject() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12%' })

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [3, -3]),  { stiffness: 250, damping: 30 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]),  { stiffness: 250, damping: 30 })
  const gx = useTransform(mx, [-0.5, 0.5], ['10%', '90%'])
  const gy = useTransform(my, [-0.5, 0.5], ['10%', '90%'])

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onMouseLeave = () => { mx.set(0); my.set(0) }

  const features = [
    { icon: '◉', label: 'Menu multilíngue', desc: 'PT / EN / ES / FR com tradução automática por IA' },
    { icon: '◈', label: 'Maridagem por IA',  desc: 'Sugestões de vinho, entradas e sobremesas por prato' },
    { icon: '⬡', label: 'Filtros de dieta',  desc: 'Vegetariano, vegan, sem-glúten, alergénios' },
    { icon: '◇', label: 'Analytics',         desc: 'O que os clientes mais olham, horas de pico' },
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-3xl overflow-hidden mb-4"
      style={{
        background: 'linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(10,10,22,0.85) 60%)',
        border: '1px solid rgba(255,255,255,0.07)',
        perspective: 1200,
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{
        boxShadow: '0 50px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,158,11,0.15)',
        y: -6,
      }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle 400px at ${gx} ${gy}, rgba(245,158,11,0.07) 0%, transparent 70%)` }}
      />

      <motion.div style={{ rotateX: rx, rotateY: ry }} className="grid md:grid-cols-2">
        <div className="p-8 md:p-12 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-7">
              <span className="text-[10px] font-bold tracking-[0.2em] text-amber-400/70 uppercase">Projeto Real — StackLabs</span>
              <div className="h-px flex-1 bg-amber-500/20" />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >🍽</motion.div>
              <div>
                <h3 className="font-display font-bold text-[2rem] md:text-[2.4rem] text-white tracking-tight leading-none">Tastly</h3>
                <p className="text-xs text-white/30 mt-1 tracking-wide">tastly.stacklabs.pt</p>
              </div>
            </div>
            <div className="text-xs text-white/25 uppercase tracking-[0.15em] mb-4">SaaS · Menus Digitais para Restaurantes</div>
            <p className="text-white/45 text-[0.95rem] leading-relaxed mb-8 max-w-sm">
              Em vez de um menu em papel, cada restaurante tem um menu interativo e multilíngue,
              acessível por QR code. O dono gere tudo num backoffice; o cliente acede pelo telemóvel.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {features.map((f, fi) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + fi * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.03, x: 4 }}
                  className="flex items-start gap-2.5 p-3 rounded-xl border border-white/05 bg-white/02 cursor-default"
                >
                  <span className="text-amber-400 text-sm mt-0.5 flex-shrink-0">{f.icon}</span>
                  <div>
                    <div className="text-xs font-semibold text-white/80 mb-0.5">{f.label}</div>
                    <div className="text-[11px] text-white/30 leading-snug">{f.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div className="flex items-center gap-6 pt-6 border-t border-white/06"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}>
            <div>
              <div className="font-display font-bold text-2xl text-white">€29<span className="text-white/30 text-base font-normal">/mês</span></div>
              <div className="text-[11px] text-white/25 mt-0.5">ou €290/ano · trial 15 dias</div>
            </div>
            <div className="h-8 w-px bg-white/08" />
            <div>
              <div className="font-display font-bold text-2xl text-white">4</div>
              <div className="text-[11px] text-white/25 mt-0.5">idiomas suportados</div>
            </div>
            <div className="h-8 w-px bg-white/08" />
            <div>
              <div className="font-display font-bold text-xl text-white">Stripe</div>
              <div className="text-[11px] text-white/25 mt-0.5">pagamentos</div>
            </div>
          </motion.div>
        </div>

        <div className="relative h-72 md:h-auto overflow-hidden border-t md:border-t-0 md:border-l border-white/05">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 60% 40%, rgba(245,158,11,0.1) 0%, transparent 65%)' }} />
          <div className="absolute inset-0 dot-pattern opacity-15" />

          <div className="absolute inset-0 flex items-center justify-center p-8">
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="w-[200px] rounded-[28px] overflow-hidden border border-white/12"
                style={{ background: 'rgba(8,8,18,0.95)', boxShadow: '0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)' }}>
                <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/05">
                  <span className="text-[9px] text-white/30 font-mono">Tastly</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-amber-400/60" />
                    <span className="text-[8px] text-white/25">QR Menu</span>
                  </div>
                </div>
                <div className="p-3 space-y-2">
                  <div className="text-center py-2">
                    <div className="text-xs font-bold text-white/90">Taberna do Mar</div>
                    <div className="text-[9px] text-white/30 mt-0.5">Lisboa, Portugal</div>
                  </div>
                  <div className="flex gap-1 justify-center">
                    {['🇵🇹','🇬🇧','🇪🇸','🇫🇷'].map((f, i) => (
                      <div key={i} className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] border"
                        style={{ background: i===0?'rgba(245,158,11,0.2)':'rgba(255,255,255,0.04)', borderColor: i===0?'rgba(245,158,11,0.4)':'rgba(255,255,255,0.07)' }}>
                        {f}
                      </div>
                    ))}
                  </div>
                  {[
                    { name: 'Bacalhau à Brás', price: '18,50€', tag: 'Chef' },
                    { name: 'Percebes',         price: '24,00€', tag: 'Mar' },
                    { name: 'Pastel de Nata',   price: '3,50€',  tag: 'Doce' },
                  ].map((item, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-white/05"
                      style={{ background: 'rgba(255,255,255,0.03)' }}
                    >
                      <div>
                        <div className="text-[10px] font-semibold text-white/80">{item.name}</div>
                        <div className="text-[8px] text-amber-400/60 mt-0.5">{item.tag}</div>
                      </div>
                      <div className="text-[10px] font-bold text-white/70">{item.price}</div>
                    </motion.div>
                  ))}
                  <motion.div className="flex items-center gap-1.5 p-2 rounded-lg border border-amber-500/15 bg-amber-500/06"
                    animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                    <span className="text-[9px]">✨</span>
                    <span className="text-[9px] text-amber-400/70">IA sugere: Vinho Verde Alvarinho</span>
                  </motion.div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
                animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ delay: 0.9, duration: 0.7, type: 'spring', stiffness: 200 }}
                className="absolute -right-10 -top-6 w-[80px] rounded-xl border border-white/08 p-2.5"
                style={{ background: 'rgba(8,8,18,0.94)', backdropFilter: 'blur(20px)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
              >
                <div className="grid grid-cols-5 gap-0.5 mb-1.5">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div key={i} className="aspect-square rounded-[1px]"
                      style={{ background: [0,1,2,5,6,7,10,12,14,17,18,19,20,22,24].includes(i)?'rgba(245,158,11,0.8)':'rgba(255,255,255,0.06)' }} />
                  ))}
                </div>
                <div className="text-[7px] text-white/25 text-center">QR Code</div>
              </motion.div>
            </motion.div>
          </div>

          <div className="absolute bottom-4 right-4 flex flex-wrap gap-1.5">
            {['Next.js', 'Stripe', 'AI'].map((t, ti) => (
              <motion.span key={t}
                initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.8 + ti * 0.08 }}
                className="text-[9px] font-medium px-2 py-1 rounded-md border"
                style={{ background: 'rgba(8,8,18,0.9)', borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)' }}>
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-xl">
            <RevealFade delay={0.1}>
              <Badge variant="blue" className="mb-5">Trabalho Real</Badge>
            </RevealFade>
            <RevealWords delay={0.15} className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(2.2rem,5vw,4.2rem)', letterSpacing: '-0.04em', lineHeight: 1.06 }}>
              Produtos que construímos
            </RevealWords>
          </div>
          <RevealFade delay={0.3}>
            <a href="mailto:stacklabs99@gmail.com"
              className="flex-shrink-0 flex items-center gap-2 text-sm text-white/30 hover:text-white transition-colors duration-300 group">
              O teu projeto aqui
              <motion.span animate={{ x: [0,4,0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>→</motion.span>
            </a>
          </RevealFade>
        </div>

        <TastlyProject />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 rounded-2xl border border-white/05 border-dashed p-10 text-center relative overflow-hidden group"
          style={{ background: 'rgba(255,255,255,0.01)' }}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 50% 50%, rgba(79,142,247,0.04), transparent 70%)' }} />
          <p className="text-white/20 text-sm mb-3">Mais projetos em desenvolvimento</p>
          <a href="mailto:stacklabs99@gmail.com"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#4f8ef7] hover:text-blue-300 transition-colors">
            Trabalha connosco
            <motion.span animate={{ x: [0,4,0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>→</motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
