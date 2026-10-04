import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { useMDXComponents } from '../src/mdx-components'

describe('useMDXComponents', () => {
  it('returns custom MDX components object with expected keys', () => {
    const components = useMDXComponents() as Record<string, (props: any) => any>

    assert.ok(components, 'components should be defined')
    assert.equal(typeof components, 'object')

    const expectedKeys = ['h2', 'h3', 'p', 'ul', 'li', 'strong', 'blockquote', 'code', 'hr', 'a']

    for (const key of expectedKeys) {
      assert.ok(key in components, `Component mapping for "${key}" should be defined`)
      assert.equal(typeof components[key], 'function', `Component "${key}" should be a function`)
    }
  })

  it('renders paragraph component correctly', () => {
    const components = useMDXComponents() as Record<string, (props: any) => any>
    const element = components.p({ children: 'Test paragraph' })

    assert.equal(element.type, 'p')
    assert.equal(element.props.className, 'text-muted-foreground mb-4')
    assert.equal(element.props.children, 'Test paragraph')
  })

  it('renders list component correctly', () => {
    const components = useMDXComponents() as Record<string, (props: any) => any>
    const ulElement = components.ul({ children: 'item' })

    assert.equal(ulElement.type, 'ul')
    assert.equal(ulElement.props.className, 'mb-4 list-inside list-disc space-y-2 pl-2')

    const liElement = components.li({ children: 'item' })

    assert.equal(liElement.type, 'li')
    assert.equal(liElement.props.className, 'text-muted-foreground')
  })

  it('renders strong, blockquote, code, and hr components correctly', () => {
    const components = useMDXComponents() as Record<string, (props: any) => any>

    const strongEl = components.strong({ children: 'Bold' })

    assert.equal(strongEl.type, 'strong')
    assert.equal(strongEl.props.className, 'text-foreground font-semibold')

    const bqEl = components.blockquote({ children: 'Quote' })

    assert.equal(bqEl.type, 'blockquote')
    assert.equal(
      bqEl.props.className,
      'border-primary/20 bg-muted/30 my-6 border-l-4 py-2 pl-4 italic text-muted-foreground'
    )

    const codeEl = components.code({ children: 'const x = 1;' })

    assert.equal(codeEl.type, 'code')
    assert.equal(
      codeEl.props.className,
      'bg-muted text-foreground relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium'
    )

    const hrEl = components.hr({})

    assert.equal(hrEl.type, 'hr')
    assert.equal(hrEl.props.className, 'border-border my-8')
  })

  it('renders internal link using Next.js Link component', () => {
    const components = useMDXComponents() as Record<string, (props: any) => any>
    const internalLink = components.a({ href: '/blog/test', children: 'Internal Link' })

    assert.ok(internalLink.type, 'Next.js Link element type should be defined')
    assert.equal(internalLink.props.href, '/blog/test')
    assert.equal(internalLink.props.children, 'Internal Link')
    assert.equal(
      internalLink.props.className,
      'text-primary group underline underline-offset-4 transition-colors hover:text-primary/80'
    )
  })

  it('renders external link with target _blank and external link icon', () => {
    const components = useMDXComponents() as Record<string, (props: any) => any>
    const externalLink = components.a({ href: 'https://example.com', children: 'External Link' })

    assert.equal(externalLink.type, 'a')
    assert.equal(externalLink.props.href, 'https://example.com')
    assert.equal(externalLink.props.target, '_blank')
    assert.equal(externalLink.props.rel, 'noopener noreferrer')
  })

  it('renders special mailto link without target _blank', () => {
    const components = useMDXComponents() as Record<string, (props: any) => any>
    const mailtoLink = components.a({ href: 'mailto:info@example.com', children: 'Email Us' })

    assert.equal(mailtoLink.type, 'a')
    assert.equal(mailtoLink.props.href, 'mailto:info@example.com')
    assert.equal(mailtoLink.props.target, undefined)
  })

  it('renders h2 and h3 heading components', () => {
    const components = useMDXComponents() as Record<string, (props: any) => any>

    const h2El = components.h2({ children: 'Heading 2' })

    assert.ok(h2El)
    assert.equal(h2El.props.level, 2)
    assert.equal(h2El.props.children, 'Heading 2')

    const h3El = components.h3({ children: 'Heading 3' })

    assert.ok(h3El)
    assert.equal(h3El.props.level, 3)
    assert.equal(h3El.props.children, 'Heading 3')
  })
})
