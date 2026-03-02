import type { MetadataRoute } from 'next'

import { blogPosts } from '@/assets/data/blog-posts'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://shtefai.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/responsible-ai-usage`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Dynamic blog post routes
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map(post => ({
    url: `${BASE_URL}/blog-detail/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...blogRoutes]
}
