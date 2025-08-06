'use client'
import { cn } from '@/libs'
import { cloneElement, FC, JSX } from 'react'

interface Props {
  icon: JSX.Element
  label: string
  isActive?: boolean
}

export const MenuItem: FC<Props> = ({ icon, label, isActive }) => {
  return (
    <div
      className={cn(
        'hover:bg-secondary-light group flex h-12 w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200',
        isActive && 'bg-secondary-light',
      )}
    >
      {cloneElement(icon, {
        className: `group-hover:fill-primary ${isActive && 'fill-primary'}`,
      })}
      <span
        className={cn(
          'text-primary-foreground-light group-hover:text-primary text-base group-hover:font-medium',
          isActive && 'text-primary font-medium',
        )}
      >
        {label}
      </span>
    </div>
  )
}
