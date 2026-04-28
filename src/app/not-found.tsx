'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

import Icon404 from '@/assets/svg/404'

const NotFound = () => {
  const router = useRouter()

  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center gap-9 p-6'>
      <Icon404 className='h-auto w-full sm:h-120 sm:w-146' />
      <div className='flex flex-col items-center gap-4 text-center'>
        <p className='text-muted-foreground text-xl sm:text-2xl'>We couldn&apos;t find the page you are looking for</p>
        <div className='flex flex-wrap justify-center gap-4'>
          <Button className='rounded-full' variant='outline' onClick={() => router.back()}>
            Go back
          </Button>
          <Button className='rounded-full' asChild>
            <Link href='/'>Back to Home</Link>
          </Button>
          <Button className='rounded-full' variant='secondary' asChild>
            <Link href='/#categories'>Explore Blog</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
