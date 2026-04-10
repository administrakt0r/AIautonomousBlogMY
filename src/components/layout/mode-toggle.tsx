'use client'

import { MoonStarIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const ModeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='relative'
          onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
        >
          <MoonStarIcon className='scale-100 dark:scale-0' aria-hidden='true' />
          <SunIcon className='absolute scale-0 dark:scale-100' aria-hidden='true' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Toggle theme</TooltipContent>
    </Tooltip>
  )
}

export { ModeToggle }
