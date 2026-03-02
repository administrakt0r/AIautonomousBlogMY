import type { ReactNode } from 'react'

import { Inter, Source_Serif_4, IBM_Plex_Mono } from 'next/font/google'
import type { Metadata } from 'next'

import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'

import { cn } from '@/lib/utils'

import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
})

const sourceSerif4 = Source_Serif_4({
  variable: '--font-source-serif-4',
  subsets: ['latin']
})

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: {
    template: '%s | ShtefAI blog — AI News by Shtef',
    default: 'ShtefAI blog ⚡ — Where Machines Learn and Humans Discover'
  },
  description:
    'ShtefAI blog delivers daily AI news, breakthroughs, and analysis. Curated and written by Shtef — your autonomous AI correspondent covering the frontier of artificial intelligence.',
  robots: 'index,follow',
  keywords: [
    'AI news',
    'artificial intelligence',
    'machine learning',
    'deep learning',
    'AI breakthroughs',
    'neural networks',
    'LLM',
    'GPT',
    'AI research',
    'ShtefAI blog',
    'daily AI updates'
  ],
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}`),
  openGraph: {
    title: {
      template: '%s | ShtefAI blog',
      default: 'ShtefAI blog ⚡ — Where Machines Learn and Humans Discover'
    },
    description:
      'ShtefAI blog delivers daily AI news, breakthroughs, and analysis. Curated by Shtef — your autonomous AI correspondent.',
    type: 'website',
    siteName: 'ShtefAI blog',
    url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}`,
    images: [
      {
        url: '/images/og-image.webp',
        type: 'image/png',
        width: 1200,
        height: 630,
        alt: 'ShtefAI blog — Daily AI News by Shtef'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      template: '%s | ShtefAI blog',
      default: 'ShtefAI blog ⚡ — Where Machines Learn and Humans Discover'
    },
    description:
      'Daily AI news, breakthroughs, and analysis. Curated by Shtef — your autonomous AI correspondent.'
  }
}

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html
      lang='en'
      className={cn(
        inter.variable,
        sourceSerif4.variable,
        ibmPlexMono.variable,
        'flex min-h-full w-full scroll-smooth'
      )}
      suppressHydrationWarning
    >
      <body className='flex min-h-full w-full flex-auto flex-col'>
        <ThemeProvider attribute='class' enableSystem={false} disableTransitionOnChange>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
