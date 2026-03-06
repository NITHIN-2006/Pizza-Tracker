import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-700 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    variants: {
      variant: {
        default:
          'bg-brand-500 text-white shadow-md shadow-brand-200 hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-200',
        destructive:
          'bg-red-500 text-white shadow-sm hover:bg-red-600',
        outline:
          'border-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300',
        secondary:
          'bg-slate-100 text-slate-700 hover:bg-slate-200',
        ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
        link: 'text-brand-600 underline-offset-4 hover:underline',
        success: 'bg-emerald-500 text-white shadow-sm hover:bg-emerald-600',
      },
      size: {
        default: 'h-11 px-5 py-2',
        sm: 'h-9 rounded-lg px-4 text-xs',
        lg: 'h-13 px-8 py-3 text-base',
        xl: 'h-14 px-10 py-4 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = 'Button'

export { Button, buttonVariants }
