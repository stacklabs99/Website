'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader() {
  const [visible, setVisible] = useState(true)
  const [count, setCount] = useState(0)

  useEffect(() => {
    /* count up 0→100 */
    const total = 1100
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / total, 1)
      setCount(Math.floor(p * 100))
      if (p < 1) requestAnimationFrame(tick)
      else setTimeout(() => setVisible(false), 180)
    }
    requestAnimationFrame(tick)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="page-loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Curtain slides up */}
          <motion.div
            className="absolute inset-0 bg-[#050507]"
            exit={{ y: '-100%' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2.5"
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#4f8ef7,#8b5cf6)' }}>
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                  <rect x="2" y="2" width="4" height="4" rx="0.5" fill="white" fillOpacity="0.9" />
                  <rect x="8" y="2" width="4" height="4" rx="0.5" fill="white" fillOpacity="0.9" />
                  <rect x="2" y="8" width="4" height="4" rx="0.5" fill="white" fillOpacity="0.9" />
                  <rect x="8" y="8" width="4" height="4" rx="0.5" fill="white" fillOpacity="0.6" />
                </svg>
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                Stack<span className="text-[#4f8ef7]">Labs</span>
              </span>
            </motion.div>

            {/* Counter */}
            <motion.div
              className="font-display font-bold tabular"
              style={{ fontSize: '4.5rem', letterSpacing: '-0.04em', lineHeight: 1, color: 'rgba(255,255,255,0.08)' }}
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>{String(count).padStart(2, '0')}</span>
            </motion.div>

            {/* Progress bar */}
            <div className="w-48 h-px bg-white/08 overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6]"
                style={{ width: `${count}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
