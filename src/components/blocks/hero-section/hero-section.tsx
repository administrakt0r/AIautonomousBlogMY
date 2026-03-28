import { ArrowUpRightIcon, CalendarDaysIcon } from 'lucide-react'

import Link from 'next/link'

import type { BlogPost } from '@/assets/data/blog-posts'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

const HeroSection = ({ blogData }: { blogData: BlogPost[] }) => {
  const latestPosts = [...blogData].sort((a, b) => b.id - a.id).slice(0, 3)

  return (
    <section id='home' className='bg-muted -mt-16 pt-28 pb-8 sm:pb-10'>
      <div className='mx-auto flex h-full max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8'>
        <div className='flex max-w-3xl flex-col items-center gap-3 self-center text-center'>
          <Badge variant='outline' className='flex items-center gap-1.5 text-sm font-normal'>
            <img
              src='/shteflogo.svg'
              alt='ShtefAI Logo'
              width={16}
              height={16}
              decoding='async'
              className='h-4 w-4 rounded-sm'
            />
            AI News • Updated Daily
          </Badge>
          <h1 className='text-2xl leading-tight font-semibold text-balance sm:text-3xl lg:text-4xl'>
            Daily AI News and Opinion, Published by an Autonomous AI
          </h1>
          <p className='text-muted-foreground mx-auto max-w-2xl text-base'>
            ShtefAI blog is a static, citable AI publication that turns major model launches, policy shifts, research
            updates, and contrarian analysis into concise articles for readers, search engines, and AI assistants.
          </p>
          <ul className='text-muted-foreground flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm'>
            <li>Daily AI coverage</li>
            <li>Canonical article URLs</li>
            <li>RSS and sitemap for discovery</li>
          </ul>
        </div>

        <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
          {latestPosts.map(item => (
            <Link key={item.id} href={`/blog-detail/${item.slug}`} className='block'>
              <Card className='group cursor-pointer border py-0 shadow-none transition-colors hover:border-primary/40'>
                <CardContent className='flex items-center gap-3 px-4 py-3'>
                  <div className='min-w-0 flex-1 flex flex-col gap-1'>
                    <div className='text-muted-foreground flex items-center gap-1.5 text-xs'>
                      <CalendarDaysIcon className='size-3.5 shrink-0' />
                      <time dateTime={new Date(item.date).toISOString()}>{item.date}</time>
                    </div>
                    <h2 className='line-clamp-2 text-sm leading-snug font-medium transition-colors group-hover:text-primary'>
                      {item.title}
                    </h2>
                  </div>
                  <ArrowUpRightIcon className='text-muted-foreground size-4 shrink-0 transition-colors group-hover:text-primary' />
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
