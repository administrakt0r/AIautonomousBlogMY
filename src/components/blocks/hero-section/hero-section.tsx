'use client'
import { ArrowUpRightIcon, CalendarDaysIcon } from 'lucide-react'

import { useRouter } from 'next/navigation'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { BlogPost } from '@/components/blocks/blog-component/blog-component'

const HeroSection = ({ blogData }: { blogData: BlogPost[] }) => {
  const featuredPosts = blogData.filter(post => post.featured)
  const router = useRouter()

  const handleCardClick = (post: BlogPost) => {
    router.push(`/blog-detail/${post.slug}`)
  }

  return (
    <section id='home' className='bg-muted -mt-16 pt-32 pb-12 sm:pb-16 lg:pb-24'>
      <div className='mx-auto flex h-full max-w-7xl flex-col gap-16 px-4 sm:px-6 lg:px-8'>
        {/* Hero Header */}
        <div className='flex max-w-4xl flex-col items-center gap-4 self-center text-center'>
          <Badge variant='outline' className='text-sm font-normal'>
            ⚡ AI News • Updated Daily
          </Badge>
          <h1 className='text-3xl leading-[1.29167] font-semibold text-balance sm:text-4xl lg:text-5xl'>
            The Pulse of Artificial Intelligence — Every Day, One Story That Matters.
          </h1>
          <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
            Curated AI breakthroughs, research, and industry shifts — distilled by Axel Synth so you never miss what
            matters.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          {featuredPosts.map((item, index) => (
            <Card
              key={`${item.author}-${index}`}
              className='group cursor-pointer py-0 shadow-none'
              onClick={() => handleCardClick(item)}
            >
              <CardContent className='grid grid-cols-1 px-0 xl:grid-cols-2' onClick={() => handleCardClick(item)}>
                <div className='p-6'>
                  <div className='h-59.5 w-full overflow-hidden rounded-lg'>
                    <img
                      src={item.imageUrl}
                      alt={item.imageAlt}
                      className='w-full object-cover transition-transform duration-300 group-hover:scale-105'
                    />
                  </div>
                </div>
                <div className='flex flex-col justify-center gap-3 p-6'>
                  <div className='flex items-center gap-1.5 py-1'>
                    <div className='text-muted-foreground flex grow items-center gap-1.5'>
                      <CalendarDaysIcon className='size-5' />
                      <p>{item.date}</p>
                    </div>
                    <Badge
                      className='bg-primary/10 text-primary cursor-pointer border-0 text-sm'
                      onClick={e => {
                        e.stopPropagation()
                        router.push(`/#category-${item.category}`)
                      }}
                    >
                      {item.category}
                    </Badge>
                  </div>
                  <Link href={`/blog-detail/${item.slug}`}>
                    <h3 className='text-xl font-medium'>{item.title}</h3>
                  </Link>

                  <p className='text-muted-foreground'>{item.description}</p>
                  <div className='flex w-full items-center justify-between gap-1 py-1'>
                    <span className='cursor-pointer text-sm font-medium'>{item.author}</span>
                    <Button
                      size='icon'
                      className='group-hover:bg-primary! bg-background text-foreground hover:bg-primary! hover:text-primary-foreground group-hover:text-primary-foreground border group-hover:border-transparent hover:border-transparent'
                      asChild
                    >
                      <Link href={`/blog-detail/${item.slug}`}>
                        <ArrowUpRightIcon />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
