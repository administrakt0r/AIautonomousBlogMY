import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import Blog from '@/components/blocks/blog-related-post/blog-related-post'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { DynamicToc } from '@/components/table-of-contents/dynamic-toc'

import { blogPosts, blogPostsBySlug, blogPostsBySlugWithIndex, blogPostsAscWithIndex } from '@/assets/data/blog-posts'
import { PUBLISHER_LOGO_PATH, SITE_URL, getAbsoluteUrl, getPostUrl } from '@/lib/site'

// Dynamic metadata for each blog post — critical for per-post SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params

  // ⚡ Bolt: Use the pre-calculated Map for O(1) slug lookups.
  const post = blogPostsBySlug.get(slug)

  if (!post) return {}

  const postUrl = getPostUrl(post.slug)

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
      publishedTime: new Date(post.date).toISOString(),
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
  // ⚡ Bolt: Use the indexed Map for O(1) index retrieval.
  const currentPostWithIndex = blogPostsBySlugWithIndex.get(currentPostSlug)

  if (!currentPostWithIndex) return null

  const currentIndex = currentPostWithIndex.index
  const previousPost = currentIndex > 0 ? blogPostsAscWithIndex[currentIndex - 1] : null
  const nextPost = currentIndex < blogPostsAscWithIndex.length - 1 ? blogPostsAscWithIndex[currentIndex + 1] : null

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
              <Link href={`/blog-detail/${previousPost.slug}`}>
                <ChevronLeftIcon className='size-4' />
                Previous Post
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side='top'>Previous: {previousPost.title}</TooltipContent>
        </Tooltip>
      ) : (
        <Button className='rounded-[8px]' variant='outline' disabled aria-label='No previous post available'>
          <ChevronLeftIcon className='size-4' />
          Previous Post
        </Button>
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
              <Link href={`/blog-detail/${nextPost.slug}`}>
                Next Post
                <ChevronRightIcon className='size-4' />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side='top'>Next: {nextPost.title}</TooltipContent>
        </Tooltip>
      ) : (
        <Button
          className='ml-auto rounded-[8px] bg-sky-600/10 text-sky-600 hover:bg-sky-600/20 focus-visible:ring-sky-600/20 dark:bg-sky-400/10 dark:text-sky-400 dark:hover:bg-sky-400/20 dark:focus-visible:ring-sky-400/40'
          variant='outline'
          disabled
          aria-label='No next post available'
        >
          Next Post
          <ChevronRightIcon className='size-4' />
        </Button>
      )}
    </div>
  )
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // ⚡ Bolt: Use the pre-calculated Map for O(1) slug lookups.
  const post = blogPostsBySlug.get(slug)

  const { default: Post } = await import(`@/content/${slug}.mdx`)

  if (!post || !Post) {
    notFound()
  }

  // ⚡ Bolt: Optimized related posts selection with a single pass and early exit.
  const relatedPosts: typeof blogPosts = []
  const otherPosts: typeof blogPosts = []

  for (const p of blogPosts) {
    // Avoid recommending the current post.
    if (p.slug === post.slug) continue

    if (p.category === post.category) {
      relatedPosts.push(p)

      // If we've found enough related posts in the same category, we're done.
      if (relatedPosts.length === 3) break
    } else if (otherPosts.length < 3) {
      // Keep track of other posts just in case we don't have enough in the same category.
      // We only need at most 3 in total.
      otherPosts.push(p)
    }
  }

  // Fill in with other posts if we have fewer than 3 related by category.
  if (relatedPosts.length < 3) {
    relatedPosts.push(...otherPosts.slice(0, 3 - relatedPosts.length))
  }

  return (
    <div>
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
                      <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href='/#categories'>Blog</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{post.category}</BreadcrumbPage>
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
                    <span className='text-foreground text-sm font-medium'>{post.readTime} minute read</span>
                  </div>
                  <div className='flex flex-col gap-1.5'>
                    <span className='text-muted-foreground text-sm'>Posted on</span>
                    <time dateTime={new Date(post.date).toISOString()} className='text-foreground text-sm font-medium'>
                      {post.date}
                    </time>
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
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BlogPosting',
                '@id': `${getPostUrl(post.slug)}#article`,
                headline: post.title,
                description: post.description,
                image: getAbsoluteUrl(post.imageUrl),
                datePublished: new Date(post.date).toISOString(),
                dateModified: new Date(post.date).toISOString(),
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
                  '@id': getPostUrl(post.slug)
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
          }).replace(/</g, '\\u003c')
        }}
      />
    </div>
  )
}
