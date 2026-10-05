import assert from 'node:assert/strict'
import path from 'node:path'
import { describe, it, beforeEach, afterEach } from 'node:test'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createJiti } from 'jiti'

const jiti = createJiti(import.meta.url, { jsx: true, alias: { '@': path.resolve('./src') } })

describe('CopyLinkButton component', () => {
  let CopyLinkButtonComponent: any
  let TooltipProviderComponent: any
  let buttonMod: any
  let origButton: any
  let capturedOnClick: ((e?: { defaultPrevented?: boolean }) => Promise<void>) | null = null
  let origNavDescriptor: PropertyDescriptor | undefined
  let origWinDescriptor: PropertyDescriptor | undefined
  let originalConsoleError: typeof console.error

  beforeEach(async () => {
    origNavDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator')
    origWinDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'window')
    originalConsoleError = console.error
    capturedOnClick = null

    buttonMod = (await jiti.import(path.resolve('./src/components/ui/button.tsx'))) as any
    origButton = buttonMod.Button
    buttonMod.Button = (props: any) => {
      capturedOnClick = props.onClick
      return React.createElement('button', props)
    }

    const buttonBlockMod = (await jiti.import(path.resolve('./src/components/blocks/copy-link-button.tsx'))) as any
    CopyLinkButtonComponent = buttonBlockMod.CopyLinkButton

    const tooltipMod = (await jiti.import(path.resolve('./src/components/ui/tooltip.tsx'))) as any
    TooltipProviderComponent = tooltipMod.TooltipProvider
  })

  afterEach(() => {
    console.error = originalConsoleError

    if (buttonMod && origButton) {
      buttonMod.Button = origButton
    }

    if (origNavDescriptor) {
      Object.defineProperty(globalThis, 'navigator', origNavDescriptor)
    } else {
      delete (globalThis as any).navigator
    }

    if (origWinDescriptor) {
      Object.defineProperty(globalThis, 'window', origWinDescriptor)
    } else {
      delete (globalThis as any).window
    }
  })

  it('exports a valid React component with displayName CopyLinkButton', () => {
    assert.ok(CopyLinkButtonComponent, 'CopyLinkButton should be defined')
    const displayName = CopyLinkButtonComponent.displayName || CopyLinkButtonComponent.type?.displayName
    assert.equal(displayName, 'CopyLinkButton')
  })

  it('handles clipboard error path when writeText rejects inside CopyLinkButton handleCopy', async () => {
    const testError = new Error('Clipboard permission denied')
    let consoleErrorArgs: unknown[] = []

    console.error = (...args: unknown[]) => {
      consoleErrorArgs = args
    }

    const mockClipboard = {
      writeText: async () => {
        throw testError
      },
    }

    Object.defineProperty(globalThis, 'navigator', {
      value: { clipboard: mockClipboard },
      configurable: true,
      writable: true,
    })

    Object.defineProperty(globalThis, 'window', {
      value: Object.assign(Object.create(globalThis), {
        location: { href: 'https://example.com/test-article' },
      }),
      configurable: true,
      writable: true,
    })

    renderToStaticMarkup(
      React.createElement(TooltipProviderComponent, null, React.createElement(CopyLinkButtonComponent))
    )

    assert.equal(typeof capturedOnClick, 'function', 'onClick callback should have been captured from Button component')

    await capturedOnClick?.({ defaultPrevented: false })

    assert.equal(consoleErrorArgs.length, 2, 'console.error should have been called with 2 arguments')
    assert.equal(consoleErrorArgs[0], 'Failed to copy link: ')
    assert.equal(consoleErrorArgs[1], testError)
  })

  it('handles successful clipboard writeText inside CopyLinkButton handleCopy', async () => {
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

    Object.defineProperty(globalThis, 'window', {
      value: Object.assign(Object.create(globalThis), {
        location: { href: 'https://example.com/test-article' },
      }),
      configurable: true,
      writable: true,
    })

    renderToStaticMarkup(
      React.createElement(TooltipProviderComponent, null, React.createElement(CopyLinkButtonComponent))
    )

    assert.equal(typeof capturedOnClick, 'function', 'onClick callback should have been captured from Button component')

    await capturedOnClick?.({ defaultPrevented: false })

    assert.equal(copiedText, 'https://example.com/test-article')
  })
})
