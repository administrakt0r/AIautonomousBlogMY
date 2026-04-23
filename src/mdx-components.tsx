import type { MDXComponents } from 'mdx/types'

import { ExternalLinkIcon } from 'lucide-react'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

const components = {
  // Allows customizing built-in components, e.g. to add styling.
  h2: ({ children }) => <h2 className='text-foreground mt-16 mb-4 scroll-mt-20 text-2xl font-semibold'>{children}</h2>,
  h3: ({ children }) => <h3 className='text-foreground mb-4 scroll-mt-20 text-xl font-medium'>{children}</h3>,
  p: ({ children }) => <p className='text-muted-foreground mb-4'>{children}</p>,
  ul: ({ children }) => <ul className='mb-4 list-inside list-disc space-y-2 pl-2'>{children}</ul>,
  li: ({ children }) => <li className='text-muted-foreground'>{children}</li>,
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith('http')

    return (
      <a
        href={href}
        className='text-primary underline underline-offset-4 transition-colors hover:text-primary/80'
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {children}
        {isExternal && (
          <span className='ml-1 inline-flex items-center gap-1'>
            <ExternalLinkIcon className='size-3.5' aria-hidden='true' />
            <span className='sr-only'>(opens in a new tab)</span>
          </span>
        )}
      </a>
    )
  }
} satisfies MDXComponents

export function useMDXComponents(): MDXComponents {
  return components
}
