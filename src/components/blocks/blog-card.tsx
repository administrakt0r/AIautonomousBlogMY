'use client'

import React from 'react'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import { ArrowRightIcon, CalendarDaysIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { BlogPost } from '@/assets/data/blog-posts'

interface BlogCardProps {
  post: BlogPost
  onCategoryClick?: (category: string) => void
}

/**
 * ⚡ Bolt: Memoized BlogCard component to prevent unnecessary re-renders.
 * Uses the stretched link pattern for accessibility and SEO.
 */
export const BlogCard = React.memo(({ post, onCategoryClick }: BlogCardProps) => {
  const router = useRouter()

  return (
    <Card className='group focus-within:ring-primary relative h-full overflow-hidden shadow-none transition-all duration-300 focus-within:ring-2 focus-within:ring-offset-2'>
      <CardContent className='space-y-3.5'>
        <div className='relative mb-6 aspect-[1200/630] overflow-hidden rounded-lg sm:mb-12'>
          <Image
            src={post.imageUrl}
            alt={post.imageAlt}
            fill
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            className='object-cover object-center transition-transform duration-300 group-hover:scale-105'
          />
        </div>
        <div className='flex items-center justify-between gap-2'>
          <div className='text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 text-sm'>
            <div className='flex items-center gap-1.5'>
              <CalendarDaysIcon className='size-4 shrink-0' />
              <span>{post.date}</span>
            </div>
            <span className='text-muted-foreground/50' aria-hidden='true'>
              •
            </span>
            <span>{post.readTime} min read</span>
          </div>
          <Badge
            asChild
            className='bg-primary/10 text-primary hover:bg-primary/20 relative z-10 rounded-full border-0 text-sm transition-colors'
          >
            <button
              type='button'
              aria-label={`Filter by ${post.category}`}
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()

                if (onCategoryClick) {
                  onCategoryClick(post.category)
                }

                router.push(`/#category-${post.category}`)
              }}
            >
              {post.category}
            </button>
          </Badge>
        </div>
        <h3 className='line-clamp-2 text-lg font-medium md:text-xl'>
          <Link
            href={`/blog-detail/${post.slug}`}
            className='after:absolute after:inset-0 after:z-0 hover:underline focus:outline-none'
          >
            {post.title}
          </Link>
        </h3>
        <p className='text-muted-foreground line-clamp-2'>{post.description}</p>
        <div className='flex items-center justify-between'>
          <span className='text-sm font-medium'>{post.author}</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size='icon'
                variant='outline'
                className='group-hover:bg-primary! bg-background text-foreground hover:bg-primary! hover:text-primary-foreground group-hover:text-primary-foreground relative z-10 border group-hover:border-transparent hover:border-transparent'
                asChild
              >
                <Link href={`/blog-detail/${post.slug}`}>
                  <ArrowRightIcon className='size-4 -rotate-45' />
                  <span className='sr-only'>Read more about: {post.title}</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Read Article</TooltipContent>
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  )
})

BlogCard.displayName = 'BlogCard'
