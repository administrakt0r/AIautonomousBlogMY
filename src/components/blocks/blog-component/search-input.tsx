import React, { useState, useEffect, useRef } from 'react'

import { SearchIcon, XIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

// ⚡ Bolt: Extract and memoize the search input logic to prevent the entire Blog component from re-rendering on every keystroke.
// This component manages its own local state and notifies the parent only after a debounce period.
export const SearchInput = React.memo(
  React.forwardRef<HTMLInputElement, { onSearchChange: (value: string) => void; initialValue?: string }>(
    ({ onSearchChange, initialValue = '' }, ref) => {
      const [value, setValue] = useState(initialValue)
      const internalRef = useRef<HTMLInputElement>(null)

      // 🎨 Palette: Use useImperativeHandle to expose the focus/blur methods to the parent via the forwarded ref,
      // while keeping a local ref for internal keyboard shortcut logic.
      React.useImperativeHandle(ref, () => internalRef.current!)

      // Sync with prop if changed from outside (e.g. "Clear all filters" button)
      useEffect(() => {
        setValue(initialValue)
      }, [initialValue])

      // ⚡ Bolt: Local debounce effect to minimize parent re-renders.
      // ⚡ Bolt: Trim the value before calling the parent to avoid redundant filtering on whitespace changes.
      useEffect(() => {
        const handler = setTimeout(() => {
          onSearchChange(value.trim())
        }, 300)

        return () => clearTimeout(handler)
      }, [value, onSearchChange])

      // 🎨 Palette: Add keyboard shortcut '/' to focus search input and 'Escape' to clear/blur
      useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName || '')) {
            e.preventDefault()
            internalRef.current?.focus()
          }

          if (e.key === 'Escape' && document.activeElement === internalRef.current) {
            setValue('')
            internalRef.current?.blur()
          }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => window.removeEventListener('keydown', handleKeyDown)
      }, [])

      return (
        <div className='relative max-md:w-full'>
          <Label htmlFor='blog-search' className='sr-only'>
            Search articles (Press / to focus)
          </Label>
          <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
            <SearchIcon className='size-4' aria-hidden='true' />
          </div>
          <Input
            id='blog-search'
            ref={internalRef}
            type='text'
            placeholder='Search articles by title or summary... (Press / to focus)'
            value={value}
            aria-describedby='blog-results-summary'
            onChange={e => setValue(e.target.value)}
            className='peer h-10 px-9'
          />
          {!value && (
            <div className='text-muted-foreground peer-focus:hidden pointer-events-none absolute inset-y-0 right-0 hidden items-center pr-3 sm:flex'>
              <kbd className='bg-muted border-muted-foreground/20 pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none'>
                <span className='text-xs'>/</span>
              </kbd>
            </div>
          )}
          {value && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type='button'
                  aria-label='Clear search'
                  onClick={() => {
                    setValue('')
                    internalRef.current?.focus()
                  }}
                  className='text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 flex items-center justify-center pr-3'
                >
                  <XIcon className='size-4' aria-hidden='true' />
                </button>
              </TooltipTrigger>
              <TooltipContent>Clear search (Esc)</TooltipContent>
            </Tooltip>
          )}
        </div>
      )
    }
  )
)

SearchInput.displayName = 'SearchInput'
