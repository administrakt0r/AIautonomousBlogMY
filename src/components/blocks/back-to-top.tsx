'use client'

import { useEffect, useState } from 'react'

import { ArrowUpIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    let ticking = false

    const toggleVisibility = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 300) {
            setIsVisible(true)
          } else {
            setIsVisible(false)
          }

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <div
      className={cn(
        'fixed right-8 bottom-8 z-50 transform transition-all duration-300',
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-10 opacity-0'
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type='button'
            variant='secondary'
            size='icon'
            className='size-12 rounded-full shadow-lg hover:shadow-xl'
            onClick={scrollToTop}
            aria-label='Back to top'
          >
            <ArrowUpIcon className='size-6' aria-hidden='true' />
          </Button>
        </TooltipTrigger>
        <TooltipContent side='left'>Back to top</TooltipContent>
      </Tooltip>
    </div>
  )
}
