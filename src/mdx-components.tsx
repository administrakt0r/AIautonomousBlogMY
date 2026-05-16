import React from 'react'

import type { MDXComponents } from 'mdx/types'

import { ExternalLinkIcon, LinkIcon } from 'lucide-react'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '')

const HeadingAnchor = ({ id, children, level }: { id?: string; children: React.ReactNode; level: 2 | 3 }) => {
  const generatedId = React.useMemo(() => {
    if (id) return id

    const text = React.Children.toArray(children)
      .map(child => (typeof child === 'string' ? child : ''))
      .join('')

    return slugify(text)
  }, [id, children])

  const className =
    level === 2
      ? 'text-foreground mt-16 mb-4 scroll-mt-20 text-2xl font-semibold group flex items-center gap-2'
      : 'text-foreground mb-4 scroll-mt-20 text-xl font-medium group flex items-center gap-2'

  return (
    <Tag id={generatedId} className={className} as={level === 2 ? 'h2' : 'h3'}>
      {children}
      <a
        href={`#${generatedId}`}
        className='text-muted-foreground/0 group-hover:text-muted-foreground focus-visible:text-primary transition-colors focus:outline-none'
        aria-label='Link to this section'
      >
        <LinkIcon className='size-4' aria-hidden='true' />
      </a>
    </Tag>
  )
}

const Tag = ({ as: Comp, ...props }: { as: 'h2' | 'h3'; [key: string]: any }) => <Comp {...props} />

const components = {
  // Allows customizing built-in components, e.g. to add styling.
  h2: props => <HeadingAnchor level={2} {...props} />,
  h3: props => <HeadingAnchor level={3} {...props} />,
  p: ({ children }) => <p className='text-muted-foreground mb-4'>{children}</p>,
  ul: ({ children }) => <ul className='mb-4 list-inside list-disc space-y-2 pl-2'>{children}</ul>,
  li: ({ children }) => <li className='text-muted-foreground'>{children}</li>,
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith('http')

    return (
      <a
        href={href}
        className='text-primary group underline underline-offset-4 transition-colors hover:text-primary/80'
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {children}
        {isExternal && (
          <span className='ml-1 inline-flex items-center gap-1'>
            <ExternalLinkIcon
              className='size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
              aria-hidden='true'
            />
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
