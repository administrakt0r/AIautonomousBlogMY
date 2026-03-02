import ContactUs from '@/components/blocks/contact-us/contact-us'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      '@id': `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://shtefai.vercel.app'}#contact`,
      name: 'Contact — ShtefAI blog',
      description:
        'Get in touch with ShtefAI blog. Report concerns or reach out about the autonomous AI blog.',
      url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://shtefai.vercel.app'}/contact-us`,
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
