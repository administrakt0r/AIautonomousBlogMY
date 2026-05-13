import React, { useMemo } from 'react'

interface HighlightProps {
  text: string
  trimmedQuery: string
  lowerQuery: string
}

// ⚡ Bolt: Module-level cache for RegExp objects to avoid redundant regex creation across components.
const regexCache = new Map<string, RegExp>()

/**
 * ⚡ Bolt: Memoized Highlight component to prevent unnecessary re-renders.
 * Also memoizes the regex creation and string split operation to avoid redundant work.
 * This is particularly effective in large grids where multiple items might otherwise
 * re-run regex logic when unrelated state updates.
 */
export const Highlight = React.memo(({ text, trimmedQuery, lowerQuery }: HighlightProps) => {
  const parts = useMemo(() => {
    if (!trimmedQuery) return [text]

    // ⚡ Bolt: Perform the toLowerCase() check on-the-fly to balance bundle size savings.
    if (!text.toLowerCase().includes(lowerQuery)) {
      return [text]
    }

    // ⚡ Bolt: Use cached regex if available to avoid expensive RegExp instantiation.
    let regex = regexCache.get(trimmedQuery)

    if (!regex) {
      // ⚡ Bolt: Escape regex special characters and use 'gi' for case-insensitive global matching.
      const escapedQuery = trimmedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

      regex = new RegExp(`(${escapedQuery})`, 'gi')
      regexCache.set(trimmedQuery, regex)
    }

    return text.split(regex)
  }, [text, trimmedQuery, lowerQuery])

  if (!trimmedQuery || parts.length <= 1) {
    return <>{text}</>
  }

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === lowerQuery ? (
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
