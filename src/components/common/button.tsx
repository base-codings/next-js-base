import { cn } from '@/libs'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, type MotionProps } from 'framer-motion'
import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import { RevealHover } from './reveal-hover'
import { LoadingIcon } from '@/assets'
import useIsMount from '@/hooks/useIsMount'

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center rounded-md text-sm font-chakra font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none ',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground disabled:text-primary-foreground-light',
        secondary:
          'bg-secondary text-secondary-foreground disabled:text-secondary-foreground-light disabled:bg-secondary-light',
        tertiary:
          'bg-tertiary text-tertiary-foreground disabled:text-tertiary-foreground-light disabled:bg-tertiary-light',
        highlight:
          'bg-tertiary-foreground text-primary-foreground disabled:text-primary-foreground-light disabled:bg-tertiary-light',
      },
      size: {
        default: 'h-10 px-4 py-2.5 text-sm',
        sm: 'h-12 text-sm',
      },
      rounded: {
        default: 'rounded-full',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        '3xl': 'rounded-3xl',
        '4xl': 'rounded-4xl',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default',
    },
  },
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  withAnimation?: boolean
  loading?: boolean
  motionProps?: MotionProps
  children?: React.ReactNode
  revealClassName?: string
}

const Button = React.memo(
  React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
      {
        className,
        variant,
        size,
        rounded,
        asChild = false,
        withAnimation = false,
        loading = false,
        motionProps,
        children,
        revealClassName,
        disabled,
        ...props
      },
      ref,
    ) => {
      const Comp = asChild ? Slot : 'button'

      const isMount = useIsMount()

      if (!isMount) return null

      if (withAnimation) {
        const MotionComp = motion.create(Comp as React.ElementType)

        return (
          <MotionComp
            className={cn(buttonVariants({ variant, size, rounded, className }))}
            disabled={disabled || loading}
            ref={ref}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.2 }}
            {...motionProps}
            {...props}
          >
            {children}
          </MotionComp>
        )
      }

      return (
        <Comp
          disabled={disabled || loading}
          className={cn(buttonVariants({ variant, size, rounded, className }))}
          ref={ref}
          {...props}
        >
          {asChild ? (
            children
          ) : (
            <RevealHover revealClassName={revealClassName}>{loading ? <LoadingIcon /> : children}</RevealHover>
          )}
        </Comp>
      )
    },
  ),
)
Button.displayName = 'Button'

export { Button, buttonVariants }
