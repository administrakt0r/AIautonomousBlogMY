'use client'

import React, { useState } from 'react'

import { UserIcon, MailIcon, PhoneIcon, CheckCircleIcon, Loader2Icon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const MAX_CHARS = 1000

/**
 * ⚡ Bolt: Static inputs extracted and memoized to prevent re-renders
 * when the 'message' state changes in the parent ContactForm.
 */
const StaticInputs = React.memo(() => {
  return (
    <>
      {/* Name Input */}
      <div className='space-y-2'>
        <Label htmlFor='username'>
          Your Name <span className='text-destructive'>*</span>
        </Label>
        <div className='relative'>
          <Input
            id='username'
            name='username'
            type='text'
            placeholder='Enter your name here...'
            className='peer h-10 pr-9'
            required
            aria-required='true'
          />
          <div className='text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 peer-disabled:opacity-50'>
            <UserIcon className='size-4' aria-hidden='true' />
          </div>
        </div>
      </div>

      {/* Email Input */}
      <div className='space-y-2'>
        <Label htmlFor='email'>
          Your Email <span className='text-destructive'>*</span>
        </Label>
        <div className='relative'>
          <Input
            id='email'
            name='email'
            type='email'
            placeholder='Enter your email here...'
            className='peer h-10 pr-9'
            required
            aria-required='true'
          />
          <div className='text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 peer-disabled:opacity-50'>
            <MailIcon className='size-4' aria-hidden='true' />
          </div>
        </div>
      </div>

      {/* Phone Number Input */}
      <div className='space-y-2'>
        <Label htmlFor='phone'>Phone Number</Label>
        <div className='relative'>
          <Input
            id='phone'
            name='phone'
            type='tel'
            placeholder='Enter your phone number here...'
            className='peer h-10 pr-9'
          />
          <div className='text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 peer-disabled:opacity-50'>
            <PhoneIcon className='size-4' aria-hidden='true' />
          </div>
        </div>
      </div>
    </>
  )
})

StaticInputs.displayName = 'StaticInputs'

/**
 * ⚡ Bolt: Submit button extracted and memoized to prevent re-renders
 * during typing, while still responding to the 'isSubmitting' state.
 */
const SubmitButton = React.memo(({ isSubmitting }: { isSubmitting: boolean }) => {
  return (
    <Button type='submit' size='lg' className='w-full text-base' disabled={isSubmitting}>
      {isSubmitting ? (
        <span className='flex items-center justify-center gap-2'>
          <Loader2Icon className='size-4 animate-spin' aria-hidden='true' />
          Sending...
        </span>
      ) : (
        'Send Your Message'
      )}
    </Button>
  )
})

SubmitButton.displayName = 'SubmitButton'

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div
        role='status'
        aria-live='polite'
        className='flex flex-col items-center justify-center space-y-4 py-8 text-center'
      >
        <div className='bg-primary/10 rounded-full p-3'>
          <CheckCircleIcon className='text-primary size-10' aria-hidden='true' />
        </div>
        <h3 className='text-2xl font-bold'>Message Sent!</h3>
        <p className='text-muted-foreground'>
          Thank you for reaching out. We&apos;ve received your message and will get back to you soon.
        </p>
        <Button onClick={() => setIsSubmitted(false)} variant='outline' className='mt-4'>
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form className='space-y-6' onSubmit={handleSubmit}>
      <StaticInputs />

      {/* Message Input */}
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <Label htmlFor='message'>
            Message <span className='text-destructive'>*</span>
          </Label>
          <span
            className={cn(
              'text-xs transition-colors',
              message.length >= MAX_CHARS ? 'text-destructive font-semibold' : 'text-muted-foreground'
            )}
            aria-label={`${message.length} of ${MAX_CHARS} characters used`}
            id='char-count'
          >
            {message.length} / {MAX_CHARS}
          </span>
        </div>
        <Textarea
          id='message'
          className='h-28 resize-none'
          placeholder='Enter your message'
          required
          aria-required='true'
          aria-describedby='char-count'
          value={message}
          onChange={e => setMessage(e.target.value.slice(0, MAX_CHARS))}
        />
        {/* 🎨 Palette: Visually hidden aria-live region to announce milestones */}
        <div className='sr-only' aria-live='polite'>
          {message.length >= MAX_CHARS && 'Character limit reached'}
          {message.length >= MAX_CHARS * 0.9 && message.length < MAX_CHARS && 'Approaching character limit'}
        </div>
      </div>

      <div aria-live='polite' role='status'>
        <SubmitButton isSubmitting={isSubmitting} />
      </div>
    </form>
  )
}

export default ContactForm
