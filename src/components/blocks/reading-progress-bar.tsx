'use client'

import { useEffect, useRef } from 'react'

/**
 * ⚡ Bolt: Ref-based ReadingProgressBar to eliminate React re-renders during scroll.
 * Instead of updating state on every scroll frame, we use refs to modify the DOM directly.
 * This significantly reduces CPU overhead and keeps the main thread free for other tasks.
 */
export const ReadingProgressBar = () => {
  const progressRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false

    // ⚡ Bolt: Cache totalScrollable to avoid expensive DOM layout reads (scrollHeight, clientHeight)
    // on every scroll frame. Only update on resize or initial mount.
    let totalScrollable = 0

    const updateTotalScrollable = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight

      totalScrollable = scrollHeight - clientHeight
    }

    const updateProgress = () => {
      const scrollTop = window.scrollY

      // Calculate progress and ensure it stays between 0 and 100
      const currentProgress =
        totalScrollable <= 0 ? 100 : Math.min(100, Math.max(0, (scrollTop / totalScrollable) * 100))

      // ⚡ Bolt: Update DOM directly via refs to bypass React's reconciliation cycle.
      // ⚡ Bolt: Use transform: scaleX() instead of width to move the animation to the compositor thread.
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${currentProgress / 100})`
      }

      if (containerRef.current) {
        containerRef.current.setAttribute('aria-valuenow', Math.round(currentProgress).toString())
      }

      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        // ⚡ Bolt: Use requestAnimationFrame to throttle updates and align with the browser's paint cycle.
        window.requestAnimationFrame(updateProgress)
        ticking = true
      }
    }

    const onResize = () => {
      updateTotalScrollable()
      onScroll()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    // Initialize values
    updateTotalScrollable()
    updateProgress()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className='bg-primary/20 fixed top-0 left-0 z-[60] h-1 w-full'
      role='progressbar'
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      aria-label='Reading progress'
    >
      <div
        ref={progressRef}
        className='bg-primary h-full origin-left transition-transform duration-150 ease-out will-change-transform'
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
