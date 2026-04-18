'use client'

import { Toaster } from '@/components/base/toaster'
import { FCC } from '@/core/types/common.type'
import { memo } from 'react'

export const LayoutProvider: FCC = memo(({ children }) => {
    return (
        <div className="flex h-screen w-full">
            <main className="max-w-full flex-1">{children}</main>
            <Toaster />
        </div>
    )
})

LayoutProvider.displayName = 'LayoutProvider'
