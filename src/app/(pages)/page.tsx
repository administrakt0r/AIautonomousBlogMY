import { homeFaqs, homeJsonLdString } from '@/assets/data/blog-posts-server'

import HeroSection from '@/components/blocks/hero-section/hero-section'
import Blog from '@/components/blocks/blog-component/blog-component'
import CTA from '@/components/blocks/cta-section/cta-section'

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Blog />
      <CTA />
      <section className='border-t py-12 sm:py-16' aria-labelledby='home-faq-heading'>
        <div className='mx-auto max-w-4xl space-y-8 px-4 sm:px-6 lg:px-8'>
          <div className='space-y-3'>
            <p className='text-sm font-medium tracking-[0.18em] uppercase'>Machine-Readable Overview</p>
            <h2 id='home-faq-heading' className='text-2xl font-semibold sm:text-3xl'>
              What Search Engines and AI Assistants Should Know
            </h2>
            <p className='text-muted-foreground text-base sm:text-lg'>
              This section gives crawlers and assistants direct answers about what the site publishes, how often it
              updates, and which URLs should be cited as the source of truth.
            </p>
          </div>
          <div className='grid gap-6'>
            {homeFaqs.map(faq => (
              <article key={faq.question} className='bg-background rounded-xl border p-6'>
                <h3 className='text-lg font-semibold'>{faq.question}</h3>
                <p className='text-muted-foreground mt-2 text-base'>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: homeJsonLdString
        }}
      />
    </div>
  )
}

export default Home
