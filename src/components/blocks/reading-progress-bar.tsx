'use client'

import { useEffect, useState } from 'react'

export const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false

    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const clientHeight = document.documentElement.clientHeight

      const totalScrollable = scrollHeight - clientHeight

      if (totalScrollable <= 0) {
        setProgress(100)
        ticking = false

        return
      }

      const currentProgress = (scrollTop / totalScrollable) * 100

      setProgress(currentProgress)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        // ⚡ Bolt: Use requestAnimationFrame to throttle updates and batch DOM reads/writes,
        // improving scroll performance and reducing layout thrashing.
        window.requestAnimationFrame(updateProgress)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    updateProgress()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      className='bg-primary/20 fixed top-0 left-0 z-[60] h-1 w-full'
      role='progressbar'
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      aria-label='Reading progress'
    >
      <div className='bg-primary h-full transition-all duration-150 ease-out' style={{ width: `${progress}%` }} />
    </div>
  )
}
