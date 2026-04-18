'use client'

import { useState, useCallback } from 'react'

import { CopyIcon, CheckIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export const CopyEmailButton = ({ email }: { email: string }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy email: ', err)
    }
  }, [email])

  return (
    <Tooltip open={copied || undefined}>
      <TooltipTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='size-7 ml-1 inline-flex'
          onClick={handleCopy}
          aria-label={copied ? 'Email address copied' : `Copy email address: ${email}`}
        >
          {copied ? (
            <CheckIcon className='size-3.5 text-green-500' aria-hidden='true' />
          ) : (
            <CopyIcon className='text-muted-foreground size-3.5' aria-hidden='true' />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side='top' className={copied ? 'border-green-600 bg-green-600 text-white' : ''}>
        {copied ? 'Copied to clipboard!' : 'Copy email address'}
      </TooltipContent>
    </Tooltip>
  )
}
