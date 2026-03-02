import { TwitterIcon, GithubIcon, RssIcon } from 'lucide-react'

import Link from 'next/link'

import { Separator } from '@/components/ui/separator'

import Logo from '@/components/logo'

const Footer = () => {
  return (
    <footer>
      <div className='mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 max-md:flex-col sm:px-6 sm:py-6 md:gap-6 md:py-8 lg:px-8'>
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

      <div className='mx-auto flex max-w-7xl justify-center px-4 py-8 sm:px-6 lg:px-8'>
        <p className='flex items-center gap-1 text-center font-medium text-balance max-sm:flex-col'>
          <span>
            {`©${new Date().getFullYear()}`}{' '}
            <Link href='/#' className='hover:underline'>
              ShtefAI blog
            </Link>
          </span>
          <span> — Where machines learn and humans discover.</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer
