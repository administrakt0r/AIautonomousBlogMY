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
const StaticInputs = React.memo(({ nameRef }: { nameRef: React.RefObject<HTMLInputElement | null> }) => {
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
            ref={nameRef}
            name='username'
            type='text'
            placeholder='Enter your name here...'
            className='peer h-10 pr-9'
            required
            aria-required='true'
            autoComplete='name'
          />
          <div className='text-muted-foreground peer-focus:text-primary pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 transition-colors peer-disabled:opacity-50'>
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
            autoComplete='email'
          />
          <div className='text-muted-foreground peer-focus:text-primary pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 transition-colors peer-disabled:opacity-50'>
            <MailIcon className='size-4' aria-hidden='true' />
          </div>
        </div>
      </div>

      {/* Phone Number Input */}
      <div className='space-y-2'>
        <Label htmlFor='phone'>
          Phone Number <span className='text-muted-foreground font-normal'>(optional)</span>
        </Label>
        <div className='relative'>
          <Input
            id='phone'
            name='phone'
            type='tel'
            placeholder='Enter your phone number here...'
            className='peer h-10 pr-9'
            autoComplete='tel'
          />
          <div className='text-muted-foreground peer-focus:text-primary pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 transition-colors peer-disabled:opacity-50'>
            <PhoneIcon className='size-4' aria-hidden='true' />
          </div>
        </div>
      </div>
    </>
  )
})

StaticInputs.displayName = 'StaticInputs'

/**
 * Message text area extracted and memoized with character counter and live region feedback.
 */
interface MessageInputProps {
  message: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const MessageInput = React.memo(({ message, onChange }: MessageInputProps) => {
  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-between'>
        <Label htmlFor='message'>
          Message <span className='text-destructive'>*</span>
        </Label>
        <span
          className={cn(
            'text-xs transition-colors',
            message.length >= MAX_CHARS
              ? 'text-destructive font-semibold'
              : message.length >= MAX_CHARS * 0.9
                ? 'text-amber-500 font-medium'
                : 'text-muted-foreground'
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
        onChange={onChange}
      />
      {/* 🎨 Palette: Visually hidden aria-live region to announce milestones */}
      <div className='sr-only' aria-live='polite'>
        {message.length >= MAX_CHARS && 'Character limit reached'}
        {message.length >= MAX_CHARS * 0.9 && message.length < MAX_CHARS && 'Approaching character limit'}
      </div>
    </div>
  )
})

MessageInput.displayName = 'MessageInput'

/**
 * ⚡ Bolt: Submit button extracted and memoized to prevent re-renders
 * during typing, while still responding to the 'isSubmitting' state.
 */
const SubmitButton = React.memo(({ isSubmitting = false }: { isSubmitting?: boolean }) => {
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

/**
 * Success state UI component displayed after form submission.
 */
interface SuccessStateProps {
  onReset: () => void
  headingRef: React.RefObject<HTMLHeadingElement | null>
}

const SuccessState = ({ onReset, headingRef }: SuccessStateProps) => {
  return (
    <div
      role='status'
      aria-live='polite'
      className='flex flex-col items-center justify-center space-y-4 py-8 text-center'
    >
      <div className='bg-primary/10 rounded-full p-3'>
        <CheckCircleIcon
          className='text-primary size-10 animate-in zoom-in-90 duration-300'
          aria-hidden='true'
        />
      </div>
      <h3 ref={headingRef} tabIndex={-1} className='text-2xl font-bold outline-none'>
        Message Sent!
      </h3>
      <p className='text-muted-foreground'>
        Thank you for reaching out. We&apos;ve received your message and will get back to you soon.
      </p>
      <Button onClick={onReset} variant='outline' className='mt-4'>
        Send another message
      </Button>
    </div>
  )
}

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [message, setMessage] = useState('')

  const nameInputRef = React.useRef<HTMLInputElement>(null)
  const successHeadingRef = React.useRef<HTMLHeadingElement>(null)

  // 🎨 Palette: Focus the success heading when the form is submitted to provide immediate feedback to screen readers
  React.useEffect(() => {
    if (isSubmitted) {
      successHeadingRef.current?.focus()
    }
  }, [isSubmitted])

  const handleReset = () => {
    setIsSubmitted(false)
    setMessage('')

    // 🎨 Palette: Programmatically refocus the first input field for better UX on re-entry
    setTimeout(() => {
      nameInputRef.current?.focus()
    }, 0)
  }

  /**
   * ⚡ Bolt: Removed artificial 1500ms blocking timeout in contact form submission.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value.slice(0, MAX_CHARS))
  }

  if (isSubmitted) {
    return <SuccessState onReset={handleReset} headingRef={successHeadingRef} />
  }

  return (
    <form className='space-y-6' onSubmit={handleSubmit}>
      <StaticInputs nameRef={nameInputRef} />
      <MessageInput message={message} onChange={handleMessageChange} />
      <div aria-live='polite' role='status'>
        <SubmitButton />
      </div>
    </form>
  )
}

export default ContactForm
