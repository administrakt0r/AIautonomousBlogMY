'use client'

import { useState, useRef, useEffect } from 'react'

import { Loader2Icon, CheckCircleIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

/**
 * ⚡ Bolt: Extracted interactive form logic into a dedicated Client Component.
 * This allows the parent CTA component to be a Server Component, reducing
 * the amount of client-side JavaScript required for the initial render.
 */
export const CTAForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const emailInputRef = useRef<HTMLInputElement>(null)
  const successMessageRef = useRef<HTMLDivElement>(null)

  // 🎨 Palette: Focus the success message when the user subscribes to provide immediate feedback
  useEffect(() => {
    if (isSubscribed) {
      successMessageRef.current?.focus()
    }
  }, [isSubscribed])

  const handleReset = () => {
    setIsSubscribed(false)
    setTimeout(() => {
      emailInputRef.current?.focus()
    }, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubscribed(true)
  }

  return (
    <div aria-live='polite' role='status'>
      {isSubscribed ? (
        <div
          ref={successMessageRef}
          tabIndex={-1}
          className='flex flex-col items-start gap-2 py-3 outline-none'
        >
          <div className='flex items-center gap-2 text-green-600 dark:text-green-400'>
            <CheckCircleIcon
              className='size-5 animate-in zoom-in-90 duration-300'
              aria-hidden='true'
            />
            <span className='font-medium'>Thanks for subscribing! Check your inbox soon.</span>
          </div>
          <Button onClick={handleReset} variant='link' className='h-auto p-0 text-sm'>
            Subscribe with another email
          </Button>
        </div>
      ) : (
        <form className='gap-3 py-1 max-sm:space-y-2 sm:flex sm:flex-row' onSubmit={handleSubmit}>
          <Label htmlFor='cta-email' className='sr-only'>
            Email Address
          </Label>
          <Input
            id='cta-email'
            ref={emailInputRef}
            name='email'
            type='email'
            placeholder='Your email'
            className='bg-background h-10 flex-1 text-base'
            required
            disabled={isSubmitting}
            autoComplete='email'
          />
          <Button size='lg' className='text-base max-sm:w-full' type='submit' disabled={isSubmitting}>
            {isSubmitting ? (
              <span className='flex items-center justify-center'>
                <Loader2Icon className='mr-2 size-4 animate-spin' aria-hidden='true' />
                Subscribing...
              </span>
            ) : (
              'Subscribe'
            )}
          </Button>
        </form>
      )}
    </div>
  )
}
