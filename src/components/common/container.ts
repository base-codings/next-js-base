import { cva } from 'class-variance-authority'

export const container = cva('mx-auto w-full', {
  variants: {
    size: {
      default: 'max-w-[1440px] px-4 lg:px-10 xl:px-[155px]',
      lg: 'max-w-[1440px] px-4 lg:px-10 xl:px-[90px]',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})
