import assert from 'node:assert'
import { describe, it } from 'node:test'

import { getSearchRegex } from './search-utils.ts'

describe('getSearchRegex', () => {
  it('returns null for empty or whitespace-only queries', () => {
    assert.strictEqual(getSearchRegex(''), null)
  })

  it('returns the same RegExp object instance for identical queries (caching logic)', () => {
    const firstCall = getSearchRegex('react')
    const secondCall = getSearchRegex('react')

    assert.ok(firstCall instanceof RegExp)
    assert.ok(secondCall instanceof RegExp)
    assert.strictEqual(firstCall, secondCall, 'Expected consecutive calls with the same query to return identical RegExp instances')
  })

  it('escapes special regex characters safely', () => {
    const specialChars = '.*+?^${}()|[\\]\\'
    const regex = getSearchRegex(specialChars)

    assert.ok(regex instanceof RegExp)

    // Verify string with special characters matches itself when queried
    assert.strictEqual(regex.test(specialChars), true)

    // Verify special characters do not behave as wildcards/operators
    const nonMatchRegex = getSearchRegex('a.b')

    assert.ok(nonMatchRegex instanceof RegExp)
    assert.strictEqual(nonMatchRegex.test('a.b'), true)
    assert.strictEqual(nonMatchRegex.test('axb'), false, 'Dot should be escaped and not match arbitrary characters')
  })

  it('performs case-insensitive matching', () => {
    const regex = getSearchRegex('Next.js')

    assert.ok(regex instanceof RegExp)
    assert.strictEqual(regex.test('next.js'), true)
    assert.strictEqual(regex.test('NEXT.JS'), true)
    assert.strictEqual(regex.test('NeXt.Js'), true)
  })

  it('splits strings properly when used with String.prototype.split', () => {
    const regex = getSearchRegex('react')

    assert.ok(regex instanceof RegExp)

    const text = 'Learn React and React Native'
    const parts = text.split(regex)

    assert.deepStrictEqual(parts, ['Learn ', 'React', ' and ', 'React', ' Native'])
  })
})
