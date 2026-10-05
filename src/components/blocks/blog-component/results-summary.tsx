import React, { useMemo } from 'react'

import { POSTS_PER_PAGE } from './constants'

// ⚡ Bolt: Extract and memoize the results summary to prevent re-rendering the entire grid when it updates.
export const ResultsSummary = React.memo(
  ({
    filteredCount,
    currentPage,
    selectedTab,
    searchQuery
  }: {
    filteredCount: number
    currentPage: number
    selectedTab: string
    searchQuery: string
  }) => {
    const summary = useMemo(() => {
      if (filteredCount === 0) {
        return 'No stories match your current search and filters.'
      }

      const start = (currentPage - 1) * POSTS_PER_PAGE + 1
      const end = Math.min(currentPage * POSTS_PER_PAGE, filteredCount)
      const rangeText = start === end ? `${start}` : `${start}–${end}`

      return `Showing ${rangeText} of ${filteredCount} ${
        filteredCount === 1 ? 'story' : 'stories'
      }${selectedTab !== 'All' ? ` in ${selectedTab}` : ''}${searchQuery ? ` for "${searchQuery}"` : ''}.`
    }, [filteredCount, currentPage, selectedTab, searchQuery])

    return (
      <p id='blog-results-summary' className='text-muted-foreground text-sm' aria-live='polite'>
        {summary}
      </p>
    )
  }
)

ResultsSummary.displayName = 'ResultsSummary'
