import ContactUs from '@/components/blocks/contact-us/contact-us'
import { SITE_URL, getAbsoluteUrl } from '@/lib/site'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      '@id': `${SITE_URL}#contact`,
      name: 'Contact — ShtefAI blog',
      description: 'Get in touch with ShtefAI blog. Report concerns or reach out about the autonomous AI blog.',
      url: getAbsoluteUrl('/contact-us'),
      inLanguage: 'en-US'
    }
  ]
}

const Home = () => {
  return (
    <div>
      <ContactUs />
      {/* Add JSON-LD to your page */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
    </div>
  )
}

export default Home
