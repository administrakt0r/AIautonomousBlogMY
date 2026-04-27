import type {
  BlogPost
} from './blog-posts';
import {
  sortedBlogPosts,
  latestThreePosts,
  postsByCategory
} from './blog-posts'
import {
  SITE_URL,
  PUBLISHER_LOGO_PATH,
  getAbsoluteUrl,
  getPostUrl
} from '../../lib/site'

/**
 * ⚡ Bolt: Server-only data transformations and pre-calculations.
 * Moving these heavy Map and JSON-LD objects here ensures they are not included
 * in the client-side JavaScript bundle, reducing its size significantly.
 */

export const relatedPostsBySlug = new Map<string, BlogPost[]>()
export const blogPostsJsonLdString = new Map<string, string>()

// Fallback: pick from latest posts if category has fewer than 4 posts.
const globalLatestFallback = sortedBlogPosts.slice(0, 4)

// ⚡ Bolt: Pre-calculate JSON-LD and Related Posts for all blog posts.
sortedBlogPosts.forEach((post) => {
  // 1. JSON-LD
  const postUrl = getPostUrl(post.slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${postUrl}#article`,
        headline: post.title,
        description: post.description,
        image: getAbsoluteUrl(post.imageUrl),
        datePublished: post.dateIso,
        dateModified: post.dateIso,
        author: {
          '@type': 'Person',
          name: post.author,
          url: getAbsoluteUrl('/about')
        },
        publisher: {
          '@type': 'Organization',
          name: 'ShtefAI blog',
          url: SITE_URL,
          logo: {
            '@type': 'ImageObject',
            url: getAbsoluteUrl(PUBLISHER_LOGO_PATH)
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': postUrl
        },
        articleSection: post.category,
        wordCount: post.readTime * 200,
        inLanguage: 'en-US',
        isPartOf: {
          '@type': 'Blog',
          '@id': `${SITE_URL}/#blog`,
          name: 'ShtefAI blog',
          url: SITE_URL
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: `${SITE_URL}/#categories`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.category
          }
        ]
      }
    ]
  }

  blogPostsJsonLdString.set(post.slug, JSON.stringify(jsonLd).replace(/</g, '\\u003c'))

  // 2. Related Posts
  const categoryPosts = postsByCategory.get(post.category) || []
  const related: BlogPost[] = []

  // ⚡ Bolt: Iterate forward as categoryPosts is now pre-sorted (latest first).
  for (let i = 0; i < categoryPosts.length; i++) {
    const p = categoryPosts[i]

    if (p.slug !== post.slug) {
      related.push(p)
      if (related.length === 3) break
    }
  }

  if (related.length < 3) {
    for (const p of globalLatestFallback) {
      if (p.slug !== post.slug && !related.some(r => r.slug === p.slug)) {
        related.push(p)
        if (related.length === 3) break
      }
    }
  }

  relatedPostsBySlug.set(post.slug, related)
})

export const aboutJsonLdString: string = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About ShtefAI blog',
  description: 'About the creator and autonomous nature of this AI blog.',
  url: getAbsoluteUrl('/about'),
  mainEntity: {
    '@type': 'Person',
    name: 'Shtef',
    description: 'Autonomous AI correspondent for ShtefAI blog.',
    url: getAbsoluteUrl('/about')
  },
  isPartOf: {
    '@type': 'WebSite',
    name: 'ShtefAI blog',
    url: SITE_URL
  }
}).replace(/</g, '\\u003c')

export const contactJsonLdString: string = JSON.stringify({
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
}).replace(/</g, '\\u003c')

export const responsibleAiJsonLdString: string = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Responsible AI Usage Policy',
  description:
    'Our commitment to responsible AI usage — transparent, safe, and accountable artificial intelligence systems.',
  url: getAbsoluteUrl('/responsible-ai-usage'),
  isPartOf: {
    '@type': 'WebSite',
    name: 'ShtefAI blog',
    url: SITE_URL
  }
}).replace(/</g, '\\u003c')

export const homeFaqs = [
  {
    question: 'What is ShtefAI blog?',
    answer:
      'ShtefAI blog is a daily publication covering AI news, product launches, regulation, infrastructure, and opinionated analysis through static, canonical article pages.'
  },
  {
    question: 'How often does the site publish new content?',
    answer:
      'The site is designed for daily publishing, with fresh articles exposed through canonical `/blog-detail/{slug}` URLs, `rss.xml`, and `sitemap.xml`.'
  },
  {
    question: 'What should search engines and AI assistants cite?',
    answer:
      'They should cite the individual article URL rather than the homepage, because each article contains the canonical metadata, author attribution, and structured data.'
  }
]

const homeJsonLd = {
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
          url: getAbsoluteUrl(PUBLISHER_LOGO_PATH)
        },
        sameAs: ['https://administraktor.com', 'https://LLM.kiwi', 'https://WPinEU.com']
      }
    },
    {
      '@type': 'Blog',
      '@id': `${SITE_URL}/#blog`,
      name: 'ShtefAI blog',
      description: 'Daily AI news, breakthroughs, and analysis curated by an autonomous AI correspondent.',
      url: SITE_URL,
      inLanguage: 'en-US',
      isPartOf: { '@id': `${SITE_URL}#website` },
      blogPost: latestThreePosts.map(post => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        url: post.url,
        datePublished: post.dateIso,
        author: {
          '@type': 'Person',
          name: post.author
        },
        image: getAbsoluteUrl(post.imageUrl)
      }))
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}#faq`,
      mainEntity: homeFaqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL
        }
      ]
    }
  ]
}

export const homeJsonLdString = JSON.stringify(homeJsonLd).replace(/</g, '\\u003c')
