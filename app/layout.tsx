import type { Metadata, Viewport } from 'next'
import { Inter, Syne } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'StackLabs — Build. Launch. Scale.',
  description: 'We design and engineer premium digital experiences for ambitious companies. Web development, SaaS platforms, UI/UX design, and AI automation.',
  keywords: ['web development', 'SaaS', 'UI/UX design', 'AI automation', 'digital experiences', 'StackLabs'],
  authors: [{ name: 'StackLabs' }],
  creator: 'StackLabs',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://stacklabs.dev',
    title: 'StackLabs — Build. Launch. Scale.',
    description: 'We design and engineer premium digital experiences for ambitious companies.',
    siteName: 'StackLabs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StackLabs — Build. Launch. Scale.',
    description: 'We design and engineer premium digital experiences for ambitious companies.',
    creator: '@stacklabs',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="bg-bg text-white antialiased">
        {children}
      </body>
    </html>
  )
}
