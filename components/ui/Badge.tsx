import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'blue' | 'purple'
}

export default function Badge({ children, className, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'bg-white/5 text-white/60 border-white/08',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border tracking-wide',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
