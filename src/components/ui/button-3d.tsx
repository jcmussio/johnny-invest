import * as React from 'react'
import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

const button3dVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-bold uppercase tracking-widest ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-y-[4px] active:border-b-0 border-b-4',
  {
    variants: {
      variant: {
        default:
          'bg-duo-green text-white border-duo-green-shade hover:bg-duo-green/90',
        primary:
          'bg-duo-green text-white border-duo-green-shade hover:bg-duo-green/90',
        secondary: 'bg-white text-duo-blue border-duo-gray hover:bg-slate-50',
        outline:
          'bg-transparent border-2 border-duo-gray text-duo-text border-b-4 hover:bg-slate-50',
        danger:
          'bg-duo-red text-white border-duo-red-shade hover:bg-duo-red/90',
        super:
          'bg-duo-purple text-white border-duo-purple-shade hover:bg-duo-purple/90',
        ghost:
          'bg-transparent border-transparent text-duo-blue hover:bg-slate-100 active:border-none active:translate-y-0',
        locked:
          'bg-duo-gray text-stone-400 border-stone-300 pointer-events-none',
      },
      size: {
        default: 'h-12 px-6 py-2',
        sm: 'h-10 rounded-xl px-4 text-xs',
        lg: 'h-14 rounded-2xl px-10 text-base',
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
