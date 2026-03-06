import * as React from 'react'
import { cn } from '@/lib/utils'

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-150 resize-none',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea'

export { Textarea }
