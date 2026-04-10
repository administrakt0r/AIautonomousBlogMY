'use client'

import React, { useState, useMemo, useCallback, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { SearchIcon, XIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
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
import { BlogCard } from '@/components/blocks/blog-card'

// Import the blog posts data from centralized location
import {
  sortedNonFeaturedPosts,
  nonFeaturedPostsByCategory,
  categoriesWithAll,
  type BlogPost
} from '@/assets/data/blog-posts'

// ⚡ Bolt: Use pre-sorted non-featured posts from the centralized data store.
const nonFeaturedPosts = sortedNonFeaturedPosts

// ⚡ Bolt: Use pre-calculated categories from the centralized data store.
const categories = categoriesWithAll

const POSTS_PER_PAGE = 9

const BlogGrid = React.memo(
  ({ posts, onCategoryClick }: { posts: BlogPost[]; onCategoryClick: (category: string) => void }) => {
    return (
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {posts.map(post => (
          <BlogCard key={post.id} post={post} onCategoryClick={onCategoryClick} />
        ))}
      </div>
    )
  }
)

BlogGrid.displayName = 'BlogGrid'

// ⚡ Bolt: Extract and memoize the category button to prevent all buttons from re-rendering when the active tab changes.
// Only the button that was selected and the one being newly selected will re-render.
const CategoryButton = React.memo(
  ({
    category,
    isSelected,
    onClick
  }: {
    category: string
    isSelected: boolean
    onClick: (category: string) => void
  }) => {
    return (
      <Button
        type='button'
        variant={isSelected ? 'secondary' : 'ghost'}
        size='sm'
        onClick={() => onClick(category)}
        className={`h-9 px-4 text-base ${isSelected ? 'bg-background shadow-sm' : ''}`}
      >
        {category}
      </Button>
    )
  }
)

CategoryButton.displayName = 'CategoryButton'

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

  // ⚡ Bolt: Memoize filteredPosts based on tab and debounced search query.
  // We use the pre-calculated nonFeaturedPostsByCategory Map for O(1) category retrieval when no search is active.
  const filteredPosts = useMemo(() => {
    const lowerQuery = debouncedSearchQuery.toLowerCase()

    if (!lowerQuery) {
      return selectedTab === 'All' ? nonFeaturedPosts : (nonFeaturedPostsByCategory.get(selectedTab) ?? [])
    }

    const basePosts = selectedTab === 'All' ? nonFeaturedPosts : (nonFeaturedPostsByCategory.get(selectedTab) ?? [])

    return basePosts.filter(
      post => post.title.toLowerCase().includes(lowerQuery) || post.description.toLowerCase().includes(lowerQuery)
    )
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
                  <CategoryButton
                    key={category}
                    category={category}
                    isSelected={selectedTab === category}
                    onClick={handleTabChange}
                  />
                ))}
              </div>
              <ScrollBar orientation='horizontal' />
            </ScrollArea>

            <div className='relative max-md:w-full'>
              <Label htmlFor='blog-search' className='sr-only'>
                Search articles
              </Label>
              <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
                <SearchIcon className='size-4' aria-hidden='true' />
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
                      <XIcon className='size-4' aria-hidden='true' />
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
                        <ChevronLeftIcon className='size-4' aria-hidden='true' />
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
                        <ChevronRightIcon className='size-4' aria-hidden='true' />
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
                <SearchIcon className='text-muted-foreground size-8' aria-hidden='true' />
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
