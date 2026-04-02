import Image from 'next/image'

import { Card, CardContent } from '@/components/ui/card'

import ContactForm from '@/components/blocks/contact-us/contact-form'

const ContactUs = () => {
  return (
    <section className='bg-muted py-8 sm:py-16 lg:h-dvh lg:py-32'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-12 space-y-4 text-center sm:mb-16'>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>Get in touch with us for more information</h2>
          <p className='text-muted-foreground text-xl'>
            Contact us for inquiries or support we&apos;re here to help and ensure an exceptional experience.
          </p>
        </div>

        <Card className='border-none shadow-none'>
          <CardContent className='grid gap-12 md:grid-cols-4'>
            {/* Form Section */}
            <div className='md:col-span-2'>
              <ContactForm />
            </div>

            <div className='relative min-h-70 shadow-none md:col-span-2 lg:min-h-auto'>
              <Image
                src='/images/contact-us.webp'
                alt='Contact illustration'
                fill
                priority
                sizes='(max-width: 768px) 100vw, 50vw'
                className='rounded-xl border object-cover'
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default ContactUs
