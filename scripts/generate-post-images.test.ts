import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import {
  escapeXml,
  getFontSize,
  getOgSvg,
  getTitleLinesSvg,
  hashString,
  presets,
  wrapTitle,
} from './generate-post-images.mjs'

describe('generate-post-images script helpers', () => {
  describe('presets', () => {
    it('contains valid color preset configurations', () => {
      assert.equal(presets.length, 5)

      for (const preset of presets) {
        assert.ok(preset.backgroundStart.startsWith('#'))
        assert.ok(preset.backgroundEnd.startsWith('#'))
        assert.ok(preset.accent.startsWith('#'))
        assert.ok(preset.glowOne.startsWith('rgba'))
        assert.ok(preset.glowTwo.startsWith('rgba'))
      }
    })
  })

  describe('hashString utility', () => {
    it('returns 0 for empty string', () => {
      assert.equal(hashString(''), 0)
    })

    it('returns non-negative integer for any string', () => {
      const inputs = ['hello', 'World!', 'A very long post title with many words 1234567890', 'Special!@#$%^&*()']

      for (const str of inputs) {
        const hash = hashString(str)

        assert.ok(Number.isInteger(hash))
        assert.ok(hash >= 0)
      }
    })

    it('is deterministic for identical inputs', () => {
      const title = 'The Model Routing Fallacy'

      assert.equal(hashString(title), hashString(title))
    })

    it('produces different hashes for different inputs', () => {
      assert.notEqual(hashString('Title One'), hashString('Title Two'))
    })
  })

  describe('escapeXml utility', () => {
    it('leaves plain strings unchanged', () => {
      assert.equal(escapeXml('Hello World 123'), 'Hello World 123')
    })

    it('escapes standard XML special characters correctly', () => {
      assert.equal(escapeXml('&'), '&amp;')
      assert.equal(escapeXml('<'), '&lt;')
      assert.equal(escapeXml('>'), '&gt;')
      assert.equal(escapeXml('"'), '&quot;')
      assert.equal(escapeXml("'"), '&apos;')
    })

    it('escapes complex strings containing multiple special XML characters', () => {
      const input = '<div class="test" id=\'1\'>& "quote" & \'single\'</div>'
      const expected = '&lt;div class=&quot;test&quot; id=&apos;1&apos;&gt;&amp; &quot;quote&quot; &amp; &apos;single&apos;&lt;/div&gt;'

      assert.equal(escapeXml(input), expected)
    })
  })

  describe('wrapTitle utility', () => {
    it('keeps short titles on a single line', () => {
      const title = 'Short Post Title'
      const lines = wrapTitle(title)

      assert.deepEqual(lines, ['Short Post Title'])
    })

    it('wraps medium titles using maxCharsPerLine = 30', () => {
      const title = 'Understanding Modern Web Application Architecture and Design'
      const lines = wrapTitle(title)

      assert.ok(lines.length > 1)

      for (const line of lines.slice(0, -1)) {
        assert.ok(line.length <= 30)
      }
    })

    it('wraps titles > 72 chars using maxCharsPerLine = 26', () => {
      const title = 'The Zero-Trust Fallacy: Why Securing AI Agents with Legacy Architecture Fails Completely'
      const lines = wrapTitle(title)

      assert.ok(lines.length >= 3)

      for (const line of lines.slice(0, -1)) {
        assert.ok(line.length <= 26)
      }
    })

    it('wraps very long titles (> 95 chars) using maxCharsPerLine = 22', () => {
      const title = 'The Infrastructure Trap: Why AI Scaling Is Bankrupting Modern Software Architecture Across Global Enterprise Networks Today'
      const lines = wrapTitle(title)

      assert.ok(lines.length <= 4)

      for (const line of lines.slice(0, 3)) {
        assert.ok(line.length <= 22)
      }
    })

    it('compacts extra lines down to 4 lines maximum when line count exceeds 4', () => {
      const title = 'Word1 Word2 Word3 Word4 Word5 Word6 Word7 Word8 Word9 Word10 Word11 Word12 Word13 Word14 Word15'
      const lines = wrapTitle(title)

      assert.equal(lines.length, 4)

      // Line 4 contains all overflow words joined with spaces
      assert.ok(lines[3].includes('Word'))
    })
  })

  describe('getFontSize utility', () => {
    it('returns 72 for 1 or 2 lines with max length <= 26', () => {
      assert.equal(getFontSize(1, 20), 72)
      assert.equal(getFontSize(2, 25), 72)
    })

    it('returns 60 for 3 lines or longest line length between 27 and 30', () => {
      assert.equal(getFontSize(3, 20), 60)
      assert.equal(getFontSize(2, 28), 60)
    })

    it('returns 52 for 4 or more lines or longest line length > 30', () => {
      assert.equal(getFontSize(4, 20), 52)
      assert.equal(getFontSize(2, 32), 52)
      assert.equal(getFontSize(5, 15), 52)
    })
  })

  describe('getTitleLinesSvg utility', () => {
    it('generates SVG text elements for single line title', () => {
      const title = 'Simple Title'
      const svgText = getTitleLinesSvg(title)

      assert.ok(svgText.includes('<text'))
      assert.ok(svgText.includes('x="600"'))
      assert.ok(svgText.includes('Simple Title'))
      assert.ok(svgText.includes('text-anchor="middle"'))
    })

    it('escapes XML entities in title lines', () => {
      const title = 'AI & ML: <Future> "Vision"'
      const svgText = getTitleLinesSvg(title)

      assert.ok(svgText.includes('&amp;'))
      assert.ok(svgText.includes('&lt;Future&gt;'))
      assert.ok(svgText.includes('&quot;Vision&quot;'))
      assert.ok(!svgText.includes('<Future>'))
    })

    it('calculates vertically centered y positioning for multi-line titles', () => {
      const title = 'A Very Long Title That Wraps Into Multiple Lines For Verification'
      const svgText = getTitleLinesSvg(title)
      const matches = [...svgText.matchAll(/y="([\d.]+)"/g)]

      assert.ok(matches.length > 1)
      const yCoords = matches.map(m => Number.parseFloat(m[1]))


      // Y coordinates should increase for subsequent lines
      for (let index = 1; index < yCoords.length; index += 1) {
        assert.ok(yCoords[index] > yCoords[index - 1])
      }
    })
  })

  describe('getOgSvg markup generator', () => {
    it('generates a complete valid SVG markup string', () => {
      const preset = presets[0]
      const title = 'Testing Image Generator'
      const logoDataUri = 'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4='

      const svg = getOgSvg({ title, logoDataUri, preset })

      assert.ok(svg.startsWith('<?xml version="1.0" encoding="UTF-8"?>'))
      assert.ok(svg.includes('<svg width="1200" height="630"'))
      assert.ok(svg.includes(preset.backgroundStart))
      assert.ok(svg.includes(preset.backgroundEnd))
      assert.ok(svg.includes(preset.accent))
      assert.ok(svg.includes(preset.glowOne))
      assert.ok(svg.includes(preset.glowTwo))
      assert.ok(svg.includes(logoDataUri))
      assert.ok(svg.includes('ShtefAI blog'))
      assert.ok(svg.includes('shtefai.vercel.app'))
      assert.ok(svg.includes('Written by Shtef'))
      assert.ok(svg.includes('Testing Image Generator'))
    })
  })
})
