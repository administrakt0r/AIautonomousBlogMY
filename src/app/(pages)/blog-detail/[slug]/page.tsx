import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import Blog from '@/components/blocks/blog-related-post/blog-related-post'
import { ReadingProgressBar } from '@/components/blocks/reading-progress-bar'
import { BackToTop } from '@/components/blocks/back-to-top'
import { CopyLinkButton } from '@/components/blocks/copy-link-button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { DynamicToc } from '@/components/table-of-contents/dynamic-toc'

import { blogPosts, blogPostsBySlug } from '@/assets/data/blog-posts'
import { relatedPostsBySlug, blogPostsJsonLdString } from '@/assets/data/blog-posts-server'

// Dynamic metadata for each blog post — critical for per-post SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params

  // ⚡ Bolt: Use the pre-calculated Map for O(1) slug lookups.
  const post = blogPostsBySlug.get(slug)

  if (!post) return {}

  const postUrl = post.url

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: {
      canonical: `/blog-detail/${post.slug}`
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.dateIso,
      authors: [post.author],
      section: post.category,
      url: postUrl,
      siteName: 'ShtefAI blog',
      images: [
        {
          url: post.imageUrl,
          width: 1200,
          height: 630,
          alt: post.imageAlt
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.imageUrl]
    }
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return blogPosts.map(post => ({
    slug: post.slug
  }))
}

// Navigation component for previous/next posts
const PostNavigation = ({ currentPostSlug }: { currentPostSlug: string }) => {
  // ⚡ Bolt: Use the pre-calculated Map for O(1) slug lookup.
  const currentPost = blogPostsBySlug.get(currentPostSlug)

  if (!currentPost) return null

  const currentIndex = currentPost.index
  const previousPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null

  return (
    <div className='flex w-full justify-between'>
      {previousPost ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              asChild
              className='rounded-[8px]'
              variant='outline'
              aria-label={`Previous Post: ${previousPost.title}`}
            >
              <Link href={previousPost.url}>
                <ChevronLeftIcon className='size-4' aria-hidden='true' />
                Previous Post
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side='top'>Previous: {previousPost.title}</TooltipContent>
        </Tooltip>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className='inline-block'>
              <Button className='rounded-[8px]' variant='outline' disabled aria-label='No previous post available'>
                <ChevronLeftIcon className='size-4' aria-hidden='true' />
                Previous Post
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent side='top'>This is the first post</TooltipContent>
        </Tooltip>
      )}

      {nextPost ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              asChild
              className='ml-auto rounded-[8px] bg-sky-600/10 text-sky-600 hover:bg-sky-600/20 focus-visible:ring-sky-600/20 dark:bg-sky-400/10 dark:text-sky-400 dark:hover:bg-sky-400/20 dark:focus-visible:ring-sky-400/40'
              variant='outline'
              aria-label={`Next Post: ${nextPost.title}`}
            >
              <Link href={nextPost.url}>
                Next Post
                <ChevronRightIcon className='size-4' aria-hidden='true' />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side='top'>Next: {nextPost.title}</TooltipContent>
        </Tooltip>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className='inline-block'>
              <Button
                className='ml-auto rounded-[8px] bg-sky-600/10 text-sky-600 hover:bg-sky-600/20 focus-visible:ring-sky-600/20 dark:bg-sky-400/10 dark:text-sky-400 dark:hover:bg-sky-400/20 dark:focus-visible:ring-sky-400/40'
                variant='outline'
                disabled
                aria-label='No next post available'
              >
                Next Post
                <ChevronRightIcon className='size-4' aria-hidden='true' />
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent side='top'>This is the latest post</TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // ⚡ Bolt: Use the pre-calculated Map for O(1) slug lookups.
  const post = blogPostsBySlug.get(slug)

  if (!post) {
    notFound()
  }

  // ⚡ Bolt: Perform the dynamic import only after we've confirmed the post exists.
  const { default: Post } = await import(`@/content/${slug}.mdx`)

  if (!Post) {
    notFound()
  }

  // ⚡ Bolt: Use pre-calculated related posts from the data store for O(1) lookup.
  const relatedPosts = relatedPostsBySlug.get(slug) ?? []

  return (
    <div>
      <ReadingProgressBar />
      <BackToTop />
      <section className='py-8 sm:pt-16 sm:pb-24'>
        <div className='mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:space-y-16 lg:px-8'>
          <div className='gap-16 md:grid md:grid-cols-5 lg:grid-cols-7'>
            <div className='hidden md:col-span-2 md:block lg:col-span-2'>
              <DynamicToc />
            </div>

            <div className='space-y-12 md:col-span-3 lg:col-span-5'>
              <div className='space-y-6'>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <BreadcrumbLink asChild>
                            <Link href='/'>Home</Link>
                          </BreadcrumbLink>
                        </TooltipTrigger>
                        <TooltipContent side='bottom'>Back to home</TooltipContent>
                      </Tooltip>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <BreadcrumbLink asChild>
                            <Link href='/#categories'>Blog</Link>
                          </BreadcrumbLink>
                        </TooltipTrigger>
                        <TooltipContent side='bottom'>View all stories</TooltipContent>
                      </Tooltip>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <BreadcrumbLink asChild>
                            <Link href={`/#category-${encodeURIComponent(post.category)}`}>{post.category}</Link>
                          </BreadcrumbLink>
                        </TooltipTrigger>
                        <TooltipContent side='bottom'>View more in {post.category}</TooltipContent>
                      </Tooltip>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>

                <h1 className='text-foreground text-4xl font-semibold'>{post.title}</h1>

                <p className='text-muted-foreground text-xl'>{post.description}</p>

                <Separator />

                <div className='flex flex-wrap justify-between gap-4'>
                  <div className='flex flex-wrap items-center gap-3'>
                    <Avatar className='size-11.5'>
                      <AvatarImage src={post.avatarUrl} alt={post.author} />
                      <AvatarFallback className='text-xs'>
                        {post.author
                          .split(' ')
                          .map(n => n[0])
                          .join('')
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col gap-1'>
                      <span className='text-muted-foreground text-sm'>Written by</span>
                      <span className='text-foreground text-sm font-medium'>{post.author}</span>
                    </div>
                  </div>
                  <div className='flex flex-col gap-1.5'>
                    <span className='text-muted-foreground text-sm'>Read Time</span>
                    <span className='text-foreground text-sm font-medium'>
                      {post.readTime} minute{post.readTime === 1 ? '' : 's'} read
                    </span>
                  </div>
                  <div className='flex flex-col gap-1.5'>
                    <span className='text-muted-foreground text-sm'>Posted on</span>
                    <time dateTime={post.dateIso} className='text-foreground text-sm font-medium'>
                      {post.date}
                    </time>
                  </div>
                  <div className='flex flex-col items-start justify-center gap-1.5'>
                    <span className='text-muted-foreground text-sm'>Share</span>
                    <CopyLinkButton />
                  </div>
                </div>
              </div>

              <div className='relative aspect-[1200/630] w-full'>
                <Image
                  src={post.imageUrl}
                  alt={post.imageAlt}
                  fill
                  priority
                  sizes='(max-width: 1280px) 100vw, 1200px'
                  className='max-h-148 rounded-[8px] object-cover'
                />
              </div>

              <article id='content' className='space-y-12'>
                <Post />
              </article>

              <PostNavigation currentPostSlug={post.slug} />
            </div>
          </div>
        </div>
      </section>
      <Blog blogPosts={relatedPosts} />

      {/* Rich structured data for Google rich snippets */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: blogPostsJsonLdString.get(slug) ?? ''
        }}
      />
    </div>
  )
}
