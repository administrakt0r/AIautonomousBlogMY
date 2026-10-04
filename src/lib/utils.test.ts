import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { cn } from './utils.ts'

describe('cn utility', () => {
  it('merges multiple string class names', () => {
    assert.equal(cn('foo', 'bar'), 'foo bar')
    assert.equal(cn('btn', 'btn-primary', 'large'), 'btn btn-primary large')
  })

  it('handles conditional class names and falsy values', () => {
    assert.equal(cn('foo', true && 'bar', false && 'baz'), 'foo bar')
    assert.equal(cn('base', null, undefined, false, 0, ''), 'base')
  })

  it('handles empty input', () => {
    assert.equal(cn(), '')
    assert.equal(cn(''), '')
    assert.equal(cn(null, undefined), '')
  })

  it('handles object syntax for conditional class names', () => {
    assert.equal(cn({ active: true, disabled: false, highlighted: true }), 'active highlighted')
    assert.equal(cn('base', { 'is-open': true, 'is-closed': false }), 'base is-open')
  })

  it('handles array and nested array inputs', () => {
    assert.equal(cn(['foo', 'bar']), 'foo bar')
    assert.equal(cn(['a', 'b'], ['c', ['d', 'e']]), 'a b c d e')
  })

  it('resolves conflicting Tailwind CSS classes correctly', () => {
    // Padding overrides
    assert.equal(cn('px-2 py-1', 'p-4'), 'p-4')
    assert.equal(cn('p-2', 'px-4'), 'p-2 px-4')

    // Color overrides
    assert.equal(cn('text-red-500', 'text-blue-500'), 'text-blue-500')
    assert.equal(cn('bg-red-500 hover:bg-blue-500', 'bg-green-500'), 'hover:bg-blue-500 bg-green-500')

    // Display / layout overrides
    assert.equal(cn('block', 'hidden', 'flex'), 'flex')

    // Margin overrides
    assert.equal(cn('mt-2 mb-4', 'my-6'), 'my-6')
  })

  it('handles complex mixed inputs', () => {
    const isPrimary = true
    const isDisabled = false
    const customClasses = ['font-bold', { 'opacity-50': isDisabled }]

    const result = cn(
      'px-4 py-2 text-sm',
      isPrimary && 'bg-primary text-white',
      isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
      customClasses,
      'px-6'
    )

    assert.equal(result, 'py-2 text-sm bg-primary text-white cursor-pointer font-bold px-6')
  })
})
