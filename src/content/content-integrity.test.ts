import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { describe, it } from 'node:test'

import { blogPosts } from '../assets/data/blog-posts.ts'

describe('Content Integrity', () => {
  it('ensures the architectural amnesia MDX file exists and has correct content', () => {
    const filePath = path.join(process.cwd(), 'src', 'content', 'the-architectural-amnesia.mdx')

    assert.ok(fs.existsSync(filePath), 'the-architectural-amnesia.mdx should exist')

    const content = fs.readFileSync(filePath, 'utf-8')

    assert.ok(content.includes('## The Architectural Amnesia'), 'Title heading should be present')
    assert.ok(
      content.includes('find themselves standing before a digital necropolis'),
      'Correct text phrasing should be present'
    )
  })

  it('verifies all blog post slugs have corresponding MDX content files', () => {
    const missingFiles: string[] = []

    for (const post of blogPosts) {
      const filePath = path.join(process.cwd(), 'src', 'content', `${post.slug}.mdx`)

      if (!fs.existsSync(filePath)) {
        missingFiles.push(`${post.slug}.mdx`)
      }
    }

    assert.deepEqual(missingFiles, [], `Missing MDX files for slugs: ${missingFiles.join(', ')}`)
  })
})
