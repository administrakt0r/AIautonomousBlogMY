// Component Imports
import Image from 'next/image'

import { Card, CardContent } from '@/components/ui/card'
import { CTAForm } from '@/components/blocks/cta-section/cta-form'

/**
 * ⚡ Bolt: Optimized CTA as a Server Component.
 * By moving interactive logic to CTAForm, this entire section can now be
 * rendered on the server, improving performance and SEO.
 */
const CTA = () => {
  return (
    <section className='bg-muted scroll-mt-20 py-8 sm:py-16 lg:py-24' id='get-in-touch'>
      <div className='container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
        <Card className='shadow-none'>
          <CardContent>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
              {/* Left Column - Image */}
              <div className='relative h-64 overflow-hidden rounded-lg sm:h-80 lg:h-auto'>
                <Image
                  src='/images/cta.webp'
                  alt='A modern workspace with a laptop and creative tools, illustrating the professional insights provided by ShtefAI'
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
                    <CTAForm />
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
