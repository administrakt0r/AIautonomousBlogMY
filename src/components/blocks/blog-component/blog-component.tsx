'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { SearchIcon, ArrowRightIcon, CalendarDaysIcon, XIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

// Import the blog posts data from centralized location
import { blogPosts, type BlogPost } from '@/assets/data/blog-posts'

// Simply use all blog posts since they already have correct slugs and correspond to existing pages
const getAvailableBlogPosts = () => {
  return blogPosts
}

const BlogGrid = ({ posts, onCategoryClick }: { posts: BlogPost[]; onCategoryClick: (category: string) => void }) => {
  const router = useRouter()

  const handleCardClick = (post: BlogPost) => {
    // Navigate to individual blog pages using the slug
    router.push(`/blog-detail/${post.slug}`)
  }

  return (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {posts.map(post => (
        <Card
          key={post.id}
          className='group h-full cursor-pointer overflow-hidden shadow-none transition-all duration-300'
          onClick={() => handleCardClick(post)}
        >
          <CardContent className='space-y-3.5'>
            <div className='mb-6 aspect-[1200/630] overflow-hidden rounded-lg sm:mb-12'>
              <img
                src={post.imageUrl}
                alt={post.imageAlt}
                loading='lazy'
                decoding='async'
                className='h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105'
              />
            </div>
            <div className='flex items-center justify-between gap-1.5'>
              <div className='text-muted-foreground flex items-center gap-1.5'>
                <CalendarDaysIcon className='size-5' />
                <span>{post.date}</span>
              </div>
              <Badge
                className='bg-primary/10 text-primary rounded-full border-0 text-sm'
                onClick={e => {
                  e.stopPropagation()
                  onCategoryClick(post.category)
                  router.push(`/#category-${post.category}`)
                }}
              >
                {post.category}
              </Badge>
            </div>
            <h3 className='line-clamp-2 text-lg font-medium md:text-xl'>{post.title}</h3>
            <p className='text-muted-foreground line-clamp-2'>{post.description}</p>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium'>{post.author}</span>
              <Button
                size='icon'
                className='group-hover:bg-primary! bg-background text-foreground hover:bg-primary! hover:text-primary-foreground group-hover:text-primary-foreground border group-hover:border-transparent hover:border-transparent'
              >
                <ArrowRightIcon className='size-4 -rotate-45' />
                <span className='sr-only'>Read more: {post.title}</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

const Blog = () => {
  const [selectedTab, setSelectedTab] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const POSTS_PER_PAGE = 9
  const router = useRouter()

  // Get only the blog posts that have corresponding pages
  const availableBlogPosts = getAvailableBlogPosts()

  // Filter out featured posts to avoid duplication with hero section
  // Sort posts by ID in descending order (newest first)
  const nonFeaturedPosts = availableBlogPosts.filter(post => !post.featured).sort((a, b) => b.id - a.id)

  // Dynamically generate categories from the available data
  const uniqueCategories = [...new Set(nonFeaturedPosts.map(post => post.category))]
  const categories = ['All', ...uniqueCategories.sort()]

  const filteredPosts = nonFeaturedPosts.filter(post => {
    const matchesCategory = selectedTab === 'All' || post.category === selectedTab

    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

  const paginatedPosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)

  const handleTabChange = (tab: string) => {
    setCurrentPage(1)

    setSelectedTab(tab)

    if (tab === 'All') {
      router.push('#categories')
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)

    const element = document.getElementById('categories')

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
              <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
                <SearchIcon className='size-4' />
                <span className='sr-only'>Search</span>
              </div>
              <Input
                type='text'
                placeholder='Search'
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className='peer h-10 px-9'
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setCurrentPage(1)
                  }}
                  className='text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 flex items-center justify-center pr-3'
                >
                  <XIcon className='size-4' />
                  <span className='sr-only'>Clear search</span>
                </button>
              )}
            </div>
          </div>

          {/* Posts Grid */}
          {paginatedPosts.length > 0 ? (
            <div className='space-y-12'>
              <BlogGrid posts={paginatedPosts} onCategoryClick={handleTabChange} />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className='flex items-center justify-center gap-2 pt-8'>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeftIcon className='size-4' />
                    <span className='sr-only'>Previous page</span>
                  </Button>

                  <div className='flex items-center gap-1'>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        size='icon'
                        onClick={() => handlePageChange(page)}
                        className='hidden sm:flex'
                      >
                        {page}
                      </Button>
                    ))}
                    <span className='text-muted-foreground mx-2 text-sm sm:hidden'>
                      Page {currentPage} of {totalPages}
                    </span>
                  </div>

                  <Button
                    variant='outline'
                    size='icon'
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRightIcon className='size-4' />
                    <span className='sr-only'>Next page</span>
                  </Button>
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
