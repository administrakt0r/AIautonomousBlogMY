'use client'

// Component Imports
import { useState } from 'react'

import Image from 'next/image'
import { Loader2Icon, CheckCircleIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const CTA = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubscribed(true)
  }

  return (
    <section className='bg-muted py-8 sm:py-16 lg:py-24' id='get-in-touch'>
      <div className='container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
        <Card className='shadow-none'>
          <CardContent>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
              {/* Left Column - Image */}
              <div className='relative h-64 overflow-hidden rounded-lg sm:h-80 lg:h-auto'>
                <Image
                  src='/images/cta.webp'
                  alt='Workspace with laptop'
                  fill
                  sizes='(max-width: 1024px) 100vw, 50vw'
                  className='object-cover'
                />
              </div>

              {/* Right Column - Content */}
              <Card className='bg-muted rounded-lg border-0 shadow-none'>
                <CardContent className='flex h-full flex-col justify-between gap-4'>
                  <h2 className='text-xl leading-tight font-semibold lg:text-2xl'>
                    Explore insights, stories, and strategies that help you build better products every day.
                  </h2>
                  <div>
                    <p className='text-muted-foreground mb-3 text-base'>
                      Join 1,000,000+ subscribers receiving expert tips on earning more, investing smarter and living
                      better, all in our free newsletter.
                    </p>
                    {/* Email Form */}
                    <div aria-live='polite' role='status'>
                      {isSubscribed ? (
                        <div className='flex items-center gap-2 py-3 text-green-600 dark:text-green-400'>
                          <CheckCircleIcon className='size-5' aria-hidden='true' />
                          <span className='font-medium'>Thanks for subscribing! Check your inbox soon.</span>
                        </div>
                      ) : (
                        <form className='gap-3 py-1 max-sm:space-y-2 sm:flex sm:flex-row' onSubmit={handleSubmit}>
                          <Label htmlFor='cta-email' className='sr-only'>
                            Email Address
                          </Label>
                          <Input
                            id='cta-email'
                            type='email'
                            placeholder='Your email'
                            className='bg-background h-10 flex-1 text-base'
                            required
                            disabled={isSubmitting}
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
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default CTA
