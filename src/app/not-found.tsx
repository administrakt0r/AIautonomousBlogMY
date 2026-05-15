'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { ChevronLeftIcon, ArrowRightIcon, SearchIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import Icon404 from '@/assets/svg/404'

const NotFound = () => {
  const router = useRouter()

  return (
    <div
      id='main-content'
      tabIndex={-1}
      className='flex h-screen w-screen flex-col items-center justify-center gap-9 p-6 outline-none'
    >
      <Icon404 className='h-auto w-full sm:h-120 sm:w-146' aria-hidden='true' />
      <div className='flex flex-col items-center gap-4 text-center'>
        <p className='text-muted-foreground text-xl sm:text-2xl'>We couldn&apos;t find the page you are looking for</p>
        <div className='flex flex-wrap justify-center gap-4'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className='group rounded-full' variant='outline' onClick={() => router.back()}>
                <ChevronLeftIcon
                  className='mr-2 size-4 transition-transform duration-300 group-hover:-translate-x-0.5'
                  aria-hidden='true'
                />
                Go back
              </Button>
            </TooltipTrigger>
            <TooltipContent>Return to previous page</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button className='group rounded-full' asChild>
                <Link href='/'>
                  Back to Home
                  <ArrowRightIcon
                    className='ml-2 size-4 transition-transform duration-300 group-hover:translate-x-0.5'
                    aria-hidden='true'
                  />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Return to homepage</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button className='group rounded-full' variant='secondary' asChild>
                <Link href='/#categories'>
                  <SearchIcon
                    className='mr-2 size-4 transition-transform duration-300 group-hover:scale-110'
                    aria-hidden='true'
                  />
                  Explore Blog
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Browse all articles</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default NotFound
