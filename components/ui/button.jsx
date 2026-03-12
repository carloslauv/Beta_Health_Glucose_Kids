import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils.js'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:   'bg-indigo-600 text-white hover:bg-indigo-700',
        secondary: 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200',
        outline:   'border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50',
        ghost:     'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900',
        danger:    'bg-red-500 text-white hover:bg-red-600',
      },
      size: {
        sm:   'h-8 px-3 text-xs',
        md:   'h-9 px-4',
        lg:   'h-10 px-5',
        icon: 'h-9 w-9 p-0',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  }
)

export function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
}
