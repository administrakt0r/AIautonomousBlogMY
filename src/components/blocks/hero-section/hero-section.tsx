'use client'
import { ArrowUpRightIcon, CalendarDaysIcon } from 'lucide-react'

import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { BlogPost } from '@/components/blocks/blog-component/blog-component'

const HeroSection = ({ blogData }: { blogData: BlogPost[] }) => {
  // Show latest 3 posts sorted by id (newest first)
  const latestPosts = [...blogData].sort((a, b) => b.id - a.id).slice(0, 3)

  return (
    <section id='home' className='bg-muted -mt-16 pt-28 pb-8 sm:pb-10'>
      <div className='mx-auto flex h-full max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8'>
        {/* Hero Header */}
        <div className='flex max-w-3xl flex-col items-center gap-3 self-center text-center'>
          <Badge variant='outline' className='text-sm font-normal'>
            ⚡ AI News • Updated Daily
          </Badge>
          <h1 className='text-2xl leading-tight font-semibold text-balance sm:text-3xl lg:text-4xl'>
            The Pulse of Artificial Intelligence — Every Day, One Story That Matters.
          </h1>
          <p className='text-muted-foreground mx-auto max-w-2xl text-base'>
            Curated AI breakthroughs, research, and industry shifts — distilled by Shtef so you never miss what matters.
          </p>
        </div>

        {/* Latest 3 posts — compact cards */}
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
          {latestPosts.map((item) => (
            <Link key={item.id} href={`/blog-detail/${item.slug}`} className='block'>
              <Card className='group cursor-pointer border shadow-none transition-colors hover:border-primary/40 py-0'>
                <CardContent className='flex items-center gap-3 px-4 py-3'>
                  <div className='flex flex-1 flex-col gap-1 min-w-0'>
                    <div className='text-muted-foreground flex items-center gap-1.5 text-xs'>
                      <CalendarDaysIcon className='size-3.5 shrink-0' />
                      <time dateTime={new Date(item.date).toISOString()}>{item.date}</time>
                    </div>
                    <h3 className='text-sm font-medium leading-snug line-clamp-2 group-hover:text-primary transition-colors'>
                      {item.title}
                    </h3>
                  </div>
                  <ArrowUpRightIcon className='size-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors' />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection

