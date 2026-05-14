'use client'

import React, { useEffect, useState, useMemo, useCallback } from 'react'

interface TocItem {
  id: string
  title: string
  level: number
}

interface DynamicTocProps {
  contentContainerId?: string
}

// ⚡ Bolt: Extract and memoize the TOC link to prevent re-renders unless the active state or title changes.
// This ensures that during scroll, only the items whose active status actually changes will re-render.
const TocLink = React.memo(
  ({
    id,
    title,
    isActive,
    onClick,
    isSubtitle = false
  }: {
    id: string
    title: string
    isActive: boolean
    onClick: (id: string) => void
    isSubtitle?: boolean
  }) => {
    return (
      <button
        type='button'
        onClick={() => onClick(id)}
        aria-label={`${isSubtitle ? 'Scroll to subsection' : 'Scroll to section'}: ${title}`}
        aria-current={isActive ? 'location' : undefined}
        className={`focus-visible:border-ring focus-visible:ring-ring/50 flex items-start gap-2 rounded-sm text-left transition-colors outline-none focus-visible:ring-[3px] ${
          isActive ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <span
          aria-hidden='true'
          className={`mt-2.5 inline-block h-0.5 shrink-0 transition-all duration-300 ${
            isActive ? 'bg-primary w-5' : 'bg-primary/40 w-3'
          }`}
        ></span>
        <span>{title}</span>
      </button>
    )
  }
)

TocLink.displayName = 'TocLink'

export const DynamicToc = ({ contentContainerId = 'content' }: DynamicTocProps) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // ⚡ Bolt: Consolidate extraction and observation into a single pass to minimize
    // DOM traversals and ensure consistent state between TOC items and observer.
    const container = document.getElementById(contentContainerId)

    if (!container) return

    const headings = container.querySelectorAll('h2, h3')
    const items: TocItem[] = []

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }, observerOptions)

    headings.forEach(heading => {
      const element = heading as HTMLElement
      const title = element.textContent?.trim()

      if (!title) return

      // Create or use existing ID
      let id = element.id

      if (!id) {
        id = title
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
        element.id = id
      }

      const level = element.tagName === 'H2' ? 2 : 3

      items.push({ id, title, level })
      observer.observe(element)
    })

    // ⚡ Bolt: Wrapped in requestAnimationFrame to avoid "react-hooks/set-state-in-effect"
    // and ensure state updates occur after the initial paint, avoiding synchronous cascading renders.
    requestAnimationFrame(() => {
      setTocItems(items)

      if (items.length > 0) {
        setActiveId(items[0].id)
      }
    })

    return () => observer.disconnect()
  }, [contentContainerId])

  // ⚡ Bolt: Wrap handleClick in useCallback to ensure TocLink component memoization works correctly.
  const handleClick = useCallback((id: string) => {
    const element = document.getElementById(id)

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveId(id)
    }
  }, [])

  // ⚡ Bolt: Memoize grouping logic to avoid re-calculating the TOC structure on every re-render.
  const groupedItems = useMemo(() => {
    if (tocItems.length === 0) return []

    const groups: Array<{ main: TocItem; subs: TocItem[] }> = []
    let currentGroup: { main: TocItem; subs: TocItem[] } | null = null

    tocItems.forEach(item => {
      if (item.level === 2) {
        if (currentGroup) {
          groups.push(currentGroup)
        }

        currentGroup = { main: item, subs: [] }
      } else if (item.level === 3 && currentGroup) {
        currentGroup.subs.push(item)
      }
    })

    if (currentGroup) {
      groups.push(currentGroup)
    }

    return groups
  }, [tocItems])

  if (tocItems.length === 0) {
    return null
  }

  return (
    <div className='sticky top-24'>
      <h3 className='text-foreground mb-3.5 font-medium'>On This Page</h3>
      <nav aria-label='Table of contents'>
        <ul className='space-y-3'>
          {groupedItems.map((group, groupIndex) => (
            <li key={`toc-group-${group.main.id}-${groupIndex}`}>
              <TocLink
                id={group.main.id}
                title={group.main.title}
                isActive={activeId === group.main.id}
                onClick={handleClick}
              />

              {group.subs.length > 0 && (
                <ul className='mt-3 ml-5 space-y-3'>
                  {group.subs.map((subtitle, subIndex) => (
                    <li key={`toc-sub-${subtitle.id}-${groupIndex}-${subIndex}`}>
                      <TocLink
                        id={subtitle.id}
                        title={subtitle.title}
                        isActive={activeId === subtitle.id}
                        onClick={handleClick}
                        isSubtitle
                      />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
