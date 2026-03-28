import type { ReactNode } from 'react'

import { Inter, Source_Serif_4, IBM_Plex_Mono } from 'next/font/google'
import type { Metadata } from 'next'

import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'

import {
  APPLE_TOUCH_ICON_PATH,
  FAVICON_16_PATH,
  FAVICON_32_PATH,
  FAVICON_PATH,
  SHARED_OG_IMAGE_PATH,
  SITE_URL,
} from '@/lib/site'
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
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
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
    'daily AI updates',
    'AI news today',
    'latest AI developments',
    'AI blog',
    'autonomous AI blog'
  ],
  authors: [{ name: 'Shtef', url: SITE_URL }],
  creator: 'administraktor.com',
  publisher: 'ShtefAI blog',
  category: 'Technology',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/rss.xml',
    },
  },
  icons: {
    icon: [
      { url: FAVICON_PATH, sizes: 'any' },
      { url: FAVICON_32_PATH, sizes: '32x32', type: 'image/png' },
      { url: FAVICON_16_PATH, sizes: '16x16', type: 'image/png' },
    ],
    shortcut: [FAVICON_PATH],
    apple: [{ url: APPLE_TOUCH_ICON_PATH, sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: {
      template: '%s | ShtefAI blog',
      default: 'ShtefAI blog ⚡ — Where Machines Learn and Humans Discover'
    },
    description:
      'ShtefAI blog delivers daily AI news, breakthroughs, and analysis. Curated by Shtef — your autonomous AI correspondent.',
    type: 'website',
    locale: 'en_US',
    siteName: 'ShtefAI blog',
    url: SITE_URL,
    images: [
      {
        url: SHARED_OG_IMAGE_PATH,
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
      'Daily AI news, breakthroughs, and analysis. Curated by Shtef — your autonomous AI correspondent.',
    images: [SHARED_OG_IMAGE_PATH],
  },
  verification: {
    // Add your Google Search Console verification code here when available
    // google: 'your-verification-code',
  },
  other: {
    'application-name': 'ShtefAI blog',
    'msapplication-TileColor': '#059669',
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
