import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    '',
    '/blog-detail/scaling-design-component-system',
    '/blog-detail/user-behavior-design',
    '/blog-detail/product-launch-checklist',
    '/blog-detail/empathy-driven-design',
    '/blog-detail/fast-apps-blueprint',
    '/blog-detail/product-kpis-tracking',
    '/blog-detail/ai-driven-workflows',
    '/blog-detail/scalable-code'
  ]

  return routes.map(route => ({
    url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}${route}`
  }))
}
