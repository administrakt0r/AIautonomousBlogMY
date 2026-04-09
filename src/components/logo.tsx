import React from 'react'

import Image from 'next/image'

// Util Imports
import { cn } from '@/lib/utils'

// ⚡ Bolt: Memoize the Logo component to prevent redundant re-renders when Header state changes.
const Logo = React.memo(({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      {/* ⚡ Bolt: Add priority attribute as this is a critical above-the-fold brand asset. */}
      <Image src='/shteflogo.svg' alt='' width={32} height={32} priority className='h-8 w-8 rounded-sm' />
      <span className='text-primary text-[20px] font-semibold tracking-tight'>ShtefAI blog</span>
    </div>
  )
})

Logo.displayName = 'Logo'

export default Logo
