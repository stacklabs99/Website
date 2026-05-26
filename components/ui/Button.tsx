'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: boolean
  className?: string
  onClick?: () => void
  href?: string
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = false,
  className,
  onClick,
  href,
}: ButtonProps) {
  const base =
    'relative inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-all duration-300 rounded-xl btn-shimmer overflow-hidden cursor-pointer'

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  const variants = {
    primary: `
      bg-accent text-white
      shadow-[0_0_0_1px_rgba(59,130,246,0.3),0_4px_24px_rgba(59,130,246,0.25)]
      hover:shadow-[0_0_0_1px_rgba(59,130,246,0.5),0_4px_40px_rgba(59,130,246,0.4)]
      hover:bg-blue-500
    `,
    secondary: `
      glass text-white/80
      hover:text-white hover:border-white/20
      hover:bg-white/5
    `,
    ghost: `
      text-white/60 hover:text-white
      hover:bg-white/5
    `,
  }

  const Component = href ? 'a' : 'button'

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-block"
    >
      <Component
        href={href}
        onClick={onClick}
        className={cn(base, sizes[size], variants[variant], className)}
      >
        {children}
        {icon && (
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight size={16} />
          </motion.span>
        )}
      </Component>
    </motion.div>
  )
}
