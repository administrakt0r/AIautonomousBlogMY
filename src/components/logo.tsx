// Util Imports
import { cn } from '@/lib/utils'

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <img
        src='/shteflogo.svg'
        alt='ShtefAI Logo'
        width={32}
        height={32}
        decoding='async'
        className='h-8 w-8 rounded-sm'
      />
      <span className='text-primary text-[20px] font-semibold tracking-tight'>ShtefAI blog</span>
    </div>
  )
}

export default Logo
