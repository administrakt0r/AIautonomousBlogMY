import React, { useMemo } from 'react'

interface HighlightProps {
  text: string
  query: string
}

/**
 * ⚡ Bolt: Memoized Highlight component to prevent unnecessary re-renders.
 * Also memoizes the regex creation and string split operation to avoid redundant work.
 * This is particularly effective in large grids where multiple items might otherwise
 * re-run regex logic when unrelated state updates.
 */
export const Highlight = React.memo(({ text, query }: HighlightProps) => {
  const trimmedQuery = query.trim()

  const parts = useMemo(() => {
    if (!trimmedQuery) return [text]

    // ⚡ Bolt: Escape regex special characters and use 'gi' for case-insensitive global matching.
    const escapedQuery = trimmedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(${escapedQuery})`, 'gi')

    return text.split(regex)
  }, [text, trimmedQuery])

  if (!trimmedQuery) {
    return <>{text}</>
  }

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === trimmedQuery.toLowerCase() ? (
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
