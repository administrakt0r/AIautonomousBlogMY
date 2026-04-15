'use client'

import React, { type ReactNode } from 'react'

import { ChevronRightIcon, CircleSmallIcon } from 'lucide-react'

import Link from 'next/link'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { cn } from '@/lib/utils'

export type NavigationItem = {
  title: string
  href: string
}

export type NavigationSection = {
  title: string
  icon?: ReactNode
  sectionId?: string
} & (
  | {
      items: NavigationItem[]
      href?: never
    }
  | {
      items?: never
      href: string
    }
)

type Props = {
  trigger: ReactNode
  navigationData: NavigationSection[]
  activeSection?: string
  align?: 'center' | 'end' | 'start'
}

// ⚡ Bolt: Extract and memoize the dropdown navigation item to prevent unnecessary re-renders when scrolling.
const DropdownNavItem = React.memo(({ navItem, isActive }: { navItem: NavigationSection; isActive: boolean }) => {
  if (navItem.href) {
    return (
      <DropdownMenuItem asChild>
        <Link href={navItem.href} className={cn(isActive && 'bg-accent text-accent-foreground font-medium')}>
          {navItem.icon}
          {navItem.title}
        </Link>
      </DropdownMenuItem>
    )
  }

  return (
    <Collapsible asChild>
      <DropdownMenuGroup>
        <CollapsibleTrigger asChild>
          <DropdownMenuItem onSelect={event => event.preventDefault()} className='justify-between'>
            {navItem.icon}
            <span className='flex-1'>{navItem.title}</span>
            <ChevronRightIcon className='shrink-0 transition-transform [[data-state=open]>&]:rotate-90' />
          </DropdownMenuItem>
        </CollapsibleTrigger>
        <CollapsibleContent className='pl-2'>
          {navItem.items?.map(item => (
            <DropdownMenuItem key={item.title} asChild>
              <Link href={item.href}>
                <CircleSmallIcon />
                <span>{item.title}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </CollapsibleContent>
      </DropdownMenuGroup>
    </Collapsible>
  )
})

DropdownNavItem.displayName = 'DropdownNavItem'

const MenuDropdown = ({ trigger, navigationData, activeSection, align = 'start' }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        className='mx-3 w-[min(93vw,500px)] sm:ml-8 md:w-[min(93vw,250px)] max-lg:md:mr-0'
        align={align}
      >
        {navigationData.map(navItem => {
          // ⚡ Bolt: Move isActive comparison logic to the parent loop.
          // ⚡ Bolt: Use pre-calculated sectionId if available to avoid string manipulations during scroll.
          const sectionId = navItem.sectionId || (navItem.href === '/#' ? 'home' : navItem.href?.replace('/#', ''))
          const isActive = !!sectionId && sectionId === activeSection

          return <DropdownNavItem key={navItem.title} navItem={navItem} isActive={isActive} />
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MenuDropdown
