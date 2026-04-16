'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { MailIcon, MenuIcon } from 'lucide-react'

import { ModeToggle } from '@/components/layout/mode-toggle'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import MenuDropdown from '@/components/blocks/menu-dropdown'
import MenuNavigation from '@/components/blocks/menu-navigation'
import type { NavigationSection } from '@/components/blocks/menu-navigation'

import { cn } from '@/lib/utils'
import Logo from '@/components/logo'

type HeaderProps = {
  navigationData: NavigationSection[]
  className?: string
}

const Header = ({ navigationData, className }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    // ⚡ Bolt: Optimize isScrolled using IntersectionObserver with a sentinel.
    // This replaces the throttled scroll listener, eliminating JS execution on every scroll frame.
    // We observe a 1px sentinel at the top of the page; when it's out of view, the header is "scrolled".
    const sentinel = document.getElementById('header-scroll-sentinel')

    const sentinelObserver = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting)
      },
      { threshold: [0, 1] }
    )

    if (sentinel) {
      sentinelObserver.observe(sentinel)
    }

    // ⚡ Bolt: Optimize active section detection using IntersectionObserver
    // This avoids continuous DOM queries and layout measurements on every scroll event
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Detect section in the middle of the viewport
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // ⚡ Bolt: Only observe sections that are actually in the navigation data.
    // This avoids redundant tracking of sections that don't have a corresponding navigation link.
    navigationData.forEach(navItem => {
      const sectionId = navItem.sectionId || (navItem.href === '/#' ? 'home' : navItem.href?.replace('/#', ''))

      if (sectionId && sectionId.startsWith('/') === false) {
        const element = document.getElementById(sectionId)

        if (element) {
          observer.observe(element)
        }
      }
    })

    return () => {
      sentinelObserver.disconnect()
      observer.disconnect()
    }
  }, [navigationData])

  return (
    <>
      {/* ⚡ Bolt: Sentinel for scroll detection. Absolute positioned at the very top. */}
      <div id='header-scroll-sentinel' className='pointer-events-none absolute top-0 h-px w-full' aria-hidden='true' />
      <header
        className={cn(
          'bg-background sticky top-0 z-50 h-16 w-full transition-all duration-300',
          {
            'shadow-sm': isScrolled
          },
          className
        )}
      >
        <div className='mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8'>
          {/* Logo */}
          <Link href='/#home'>
            <Logo />
          </Link>

          {/* Navigation */}
          <MenuNavigation navigationData={navigationData} activeSection={activeSection} className='max-lg:hidden' />

          {/* Actions */}
          <div className='flex gap-3'>
            <ModeToggle />
            <Button variant='outline' className='max-sm:hidden' asChild>
              <Link href='/contact-us'>Get in Touch</Link>
            </Button>

            {/* Navigation for small screens */}
            <div className='flex gap-3'>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant='outline' size='icon' className='sm:hidden' asChild>
                    <Link href='/contact-us'>
                      <MailIcon aria-hidden='true' />
                      <span className='sr-only'>Get in Touch</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Get in Touch</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <MenuDropdown
                    align='end'
                    navigationData={navigationData}
                    activeSection={activeSection}
                    trigger={
                      <Button type='button' variant='outline' size='icon' className='lg:hidden'>
                        <MenuIcon aria-hidden='true' />
                        <span className='sr-only'>Menu</span>
                      </Button>
                    }
                  />
                </TooltipTrigger>
                <TooltipContent>Menu</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
