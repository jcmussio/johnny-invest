import * as React from 'react'
import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

const button3dVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-bold uppercase tracking-widest ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-y-[4px] active:border-b-0 border-b-4',
  {
    variants: {
      variant: {
        default: 'bg-navy text-white border-navy-shade hover:bg-navy/90',
        primary: 'bg-navy text-white border-navy-shade hover:bg-navy/90',
        secondary: 'bg-silver text-navy border-silver-shade hover:bg-silver/90',
        outline:
          'bg-transparent border-2 border-silver text-silver border-b-4 hover:bg-[#22355c]',
        danger: 'bg-red-500 text-white border-red-700 hover:bg-red-500/90',
        super: 'bg-emerald text-white border-emerald-shade hover:bg-emerald/90',
        success: 'bg-[#10b981] text-white border-[#047857] hover:bg-[#0e9f6e]',
        ghost:
          'bg-transparent border-transparent text-navy hover:bg-slate-100 active:border-none active:translate-y-0',
        locked:
          'bg-slate-200 text-slate-400 border-slate-300 pointer-events-none',
      },
      size: {
        default: 'h-12 px-6 py-2',
        sm: 'h-10 rounded-md px-4 text-xs',
        lg: 'h-14 rounded-xl px-10 text-base',
        icon: 'h-12 w-12',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface Button3DProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button3dVariants> {
  asChild?: boolean
}

const Button3D = React.forwardRef<HTMLButtonElement, Button3DProps>(
  ({ className, variant, size, fullWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(
          button3dVariants({ variant, size, fullWidth, className }),
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Button3D.displayName = 'Button3D'

export { Button3D, button3dVariants }
