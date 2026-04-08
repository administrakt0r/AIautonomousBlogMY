'use client'

import React, { useState, useMemo, useCallback, useEffect } from 'react'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

import Image from 'next/image'
import { SearchIcon, ArrowRightIcon, CalendarDaysIcon, XIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

// Import the blog posts data from centralized location
import { sortedNonFeaturedPosts, categoriesWithAll, type BlogPost } from '@/assets/data/blog-posts'

// ⚡ Bolt: Use pre-sorted non-featured posts from the centralized data store.
const nonFeaturedPosts = sortedNonFeaturedPosts

// ⚡ Bolt: Use pre-calculated categories from the centralized data store.
const categories = categoriesWithAll

const POSTS_PER_PAGE = 9

const BlogGrid = React.memo(
  ({ posts, onCategoryClick }: { posts: BlogPost[]; onCategoryClick: (category: string) => void }) => {
    const router = useRouter()

    return (
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {posts.map(post => (
          <Card
            key={post.id}
            className='group focus-within:ring-primary relative h-full overflow-hidden shadow-none transition-all duration-300 focus-within:ring-2 focus-within:ring-offset-2'
          >
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
                      onCategoryClick(post.category)
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }
)

BlogGrid.displayName = 'BlogGrid'

const Blog = () => {
  const [selectedTab, setSelectedTab] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  // ⚡ Bolt: Debounce search query to reduce the frequency of filtering operations and re-renders
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 300)

    return () => {
      clearTimeout(handler)
    }
  }, [searchQuery])

  // 🎨 Palette: Sync selectedTab with URL hash for shareable filtered views
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash

      if (hash.startsWith('#category-')) {
        const category = decodeURIComponent(hash.replace('#category-', ''))

        if (categories.includes(category)) {
          setSelectedTab(category)
          setCurrentPage(1)
        }
      } else if (hash === '#categories' || hash === '#home') {
        setSelectedTab('All')
      }
    }

    // Initial check
    handleHashChange()

    window.addEventListener('hashchange', handleHashChange)

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const router = useRouter()

  // ⚡ Bolt: Memoize filteredPosts based on tab and debounced search query
  const filteredPosts = useMemo(() => {
    const lowerQuery = debouncedSearchQuery.toLowerCase()

    return nonFeaturedPosts.filter(post => {
      const matchesCategory = selectedTab === 'All' || post.category === selectedTab

      const matchesSearch =
        post.title.toLowerCase().includes(lowerQuery) || post.description.toLowerCase().includes(lowerQuery)

      return matchesCategory && matchesSearch
    })
  }, [selectedTab, debouncedSearchQuery])

  const totalPages = useMemo(() => Math.ceil(filteredPosts.length / POSTS_PER_PAGE), [filteredPosts.length])

  const paginatedPosts = useMemo(
    () => filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE),
    [filteredPosts, currentPage]
  )

  const resultsSummary = useMemo(
    () =>
      filteredPosts.length === 0
        ? 'No stories match your current search and filters.'
        : `Showing ${paginatedPosts.length} of ${filteredPosts.length} ${
            filteredPosts.length === 1 ? 'story' : 'stories'
          }${selectedTab !== 'All' ? ` in ${selectedTab}` : ''}${
            debouncedSearchQuery ? ` for "${debouncedSearchQuery}"` : ''
          }.`,
    [filteredPosts.length, paginatedPosts.length, selectedTab, debouncedSearchQuery]
  )

  const handleTabChange = useCallback(
    (tab: string) => {
      setCurrentPage(1)
      setSelectedTab(tab)

      // 🎨 Palette: Update hash to make filtered view shareable
      if (tab === 'All') {
        router.push('#categories')
      } else {
        router.push(`#category-${encodeURIComponent(tab)}`)
      }
    },
    [router]
  )

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    const element = document.getElementById('categories')

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <section className='py-8 sm:py-16 lg:py-24' id='categories'>
      <div className='mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:space-y-16 lg:px-8'>
        {/* Header */}
        <div className='space-y-4'>
          {selectedTab === 'All' && !searchQuery && <p className='text-sm'>Blogs</p>}
          {(selectedTab !== 'All' || searchQuery) && (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href='#'
                    onClick={e => {
                      e.preventDefault()
                      setSelectedTab('All')
                      setSearchQuery('')
                    }}
                  >
                    Blog
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{searchQuery ? `Search: ${searchQuery}` : selectedTab}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          )}

          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>AI Stories That Shape Tomorrow.</h2>

          <p className='text-muted-foreground text-lg md:text-xl'>
            Daily AI breakthroughs, research, and industry shifts — curated by Shtef.
          </p>
        </div>

        {/* Tabs and Search */}
        <div className='flex flex-col gap-8 lg:gap-16'>
          <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
            <ScrollArea className='bg-muted w-full rounded-lg sm:w-auto'>
              <div className='flex p-1'>
                {categories.map(category => (
                  <Button
                    key={category}
                    type='button'
                    variant={selectedTab === category ? 'secondary' : 'ghost'}
                    size='sm'
                    onClick={() => handleTabChange(category)}
                    className={`h-9 px-4 text-base ${selectedTab === category ? 'bg-background shadow-sm' : ''}`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation='horizontal' />
            </ScrollArea>

            <div className='relative max-md:w-full'>
              <Label htmlFor='blog-search' className='sr-only'>
                Search articles
              </Label>
              <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
                <SearchIcon className='size-4' />
                <span className='sr-only'>Search</span>
              </div>
              <Input
                id='blog-search'
                type='text'
                placeholder='Search articles by title or summary'
                value={searchQuery}
                aria-describedby='blog-results-summary'
                onChange={e => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className='peer h-10 px-9'
              />
              {searchQuery && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type='button'
                      aria-label='Clear search'
                      onClick={() => {
                        setSearchQuery('')
                        setCurrentPage(1)
                      }}
                      className='text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 flex items-center justify-center pr-3'
                    >
                      <XIcon className='size-4' />
                      <span className='sr-only'>Clear search</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Clear search</TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
          <p id='blog-results-summary' className='text-muted-foreground text-sm' aria-live='polite'>
            {resultsSummary}
          </p>

          {/* Posts Grid */}
          {paginatedPosts.length > 0 ? (
            <div className='space-y-12'>
              <BlogGrid posts={paginatedPosts} onCategoryClick={handleTabChange} />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className='flex items-center justify-center gap-2 pt-8'>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type='button'
                        variant='outline'
                        size='icon'
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeftIcon className='size-4' />
                        <span className='sr-only'>Previous page</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Previous page</TooltipContent>
                  </Tooltip>

                  <div className='flex items-center gap-1'>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        type='button'
                        variant={currentPage === page ? 'default' : 'outline'}
                        size='icon'
                        onClick={() => handlePageChange(page)}
                        className='hidden sm:flex'
                        aria-label={`Go to page ${page}`}
                        aria-current={currentPage === page ? 'page' : undefined}
                      >
                        {page}
                      </Button>
                    ))}
                    <span className='text-muted-foreground mx-2 text-sm sm:hidden'>
                      Page {currentPage} of {totalPages}
                    </span>
                  </div>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type='button'
                        variant='outline'
                        size='icon'
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRightIcon className='size-4' />
                        <span className='sr-only'>Next page</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Next page</TooltipContent>
                  </Tooltip>
                </div>
              )}
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center py-20 text-center'>
              <div className='bg-muted mb-4 flex size-16 items-center justify-center rounded-full'>
                <SearchIcon className='text-muted-foreground size-8' />
              </div>
              <h3 className='text-xl font-medium'>No stories found</h3>

              <p className='text-muted-foreground mt-2 max-w-xs'>
                We couldn&apos;t find any articles matching your search or filters.
              </p>
              <Button
                variant='link'
                className='mt-4'
                onClick={() => {
                  setSelectedTab('All')
                  setSearchQuery('')
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Blog
