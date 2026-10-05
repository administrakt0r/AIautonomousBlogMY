import assert from 'node:assert/strict'
import { describe, it, beforeEach, afterEach } from 'node:test'

import { copyTextToClipboard } from './clipboard-utils.ts'

describe('copyTextToClipboard utility', () => {
  let originalClipboard: Clipboard | undefined
  let originalConsoleError: typeof console.error
  let consoleErrorCalls: Array<{ args: unknown[] }> = []

  beforeEach(() => {
    originalClipboard = globalThis.navigator?.clipboard
    originalConsoleError = console.error
    consoleErrorCalls = []

    console.error = (...args: unknown[]) => {
      consoleErrorCalls.push({ args })
    }
  })

  afterEach(() => {
    if (globalThis.navigator) {
      Object.defineProperty(globalThis.navigator, 'clipboard', {
        value: originalClipboard,
        configurable: true,
        writable: true,
      })
    }

    console.error = originalConsoleError
  })

  it('returns true when navigator.clipboard.writeText resolves', async () => {
    let copiedText = ''

    const mockClipboard = {
      writeText: async (text: string) => {
        copiedText = text
      },
    }

    Object.defineProperty(globalThis, 'navigator', {
      value: { clipboard: mockClipboard },
      configurable: true,
      writable: true,
    })

    const result = await copyTextToClipboard('test@example.com', 'Failed to copy email: ')

    assert.equal(result, true)
    assert.equal(copiedText, 'test@example.com')
    assert.equal(consoleErrorCalls.length, 0)
  })

  it('returns false and logs error to console when navigator.clipboard.writeText rejects', async () => {
    const errorToThrow = new Error('Clipboard permission denied')

    const mockClipboard = {
      writeText: async () => {
        throw errorToThrow
      },
    }

    Object.defineProperty(globalThis, 'navigator', {
      value: { clipboard: mockClipboard },
      configurable: true,
      writable: true,
    })

    const result = await copyTextToClipboard('test@example.com', 'Failed to copy email: ')

    assert.equal(result, false)
    assert.equal(consoleErrorCalls.length, 1)
    assert.equal(consoleErrorCalls[0].args[0], 'Failed to copy email: ')
    assert.equal(consoleErrorCalls[0].args[1], errorToThrow)
  })

  it('uses default error prefix when omitted during failure', async () => {
    const errorToThrow = new Error('Clipboard error')

    const mockClipboard = {
      writeText: async () => {
        throw errorToThrow
      },
    }

    Object.defineProperty(globalThis, 'navigator', {
      value: { clipboard: mockClipboard },
      configurable: true,
      writable: true,
    })

    const result = await copyTextToClipboard('hello world')

    assert.equal(result, false)
    assert.equal(consoleErrorCalls.length, 1)
    assert.equal(consoleErrorCalls[0].args[0], 'Failed to copy: ')
    assert.equal(consoleErrorCalls[0].args[1], errorToThrow)
  })
})
