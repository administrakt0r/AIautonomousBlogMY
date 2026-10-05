import React from 'react'

import { Button } from '@/components/ui/button'

// ⚡ Bolt: Extract and memoize the category button to prevent all buttons from re-rendering when the active tab changes.
// Only the button that was selected and the one being newly selected will re-render.
export const CategoryButton = React.memo(
  ({
    category,
    isSelected,
    count,
    onClick
  }: {
    category: string
    isSelected: boolean
    count: number
    onClick: (category: string) => void
  }) => {
    const ariaLabel =
      category === 'All'
        ? `Show all stories (${count} articles)`
        : `Filter by ${category} (${count} articles)`

    return (
      <Button
        type='button'
        variant={isSelected ? 'secondary' : 'ghost'}
        size='sm'
        onClick={() => onClick(category)}
        className={`h-9 px-4 text-base ${isSelected ? 'bg-background shadow-sm' : ''}`}
        aria-pressed={isSelected}
        aria-label={ariaLabel}
      >
        {category}
        <span className='ml-1.5 text-xs font-normal opacity-50'>({count})</span>
      </Button>
    )
  }
)

CategoryButton.displayName = 'CategoryButton'
