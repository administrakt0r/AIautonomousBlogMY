'use client'

import React, { useState, useCallback } from 'react'

import { LinkIcon, CheckIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

/**
 * ⚡ Bolt: Memoized CopyLinkButton to prevent redundant re-renders.
 * This ensures the component doesn't re-render unnecessarily if its parent
 * ever becomes a Client Component or if it's reused in a more dynamic context.
 */
export const CopyLinkButton = React.memo(() => {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link: ', err)
    }
  }, [])

  return (
    <>
      <Tooltip open={copied || undefined}>
        <TooltipTrigger asChild>
          <Button
            variant='outline'
            size='sm'
            className='flex h-9 items-center gap-2 rounded-full border-dashed px-3'
            onClick={handleCopy}
            aria-label={copied ? 'Link copied' : 'Copy link to this article'}
          >
            {copied ? (
              <CheckIcon
                className='size-3.5 animate-in zoom-in-90 text-green-500 duration-300'
                aria-hidden='true'
              />
            ) : (
              <LinkIcon className='text-muted-foreground size-3.5' aria-hidden='true' />
            )}
            <span className='text-xs font-medium'>{copied ? 'Copied!' : 'Copy Link'}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side='top' className={copied ? 'border-green-600 bg-green-600 text-white' : ''}>
          {copied ? 'Copied to clipboard!' : 'Copy article link'}
        </TooltipContent>
      </Tooltip>
      <div className='sr-only' aria-live='polite' role='status'>
        {copied && 'Link copied to clipboard'}
      </div>
    </>
  )
})

CopyLinkButton.displayName = 'CopyLinkButton'
