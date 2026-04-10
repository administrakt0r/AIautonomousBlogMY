'use client'

import React from 'react'

import { Badge } from '@/components/ui/badge'
import { BlogCard } from '@/components/blocks/blog-card'
import { latestThreePosts, type BlogPost } from '@/assets/data/blog-posts'

interface BlogProps {
  blogPosts?: BlogPost[]
}

const Blog = React.memo(({ blogPosts = latestThreePosts }: BlogProps) => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl space-y-16 px-4 py-8 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='space-y-4'>
          <Badge variant='outline'>Recommended</Badge>

          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
            Related Post{blogPosts.length !== 1 ? 's' : ''}
          </h2>

          <p className='text-muted-foreground text-lg md:text-xl'>
            Expand your knowledge with these hand-picked posts.
          </p>
        </div>

        {/* Tabs and Search */}
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {blogPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
})

Blog.displayName = 'BlogRelatedPost'

export default Blog
