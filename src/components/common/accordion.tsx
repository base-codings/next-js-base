'use client'

import { FillPlusIcon } from '@/assets/icons/fill-plus'
import { cn } from '@/libs'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import * as React from 'react'

function Accordion({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn('border-table-border border-b', className)}
      data-slot="accordion-item"
      {...props}
    />
  )
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          'flex h-14 flex-1 items-center justify-between text-left text-sm font-medium transition-all',
          className,
        )}
        data-slot="accordion-trigger"
        {...props}
      >
        {children}
        <FillPlusIcon />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className={cn(
        'text-secondary-foreground-light data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down max-w-140 overflow-hidden text-sm transition-all',
        className,
      )}
      data-slot="accordion-content"
      {...props}
    >
      <div className="pt-0 pb-4">{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
