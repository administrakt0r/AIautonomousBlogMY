'use client'

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { SearchIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
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
import {
  nonFeaturedPosts,
  nonFeaturedPostsByCategory,
  nonFeaturedCategoryCounts,
  categoriesWithAll
} from '@/assets/data/blog-posts'
import { getSearchRegex } from '@/lib/search-utils'

import { POSTS_PER_PAGE } from './constants'
import { BlogGrid } from './blog-grid'
import { CategoryButton } from './category-button'
import { SearchInput } from './search-input'
import { Pagination } from './pagination'
import { ResultsSummary } from './results-summary'

// ⚡ Bolt: Use pre-calculated categories from the centralized data store.
const categories = categoriesWithAll

const Blog = () => {
  const [selectedTab, setSelectedTab] = useState('All')

  // ⚡ Bolt: Use a single state for the search query in the parent component.
  // The SearchInput component will handle the real-time typing state and notify us after debouncing.
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const searchInputRef = useRef<HTMLInputElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  // 🎨 Palette: Sync selectedTab with URL hash for shareable filtered views
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash

      if (hash.startsWith('#category-')) {
        const category = decodeURIComponent(hash.replace('#category-', ''))

        if (categories.includes(category)) {
          setSelectedTab(category)
          setCurrentPage(1)

          // 🎨 Palette: Scroll to categories section when a category hash is detected
          // ⚡ Bolt: Use ref instead of document.getElementById for better performance and idiomatic React.
          sectionRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
      } else if (hash === '#categories' || hash === '#home') {
        setSelectedTab('All')
        setSearchQuery('')
        setCurrentPage(1)
      }
    }

    // Initial check
    handleHashChange()

    window.addEventListener('hashchange', handleHashChange)

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const router = useRouter()

  // ⚡ Bolt: Pre-normalize the search query once in the parent to avoid redundant operations in children.
  const trimmedQuery = useMemo(() => searchQuery.trim(), [searchQuery])

  // ⚡ Bolt: Memoize filteredPosts based on tab and debounced search query.
  // We use the pre-calculated nonFeaturedPostsByCategory Map for O(1) category retrieval when no search is active.
  // ⚡ Bolt: Perform dynamic search matching on title and description to avoid the overhead
  // of storing pre-calculated lowercase fields for every post in the bundle.
  const filteredPosts = useMemo(() => {
    if (!trimmedQuery) {
      return selectedTab === 'All' ? nonFeaturedPosts : (nonFeaturedPostsByCategory.get(selectedTab) ?? [])
    }

    const basePosts = selectedTab === 'All' ? nonFeaturedPosts : (nonFeaturedPostsByCategory.get(selectedTab) ?? [])

    // ⚡ Bolt: Use regex.test() for faster matching and to avoid the large string allocations
    // caused by .toLowerCase().includes() on every keystroke.
    const regex = getSearchRegex(trimmedQuery)

    if (!regex) return basePosts

    return basePosts.filter(post => regex.test(post.title) || regex.test(post.description))
  }, [selectedTab, trimmedQuery])

  const totalPages = useMemo(() => Math.ceil(filteredPosts.length / POSTS_PER_PAGE), [filteredPosts.length])

  const paginatedPosts = useMemo(
    () => filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE),
    [filteredPosts, currentPage]
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

      // 🎨 Palette: Scroll to categories section when a tab is changed (especially useful when clicking from a BlogCard)
      // ⚡ Bolt: Use ref instead of document.getElementById for better performance and idiomatic React.
      sectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    },
    [router]
  )

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)

    // ⚡ Bolt: Use ref instead of document.getElementById for better performance and idiomatic React.
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }, [])

  return (
    <section ref={sectionRef} className='scroll-mt-20 py-8 sm:py-16 lg:py-24' id='categories'>
      <div className='mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:space-y-16 lg:px-8'>
        {/* Header */}
        <div className='space-y-4'>
          {selectedTab === 'All' && !searchQuery && <p className='text-sm font-medium'>Blogs</p>}
          {(selectedTab !== 'All' || searchQuery) && (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <BreadcrumbLink
                        asChild
                        onClick={() => {
                          setSelectedTab('All')
                          setSearchQuery('')
                          setCurrentPage(1)

                          // 🎨 Palette: Refocus search input after clearing all filters
                          searchInputRef.current?.focus()
                        }}
                      >
                        <Link href='/#categories'>Blog</Link>
                      </BreadcrumbLink>
                    </TooltipTrigger>
                    <TooltipContent side='bottom'>Clear all filters and view all stories</TooltipContent>
                  </Tooltip>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {selectedTab !== 'All' && (
                  <>
                    <BreadcrumbItem>
                      {searchQuery ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <BreadcrumbLink
                              asChild
                              onClick={() => {
                                setSearchQuery('')
                                setCurrentPage(1)

                                // 🎨 Palette: Refocus search input after clearing search query
                                searchInputRef.current?.focus()
                              }}
                            >
                              <Link href={`/#category-${encodeURIComponent(selectedTab)}`}>{selectedTab}</Link>
                            </BreadcrumbLink>
                          </TooltipTrigger>
                          <TooltipContent side='bottom'>Clear search and view all in {selectedTab}</TooltipContent>
                        </Tooltip>
                      ) : (
                        <BreadcrumbPage>{selectedTab}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {searchQuery && <BreadcrumbSeparator />}
                  </>
                )}
                {searchQuery && (
                  <BreadcrumbItem>
                    <BreadcrumbPage>Search: {searchQuery}</BreadcrumbPage>
                  </BreadcrumbItem>
                )}
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
                    count={nonFeaturedCategoryCounts[category] || 0}
                    onClick={handleTabChange}
                  />
                ))}
              </div>
              <ScrollBar orientation='horizontal' />
            </ScrollArea>

            <SearchInput ref={searchInputRef} initialValue={searchQuery} onSearchChange={handleSearchChange} />
          </div>
          <ResultsSummary
            filteredCount={filteredPosts.length}
            currentPage={currentPage}
            selectedTab={selectedTab}
            searchQuery={searchQuery}
          />

          {/* Posts Grid */}
          {paginatedPosts.length > 0 ? (
            <div className='space-y-12'>
              <BlogGrid
                posts={paginatedPosts}
                onCategoryClick={handleTabChange}
                trimmedQuery={trimmedQuery}
              />

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              )}
            </div>
          ) : (
            <div className='group flex flex-col items-center justify-center py-20 text-center'>
              <div className='bg-muted mb-4 flex size-16 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110'>
                <SearchIcon className='text-muted-foreground size-8' aria-hidden='true' />
              </div>
              <h3 className='text-xl font-medium'>No stories found</h3>

              <p className='text-muted-foreground mt-2 max-w-xs'>
                We couldn&apos;t find any articles matching your search or filters.
              </p>
              <Button
                variant='link'
                className='mt-4'
                aria-label='Clear all filters and show all stories'
                onClick={() => {
                  setSelectedTab('All')
                  setSearchQuery('')

                  // 🎨 Palette: Refocus search input after clearing all filters
                  searchInputRef.current?.focus()
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
