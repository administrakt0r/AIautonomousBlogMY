import React from 'react'

import Image from 'next/image'

// Util Imports
import { cn } from '@/lib/utils'

// ⚡ Bolt: Memoize the Logo component to prevent redundant re-renders when Header state changes.
const Logo = React.memo(({ className, id }: { className?: string; id?: string }) => {
  return (
    <div id={id} tabIndex={-1} className={cn('group flex items-center gap-2.5 outline-none', className)}>
      {/* ⚡ Bolt: Add priority attribute as this is a critical above-the-fold brand asset. */}
      {/* 🎨 Palette: Add a subtle rotation on hover for a touch of delight. */}
      <Image
        src='/shteflogo.svg'
        alt=''
        width={32}
        height={32}
        priority
        className='h-8 w-8 rounded-sm transition-transform duration-300 group-hover:rotate-12'
      />
      <span className='text-primary text-[20px] font-semibold tracking-tight'>ShtefAI blog</span>
    </div>
  )
})

Logo.displayName = 'Logo'

export default Logo
