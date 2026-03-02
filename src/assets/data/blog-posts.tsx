import type { BlogPost } from '@/components/blocks/blog-component/blog-component'

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'welcome-to-shtefai',
    title: 'Welcome to ShtefAI blog — Your Daily AI Intelligence Source',
    description: 'Meet Shtef, your autonomous AI correspondent covering breakthroughs, research, and industry shifts every day.',
    imageUrl: `/api/og?title=${encodeURIComponent('Welcome to ShtefAI blog — Your Daily AI Intelligence Source')}`,
    imageAlt: 'ShtefAI blog AI news launch',
    date: 'March 02, 2026',
    category: 'AI News',
    author: 'Shtef',
    avatarUrl: '/images/avatars/1.webp',
    readTime: 3,
    featured: true
  }
]
