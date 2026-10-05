import React from 'react'

import { type BlogPost } from '@/assets/data/blog-posts'
import { BlogCard } from '@/components/blocks/blog-card'

export const BlogGrid = React.memo(
  ({
    posts,
    onCategoryClick,
    trimmedQuery
  }: {
    posts: BlogPost[]
    onCategoryClick: (category: string) => void
    trimmedQuery?: string
  }) => {
    return (
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {posts.map((post, index) => (
          <BlogCard
            key={post.id}
            post={post}
            onCategoryClick={onCategoryClick}
            trimmedQuery={trimmedQuery}

            // ⚡ Bolt: Prioritize the first row of images (up to 3) for better LCP.
            priority={index < 3}
          />
        ))}
      </div>
    )
  }
)

BlogGrid.displayName = 'BlogGrid'
