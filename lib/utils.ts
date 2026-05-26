import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K'
  return num.toString()
}

export const easing = {
  smooth: [0.25, 0.46, 0.45, 0.94],
  bounce: [0.34, 1.56, 0.64, 1],
  in: [0.4, 0, 1, 1],
  out: [0, 0, 0.2, 1],
  inOut: [0.4, 0, 0.2, 1],
} as const
