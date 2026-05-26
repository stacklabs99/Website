import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-syne)', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: '#050505',
        surface: '#0a0a0a',
        'surface-2': '#111111',
        'surface-3': '#161616',
        border: 'rgba(255,255,255,0.06)',
        'border-light': 'rgba(255,255,255,0.10)',
        accent: '#3b82f6',
        'accent-glow': 'rgba(59,130,246,0.3)',
        'accent-2': '#8b5cf6',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(135deg, #050505 0%, #0a0a0a 50%, #050505 100%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(59,130,246,0.15)',
        'glow': '0 0 40px rgba(59,130,246,0.2)',
        'glow-lg': '0 0 80px rgba(59,130,246,0.25)',
        'glow-purple': '0 0 40px rgba(139,92,246,0.2)',
        'card': '0 1px 0 rgba(255,255,255,0.06), 0 20px 40px rgba(0,0,0,0.4)',
        'card-hover': '0 1px 0 rgba(255,255,255,0.10), 0 30px 60px rgba(0,0,0,0.5), 0 0 60px rgba(59,130,246,0.08)',
      },
    },
  },
  plugins: [],
}
export default config
