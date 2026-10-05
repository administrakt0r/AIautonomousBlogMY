import React, { useMemo } from 'react'

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

// ⚡ Bolt: Extract and memoize the individual page button to prevent all buttons from re-rendering
// when the currentPage changes. Only the old and new active buttons will re-render.
export const PageButton = React.memo(
  ({ page, isActive, onClick }: { page: number; isActive: boolean; onClick: (page: number) => void }) => (
    <Button
      type='button'
      variant={isActive ? 'default' : 'outline'}
      size='icon'
      onClick={() => onClick(page)}
      className='hidden sm:flex'
      aria-label={`Go to page ${page}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {page}
    </Button>
  )
)

PageButton.displayName = 'PageButton'

export const Ellipsis = () => (
  <span className='hidden sm:flex px-2 text-sm text-muted-foreground select-none'>&hellip;</span>
)

Ellipsis.displayName = 'Ellipsis'

// ⚡ Bolt: Extract and memoize the pagination controls into a sub-component.
export const Pagination = React.memo(
  ({
    currentPage,
    totalPages,
    onPageChange
  }: {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
  }) => {
    const pageNumbers = useMemo(() => {
      const delta = 2
      const pages: (number | 'ellipsis-start' | 'ellipsis-end')[] = []

      if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
      }

      pages.push(1)

      if (currentPage - delta > 2) {
        pages.push('ellipsis-start')
      }

      const start = Math.max(2, currentPage - delta)
      const end = Math.min(totalPages - 1, currentPage + delta)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage + delta < totalPages - 1) {
        pages.push('ellipsis-end')
      }

      pages.push(totalPages)

      return pages
    }, [currentPage, totalPages])

    return (
      <div className='flex items-center justify-center gap-2 pt-8'>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className='inline-block'>
              <Button
                type='button'
                variant='outline'
                size='icon'
                className='group'
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeftIcon
                  className='size-4 transition-transform duration-300 group-hover:-translate-x-0.5'
                  aria-hidden='true'
                />
                <span className='sr-only'>Previous page</span>
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>Previous page</TooltipContent>
        </Tooltip>

        <div className='flex items-center gap-1'>
          {pageNumbers.map(page => {
            if (typeof page === 'string') {
              return <Ellipsis key={page} />
            }

            return (
              <PageButton
                key={page}
                page={page}
                isActive={currentPage === page}
                onClick={onPageChange}
              />
            )
          })}
          <span className='text-muted-foreground mx-2 text-sm sm:hidden'>
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <span className='inline-block'>
              <Button
                type='button'
                variant='outline'
                size='icon'
                className='group'
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRightIcon
                  className='size-4 transition-transform duration-300 group-hover:translate-x-0.5'
                  aria-hidden='true'
                />
                <span className='sr-only'>Next page</span>
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>Next page</TooltipContent>
        </Tooltip>
      </div>
    )
  }
)

Pagination.displayName = 'Pagination'
