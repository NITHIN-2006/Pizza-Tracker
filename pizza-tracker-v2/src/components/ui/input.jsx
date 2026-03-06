import * as React from 'react'
import { cn } from '@/lib/utils'

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-11 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 placeholder:text-slate-400 transition-all duration-150 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }
