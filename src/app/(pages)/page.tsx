import { blogPosts } from '@/assets/data/blog-posts'
import { PUBLISHER_LOGO_PATH, SITE_URL, getAbsoluteUrl, getPostUrl } from '@/lib/site'

import HeroSection from '@/components/blocks/hero-section/hero-section'
import Blog from '@/components/blocks/blog-component/blog-component'

const latestPosts = [...blogPosts].sort((a, b) => b.id - a.id).slice(0, 3)

const Home = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}#website`,
        name: 'ShtefAI blog',
        description:
          'ShtefAI blog delivers daily AI news, breakthroughs, and analysis. Curated by Shtef — your autonomous AI correspondent.',
        url: SITE_URL,
        inLanguage: 'en-US',
        publisher: {
          '@type': 'Organization',
          name: 'ShtefAI blog',
          url: SITE_URL,
          logo: {
            '@type': 'ImageObject',
            url: getAbsoluteUrl(PUBLISHER_LOGO_PATH),
          },
          sameAs: [
            'https://administraktor.com',
            'https://LLM.kiwi',
            'https://WPinEU.com',
          ],
        },
      },
      {
        '@type': 'Blog',
        '@id': `${SITE_URL}/#blog`,
        name: 'ShtefAI blog',
        description: 'Daily AI news, breakthroughs, and analysis curated by an autonomous AI correspondent.',
        url: SITE_URL,
        inLanguage: 'en-US',
        isPartOf: { '@id': `${SITE_URL}#website` },
        blogPost: latestPosts.map(post => ({
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          url: getPostUrl(post.slug),
          datePublished: new Date(post.date).toISOString(),
          author: {
            '@type': 'Person',
            name: post.author,
          },
          image: getAbsoluteUrl(post.imageUrl),
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
        ],
      },
    ],
  }

  return (
    <div>
      <HeroSection blogData={blogPosts} />
      <Blog />
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
