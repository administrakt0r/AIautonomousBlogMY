import React, { type ReactNode } from 'react'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'

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

type MenuNavigationProps = {
  navigationData: NavigationSection[]
  activeSection?: string
  className?: string
}

// ⚡ Bolt: Memoize the NavItem to prevent it from re-rendering unless the active status changes.
// Since Header frequently updates activeSection during scroll, this reduces unnecessary work.
const NavItem = React.memo(({ navItem, isActive }: { navItem: NavigationSection; isActive: boolean }) => {
  if (navItem.href) {
    // Root link item
    return (
      <NavigationMenuItem>
        <NavigationMenuLink
          href={navItem.href}
          className={cn(
            navigationMenuTriggerStyle(),
            'hover:text-primary dark:hover:bg-accent/50 bg-transparent px-3 py-1.5 text-base!',
            isActive ? 'text-primary bg-accent/50 font-medium' : 'text-muted-foreground'
          )}
        >
          {navItem.title}
        </NavigationMenuLink>
      </NavigationMenuItem>
    )
  }

  // Section with dropdown
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className='dark:data-[state=open]:hover:bg-accent/50 text-muted-foreground hover:text-primary dark:hover:bg-accent/50 bg-transparent px-3 py-1.5 text-base [&>svg]:size-4'>
        {navItem.title}
      </NavigationMenuTrigger>
      <NavigationMenuContent className='data-[motion=from-start]:slide-in-from-left-30! data-[motion=to-start]:slide-out-to-left-30! data-[motion=from-end]:slide-in-from-right-30! data-[motion=to-end]:slide-out-to-right-30! absolute w-auto'>
        <ul className='grid w-38 gap-4'>
          <li>
            {navItem.items?.map(item => (
              <NavigationMenuLink key={item.title} href={item.href}>
                {item.title}
              </NavigationMenuLink>
            ))}
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
})

NavItem.displayName = 'NavItem'

const MenuNavigation = ({ navigationData, activeSection, className }: MenuNavigationProps) => {
  return (
    <NavigationMenu viewport={false} className={className} aria-label='Main navigation'>
      <NavigationMenuList className='flex-wrap justify-start gap-3'>
        {navigationData.map(navItem => {
          // ⚡ Bolt: Move isActive comparison logic to the parent loop.
          // This ensures that NavItem only re-renders if its specific isActive state changes,
          // instead of re-rendering every time activeSection updates.
          // ⚡ Bolt: Use pre-calculated sectionId if available to avoid string manipulations during scroll.
          const sectionId = navItem.sectionId || (navItem.href === '/#' ? 'home' : navItem.href?.replace('/#', ''))
          const isActive = !!sectionId && sectionId === activeSection

          return <NavItem key={navItem.title} navItem={navItem} isActive={isActive} />
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default MenuNavigation
