import React, { useMemo } from 'react'

import { getSearchRegex } from '@/lib/search-utils'

interface HighlightProps {
  text: string
  trimmedQuery: string
}

/**
 * ⚡ Bolt: Memoized Highlight component to prevent unnecessary re-renders.
 * Also memoizes the string split operation using a centralized regex cache to avoid redundant work.
 * This is particularly effective in large grids where multiple items might otherwise
 * re-run regex logic when unrelated state updates.
 */
export const Highlight = React.memo(({ text, trimmedQuery }: HighlightProps) => {
  const parts = useMemo(() => {
    if (!trimmedQuery) return [text]

    const regex = getSearchRegex(trimmedQuery)

    // ⚡ Bolt: Use the faster regex.test() instead of toLowerCase().includes()
    // to check for matches before splitting.
    if (!regex || !regex.test(text)) {
      return [text]
    }

    return text.split(regex)
  }, [text, trimmedQuery])

  if (!trimmedQuery || parts.length <= 1) {
    return <>{text}</>
  }

  return (
    <>
      {parts.map((part, i) =>

        // ⚡ Bolt: Since the regex uses a capturing group, matches are at odd indices.
        // This avoids redundant .toLowerCase() and string comparisons in the render path.
        i % 2 === 1 ? (
          <mark key={i} className='bg-primary/20 text-foreground rounded-sm px-0.5'>
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  )
})

Highlight.displayName = 'Highlight'
