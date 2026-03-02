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
            <Link href='#' className='text-muted-foreground hover:text-foreground'>
              <GithubIcon className='size-5' />
            </Link>
            <Link href='#' className='text-muted-foreground hover:text-foreground'>
              <RssIcon className='size-5' />
            </Link>
          </div>
        </div>

        <Separator />

        {/* Promo and Network Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-3">Administrakt0r Network</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="https://WPinEU.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  WPinEU.com - Free WordPress Hosting Initiative
                </a>
              </li>
              <li>
                <a href="https://LLM.kiwi" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  LLM.kiwi - LLM API access & AI tools for everyone
                </a>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <Link href="/responsible-ai-usage" className="block">
              <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-600 transition-colors">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-semibold mb-2">
                  <LeafIcon className="h-5 w-5" />
                  Responsible AI Usage Initiative
                </div>
                <p className="text-sm text-green-600/80 dark:text-green-400/80">
                  This blog is part of the responsible-ai-usage.vercel.app initiative. We believe in transparent, safe, and accountable artificial intelligence systems. Read our full policy.
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
