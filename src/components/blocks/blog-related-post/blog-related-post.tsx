'use client'

import { ArrowRightIcon, CalendarDaysIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { blogPosts as allBlogPosts } from '@/assets/data/blog-posts'

interface BlogProps {
  blogPosts?: typeof allBlogPosts
}

const Blog = ({ blogPosts = allBlogPosts.slice(0, 3) }: BlogProps) => {
  const router = useRouter()

  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl space-y-16 px-4 py-8 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='space-y-4'>
          <Badge variant='outline'>Trending</Badge>

          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>Related Post</h2>

          <p className='text-muted-foreground text-lg md:text-xl'>
            Expand your knowledge with these hand-picked posts.
          </p>
        </div>

        {/* Tabs and Search */}
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {blogPosts.map(post => (
            <Card
              key={post.id}
              className='group h-full cursor-pointer overflow-hidden shadow-none transition-all duration-300'
              onClick={() => router.push(`/blog-detail/${post.slug}`)}
            >
              <CardContent className='space-y-3.5'>
                <div className='mb-6 overflow-hidden rounded-lg sm:mb-12'>
                  <Link href={`/blog-detail/${post.slug}`}>
                    <img
                      src={post.imageUrl}
                      alt={post.imageAlt}
                      className='h-59.5 w-full object-cover transition-transform duration-300 group-hover:scale-105'
                    />
                  </Link>
                </div>
                <div className='flex items-center justify-between gap-1.5'>
                  <div className='text-muted-foreground flex items-center gap-1.5'>
                    <CalendarDaysIcon className='size-5' />
                    <span>{post.date}</span>
                  </div>
                  <Badge
                    className='bg-primary/10 text-primary border-0 text-sm'
                    onClick={e => {
                      e.stopPropagation()
                      router.push(`/#category-${post.category}`)
                    }}
                  >
                    {post.category}
                  </Badge>
                </div>
                <h3 className='line-clamp-2 text-lg font-medium md:text-xl'>
                  <Link href={`/blog-detail/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className='text-muted-foreground line-clamp-2'>{post.description}</p>
                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium'>{post.author}</span>
                  <Button
                    size='icon'
                    className='group-hover:bg-primary! bg-background text-foreground hover:bg-primary! hover:text-primary-foreground group-hover:text-primary-foreground border group-hover:border-transparent hover:border-transparent'
                    asChild
                  >
                    <Link href={`/blog-detail/${post.slug}`}>
                      <ArrowRightIcon className='size-4 -rotate-45' />
                      <span className='sr-only'>Read more: {post.title}</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog
