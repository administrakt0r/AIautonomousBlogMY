import React from 'react'

import type { MDXComponents } from 'mdx/types'

import { ExternalLinkIcon, LinkIcon } from 'lucide-react'
import Link from 'next/link'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

// ⚡ Bolt: Hoist regex patterns to module scope to avoid redundant compilation during MDX rendering.
const SLUGIFY_STRIP_REGEX = /[^\w\s-]/g
const SLUGIFY_WHITESPACE_REGEX = /\s+/g
const SLUGIFY_TRIM_REGEX = /^-+|-+$/g

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(SLUGIFY_STRIP_REGEX, '')
    .replace(SLUGIFY_WHITESPACE_REGEX, '-')
    .replace(SLUGIFY_TRIM_REGEX, '')

const HeadingAnchor = ({ id, children, level }: { id?: string; children: React.ReactNode; level: 2 | 3 }) => {
  const generatedId = React.useMemo(() => {
    if (id) return id

    // ⚡ Bolt: Fast-path for the common case where heading children is a simple string.
    // This avoids the overhead of React.Children.toArray for most headings.
    if (typeof children === 'string') return slugify(children)

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
  strong: ({ children }) => <strong className='text-foreground font-semibold'>{children}</strong>,
  blockquote: ({ children }) => (
    <blockquote className='border-primary/20 bg-muted/30 my-6 border-l-4 py-2 pl-4 italic text-muted-foreground'>
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className='bg-muted text-foreground relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium'>
      {children}
    </code>
  ),
  hr: () => <hr className='border-border my-8' />,
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith('http')
    const isSpecial = href?.startsWith('mailto:') || href?.startsWith('tel:')

    if (isExternal || isSpecial) {
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

    // ⚡ Bolt: Use Next.js Link for internal navigation to enable prefetching and client-side transitions.
    return (
      <Link
        href={href || ''}
        className='text-primary group underline underline-offset-4 transition-colors hover:text-primary/80'
        {...props}
      >
        {children}
      </Link>
    )
  }
} satisfies MDXComponents

export function useMDXComponents(): MDXComponents {
  return components
}
