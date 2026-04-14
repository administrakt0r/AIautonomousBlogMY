import type { MetadataRoute } from 'next'

import { blogPosts, latestPostDateIso } from '@/assets/data/blog-posts'
import { SITE_URL, getPostUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: latestPostDateIso,
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: latestPostDateIso,
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: `${SITE_URL}/responsible-ai-usage`,
      lastModified: latestPostDateIso,
      changeFrequency: 'monthly',
      priority: 0.5
    }
  ]

  // Dynamic blog post routes
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map(post => ({
    url: getPostUrl(post.slug),
    lastModified: post.dateIso,
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))

  return [...staticRoutes, ...blogRoutes]
}
