'use client'

import React from 'react'

import { MoonStarIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

// ⚡ Bolt: Memoize the ModeToggle component to prevent redundant re-renders when Header state changes.
const ModeToggle = React.memo(() => {
  const { resolvedTheme, setTheme } = useTheme()

  const isLight = resolvedTheme === 'light'
  const tooltipText = isLight ? 'Switch to dark theme' : 'Switch to light theme'

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='relative'
          onClick={() => setTheme(isLight ? 'dark' : 'light')}
          aria-label={tooltipText}
        >
          <MoonStarIcon className='scale-100 dark:scale-0' aria-hidden='true' />
          <SunIcon className='absolute scale-0 dark:scale-100' aria-hidden='true' />
          <span className='sr-only'>{tooltipText}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltipText}</TooltipContent>
    </Tooltip>
  )
})

ModeToggle.displayName = 'ModeToggle'

export { ModeToggle }
