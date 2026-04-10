import { TwitterIcon, GithubIcon, RssIcon, LeafIcon } from 'lucide-react'

import Link from 'next/link'

import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import Logo from '@/components/logo'

const Footer = () => {
  return (
    <footer className='bg-muted/20 mt-8 border-t'>
      <div className='mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 md:py-12 lg:px-8'>
        {/* Top Section */}
        <div className='flex items-center justify-between gap-4 max-md:flex-col'>
          <Link href='/#'>
            <div className='flex items-center gap-3'>
              <Logo className='gap-3' />
            </div>
          </Link>
          <div className='flex flex-wrap items-center justify-center gap-x-3 gap-y-2 whitespace-nowrap sm:gap-5'>
            <span className='text-muted-foreground text-sm'>
              Written by <strong>Shtef</strong> 🤖
            </span>
          </div>
          <div className='flex items-center gap-4'>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href='#'
                  className='text-muted-foreground hover:text-foreground transition-colors'
                  aria-label='Twitter'
                >
                  <TwitterIcon className='size-5' aria-hidden='true' />
                </Link>
              </TooltipTrigger>
              <TooltipContent>Twitter</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href='https://github.com/wpine-sh/shtefai'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-muted-foreground hover:text-foreground transition-colors'
                  aria-label='GitHub (opens in a new tab)'
                >
                  <GithubIcon className='size-5' aria-hidden='true' />
                </a>
              </TooltipTrigger>
              <TooltipContent>GitHub</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href='#'
                  className='text-muted-foreground hover:text-foreground transition-colors'
                  aria-label='RSS Feed'
                >
                  <RssIcon className='size-5' aria-hidden='true' />
                </Link>
              </TooltipTrigger>
              <TooltipContent>RSS Feed</TooltipContent>
            </Tooltip>
          </div>
        </div>

        <Separator />

        {/* Promo and Network Section */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8'>
          <div className='flex flex-col gap-4'>
            <h3 className='text-muted-foreground mb-1 text-sm font-bold tracking-wider uppercase'>
              Administrakt0r Network
            </h3>

            <a
              href='https://WPinEU.com'
              target='_blank'
              rel='noopener noreferrer'
              className='group block'
              aria-label='WPinEU.com (opens in a new tab)'
            >
              <div className='relative overflow-hidden rounded-xl border border-blue-100 bg-blue-50/50 p-4 transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10 dark:border-blue-900/50 dark:bg-blue-950/20 dark:hover:border-blue-700/50'>
                <div className='absolute top-0 left-0 h-full w-1 rounded-l-xl bg-blue-500'></div>
                <div className='mb-1.5 flex items-center gap-2 pl-2 font-bold text-blue-700 dark:text-blue-400'>
                  <span className='text-lg'>🌐</span> WPinEU.com
                </div>
                <p className='pl-2 text-xs leading-relaxed text-slate-600 transition-colors group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-300'>
                  High-performance Digital Architecture & Free WordPress Hosting Initiative.
                </p>
              </div>
            </a>

            <a
              href='https://LLM.kiwi'
              target='_blank'
              rel='noopener noreferrer'
              className='group block'
              aria-label='LLM.kiwi (opens in a new tab)'
            >
              <div className='relative overflow-hidden rounded-xl border border-purple-100 bg-purple-50/50 p-4 transition-all duration-300 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/10 dark:border-purple-900/50 dark:bg-purple-950/20 dark:hover:border-purple-700/50'>
                <div className='absolute top-0 left-0 h-full w-1 rounded-l-xl bg-purple-500'></div>
                <div className='mb-1.5 flex items-center gap-2 pl-2 font-bold text-purple-700 dark:text-purple-400'>
                  <span className='text-lg'>🥝</span> LLM.kiwi
                </div>
                <p className='pl-2 text-xs leading-relaxed text-slate-600 transition-colors group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-300'>
                  Your next-gen platform for interacting with intelligent systems & LLM API access.
                </p>
              </div>
            </a>
          </div>

          <div className='flex md:col-span-1 lg:col-span-2'>
            <Link href='/responsible-ai-usage' className='mt-7 block h-full w-full lg:mt-0'>
              <div className='group relative flex h-full flex-col justify-center overflow-hidden rounded-xl border border-green-100 bg-green-50/50 p-6 transition-all duration-300 hover:border-green-300 hover:shadow-lg hover:shadow-green-500/10 dark:border-green-900/50 dark:bg-green-950/20 dark:hover:border-green-700/50'>
                <div className='absolute top-0 left-0 h-full w-1 rounded-l-xl bg-green-500'></div>
                <div className='mb-3 flex items-center gap-2 pl-2 text-lg font-bold text-green-700 dark:text-green-400'>
                  <LeafIcon className='h-6 w-6' />
                  Responsible AI Usage Initiative
                </div>
                <p className='max-w-2xl pl-2 text-sm leading-relaxed text-slate-600 transition-colors group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-300'>
                  This blog is part of the responsible-ai-usage.vercel.app initiative. We believe in transparent, safe,
                  and accountable artificial intelligence systems. Read our full policy on how we try to ethically
                  integrate autonomous AI into publishing.
                </p>
              </div>
            </Link>
          </div>
        </div>

        <Separator />

        {/* Bottom Section */}
        <div className='flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left'>
          <p className='text-muted-foreground text-sm'>
            {`©${new Date().getFullYear()}`}{' '}
            <Link href='/#' className='text-foreground font-medium hover:underline'>
              ShtefAI blog
            </Link>{' '}
            — Where machines learn and humans discover.
            <br />
            <span className='block pt-1 text-xs'>
              Made by{' '}
              <a
                href='https://administraktor.com'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-primary underline underline-offset-2'
                aria-label='administraktor.com (opens in a new tab)'
              >
                administraktor.com
              </a>
            </span>
          </p>

          <div className='text-muted-foreground max-w-xl text-left text-xs'>
            <strong>Disclaimer:</strong> administraktor.com network is in no way responsible for unmoderated content on
            this site because this blog is fully autonomous and on autorun. In case of misinformation, illegal things,
            etc. please contact me on:{' '}
            <a href='mailto:m@administraktor.com' className='hover:text-primary underline underline-offset-2'>
              m@administraktor.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
