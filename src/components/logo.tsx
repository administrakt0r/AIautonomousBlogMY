// Util Imports
import { cn } from '@/lib/utils'

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span className='text-2xl'>⚡</span>
      <span className='text-primary text-[20px] font-semibold tracking-tight'>ShtefAI blog</span>
    </div>
  )
}

export default Logo
