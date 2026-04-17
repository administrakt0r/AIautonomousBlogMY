import { contactJsonLdString } from '@/assets/data/blog-posts'
import ContactUs from '@/components/blocks/contact-us/contact-us'

const Home = () => {
  return (
    <div>
      <ContactUs />
      {/* Add JSON-LD to your page */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: contactJsonLdString
        }}
      />
    </div>
  )
}

export default Home
