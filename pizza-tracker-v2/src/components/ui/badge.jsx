import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-1 text-xs font-700 transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-brand-500 text-white',
        secondary: 'border-transparent bg-slate-100 text-slate-700',
        destructive: 'border-transparent bg-red-100 text-red-700',
        outline: 'border-slate-200 text-slate-700',
        placed: 'border-transparent bg-blue-100 text-blue-700',
        preparing: 'border-transparent bg-amber-100 text-amber-700',
        baking: 'border-transparent bg-orange-100 text-orange-700',
        quality: 'border-transparent bg-purple-100 text-purple-700',
        ready: 'border-transparent bg-emerald-100 text-emerald-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
