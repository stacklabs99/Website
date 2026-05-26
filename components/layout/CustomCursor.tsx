'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let rafId: number
    let mx = -200, my = -200   // current mouse
    let rx = -200, ry = -200   // ring lerp position
    let isDown = false

    /* ── fast dot: set directly on mousemove ── */
    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      dot.style.left  = mx + 'px'
      dot.style.top   = my + 'px'

      /* check hover state */
      const target = e.target as HTMLElement
      const hovering = !!target.closest('a, button, [data-cursor], input, textarea, select, label')
      if (hovering) {
        ring.classList.add('hovering')
        ring.classList.remove('clicking')
      } else if (!isDown) {
        ring.classList.remove('hovering')
      }
    }

    const onDown = () => {
      isDown = true
      ring.classList.add('clicking')
      ring.classList.remove('hovering')
    }
    const onUp = () => {
      isDown = false
      ring.classList.remove('clicking')
    }

    /* ── ring: lerp toward mouse ── */
    const tick = () => {
      rx += (mx - rx) * 0.11
      ry += (my - ry) * 0.11
      ring.style.left = rx + 'px'
      ring.style.top  = ry + 'px'
      rafId = requestAnimationFrame(tick)
    }
    tick()

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot  hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
    </>
  )
}
