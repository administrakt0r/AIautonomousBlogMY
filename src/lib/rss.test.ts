import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { type BlogPost } from '../assets/data/blog-posts.ts'
import {
  generateRssXml,
  getPostHtml,
  stripMdxBoilerplate,
  toCdata,
  toRssDate,
} from './rss.ts'

describe('stripMdxBoilerplate', () => {
  it('removes frontmatter from MDX source', () => {
    const source = `---
title: "Test Post"
date: "2026-03-02"
---

# Hello World`

    assert.equal(stripMdxBoilerplate(source), '# Hello World')
  })

  it('removes import and export statements', () => {
    const source = `---
title: "Test"
---

import { Component } from './component'
import Image from 'next/image'

# Heading

Some content here.

export const meta = { author: 'Shtef' }
`

    const expected = `# Heading\n\nSome content here.`

    assert.equal(stripMdxBoilerplate(source), expected)
  })

  it('handles content without boilerplate', () => {
    const source = 'Just plain markdown content.'

    assert.equal(stripMdxBoilerplate(source), 'Just plain markdown content.')
  })

  it('returns empty string when source is only boilerplate', () => {
    const source = `---
title: "Only Metadata"
---
import Foo from 'foo'
export default Foo`

    assert.equal(stripMdxBoilerplate(source), '')
  })
})

describe('toCdata', () => {
  it('wraps text in CDATA tags', () => {
    assert.equal(toCdata('Hello World'), '<![CDATA[Hello World]]>')
  })

  it('escapes nested CDATA closing tags correctly', () => {
    const input = 'Nested ]]> tag inside'

    assert.equal(toCdata(input), '<![CDATA[Nested ]]]]><![CDATA[> tag inside]]>')
  })
})

describe('toRssDate', () => {
  it('converts date input to UTC string format', () => {
    const dateStr = '2026-03-02T12:00:00Z'
    const result = toRssDate(dateStr)

    assert.equal(result, new Date(dateStr).toUTCString())
  })
})

describe('getPostHtml', () => {
  const samplePost = {
    slug: 'sample-post',
    description: 'Sample post description fallback.',
  }

  it('reads MDX, strips boilerplate, and converts markdown to HTML', async () => {
    const mockMdx = `---
title: "Sample"
---

import { Button } from 'ui'

## Subheading

This is **bold** text.`

    const mockFileReader = async () => mockMdx

    const html = await getPostHtml(samplePost, {
      fileReader: mockFileReader,
    })

    assert.match(html, /<h2>Subheading<\/h2>/)
    assert.match(html, /<p>This is <strong>bold<\/strong> text.<\/p>/)
  })

  it('returns fallback description HTML when MDX content is empty after stripping', async () => {
    const mockFileReader = async () => `---
title: "Empty"
---
import Foo from 'foo'`

    const html = await getPostHtml(samplePost, {
      fileReader: mockFileReader,
    })

    assert.equal(html, `<p>${samplePost.description}</p>`)
  })

  it('returns fallback description HTML when file reader throws an error', async () => {
    const originalError = console.error

    console.error = () => {} // Suppress expected error log

    try {
      const mockFileReader = async () => {
        throw new Error('File not found')
      }

      const html = await getPostHtml(samplePost, {
        fileReader: mockFileReader,
      })

      assert.equal(html, `<p>${samplePost.description}</p>`)
    } finally {
      console.error = originalError
    }
  })
})

describe('generateRssXml', () => {
  const mockPosts: BlogPost[] = [
    {
      id: 1,
      slug: 'test-post-1',
      title: 'Test Post One <&>',
      description: 'First test post description with ]]> tag',
      imageUrl: '/images/posts/test-post-1.png',
      imageAlt: 'Test Post One',
      date: 'March 02, 2026',
      category: 'AI News',
      author: 'Shtef',
      avatarUrl: '/images/avatars/1.webp',
      readTime: 3,
      featured: true,
      dateIso: '2026-03-02T00:00:00.000Z',
      url: 'https://shtefai.vercel.app/blog-detail/test-post-1',
      categoryUrl: '/#category-AI%20News',
      index: 0,
    },
  ]

  it('generates a complete, valid RSS 2.0 XML string with channel metadata and item fields', async () => {
    const customSiteUrl = 'https://example.com'
    const customBuildDate = new Date('2026-03-02T12:00:00Z')
    const mockFileReader = async () => '# Article Body'

    const xml = await generateRssXml(mockPosts, {
      siteUrl: customSiteUrl,
      buildDate: customBuildDate,
      fileReader: mockFileReader,
    })

    // Validate RSS structure
    assert.match(xml, /^<\?xml version="1.0" encoding="UTF-8"\?>/)
    assert.match(xml, /<rss version="2.0" xmlns:content="http:\/\/purl.org\/rss\/1.0\/modules\/content\/" xmlns:atom="http:\/\/www.w3.org\/2005\/Atom">/)
    assert.match(xml, /<title>ShtefAI Blog<\/title>/)
    assert.match(xml, /<link>https:\/\/example\.com<\/link>/)
    assert.match(xml, /<description>Your Daily AI Intelligence Source<\/description>/)
    assert.match(xml, /<lastBuildDate>Mon, 02 Mar 2026 12:00:00 GMT<\/lastBuildDate>/)

    // Validate Atom self link
    assert.match(xml, /<atom:link href="https:\/\/example\.com\/rss\.xml" rel="self" type="application\/rss\+xml"\/>/)

    // Validate Item fields
    assert.match(xml, /<item>/)
    assert.match(xml, /<title><!\[CDATA\[Test Post One <&>\]\]><\/title>/)
    assert.match(xml, /<link>https:\/\/example\.com\/blog-detail\/test-post-1<\/link>/)
    assert.match(xml, /<guid isPermaLink="true">https:\/\/example\.com\/blog-detail\/test-post-1<\/guid>/)
    assert.match(xml, /<description><!\[CDATA\[First test post description with ]]]]><!\[CDATA\[> tag\]\]><\/description>/)
    assert.match(xml, /<content:encoded><!\[CDATA\[<h1>Article Body<\/h1>\n\]\]><\/content:encoded>/)
    assert.match(xml, /<author><!\[CDATA\[Shtef\]\]><\/author>/)
    assert.match(xml, /<category><!\[CDATA\[AI News\]\]><\/category>/)
  })
})
