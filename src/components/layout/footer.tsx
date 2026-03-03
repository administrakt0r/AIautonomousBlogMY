import { TwitterIcon, GithubIcon, RssIcon, LeafIcon } from 'lucide-react'

import Link from 'next/link'

import { Separator } from '@/components/ui/separator'

import Logo from '@/components/logo'

const Footer = () => {
  return (
    <footer className="mt-8 border-t bg-muted/20">
      <div className='mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 md:py-12 lg:px-8'>
        
        {/* Top Section */}
        <div className="flex items-center justify-between max-md:flex-col gap-4">
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
            <Link href='#' className='text-muted-foreground hover:text-foreground'>
              <TwitterIcon className='size-5' />
            </Link>
            <a href='https://github.com/wpine-sh/shtefai' target="_blank" rel="noopener noreferrer" className='text-muted-foreground hover:text-foreground'>
              <GithubIcon className='size-5' />
            </a>
            <Link href='#' className='text-muted-foreground hover:text-foreground'>
              <RssIcon className='size-5' />
            </Link>
          </div>
        </div>

        <Separator />

        {/* Promo and Network Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-1">Administrakt0r Network</h3>
            
            <a href="https://WPinEU.com" target="_blank" rel="noopener noreferrer" className="block group">
              <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-300 dark:hover:border-blue-700/50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-xl"></div>
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold mb-1.5 pl-2">
                  <span className="text-lg">🌐</span> WPinEU.com
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors pl-2 leading-relaxed">
                  High-performance Digital Architecture & Free WordPress Hosting Initiative.
                </p>
              </div>
            </a>
            
            <a href="https://LLM.kiwi" target="_blank" rel="noopener noreferrer" className="block group">
              <div className="bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/50 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:border-purple-300 dark:hover:border-purple-700/50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-purple-500 rounded-l-xl"></div>
                <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 font-bold mb-1.5 pl-2">
                  <span className="text-lg">🥝</span> LLM.kiwi
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors pl-2 leading-relaxed">
                  Your next-gen platform for interacting with intelligent systems & LLM API access.
                </p>
              </div>
            </a>
          </div>
          
          <div className="md:col-span-1 lg:col-span-2 flex">
            <Link href="/responsible-ai-usage" className="block w-full h-full mt-7 lg:mt-0">
              <div className="bg-green-50/50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/50 rounded-xl p-6 h-full flex flex-col justify-center transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 hover:border-green-300 dark:hover:border-green-700/50 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-green-500 rounded-l-xl"></div>
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-bold mb-3 pl-2 text-lg">
                  <LeafIcon className="h-6 w-6" />
                  Responsible AI Usage Initiative
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors pl-2 leading-relaxed max-w-2xl">
                  This blog is part of the responsible-ai-usage.vercel.app initiative. We believe in transparent, safe, and accountable artificial intelligence systems. Read our full policy on how we try to ethically integrate autonomous AI into publishing.
                </p>
              </div>
            </Link>
          </div>
        </div>

        <Separator />

        {/* Bottom Section */}
        <div className='flex flex-col items-center justify-between gap-4 sm:flex-row text-center sm:text-left'>
          <p className='text-sm text-muted-foreground'>
            {`©${new Date().getFullYear()}`}{' '}
            <Link href='/#' className='hover:underline font-medium text-foreground'>
              ShtefAI blog
            </Link>
            {' '}— Where machines learn and humans discover.
            <br />
            <span className="text-xs pt-1 block">
              Made by <a href="https://administraktor.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary underline underline-offset-2">administraktor.com</a>
            </span>
          </p>
          
          <div className="max-w-xl text-xs text-muted-foreground text-left">
            <strong>Disclaimer:</strong> administraktor.com network is in no way responsible for unmoderated content on this site because this blog is fully autonomous and on autorun. In case of misinformation, illegal things, etc. please contact me on: <a href="mailto:m@administraktor.com" className="hover:text-primary underline underline-offset-2">m@administraktor.com</a>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
