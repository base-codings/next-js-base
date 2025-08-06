'use client'

import { FCC } from '@/types'
import React from 'react'
import { Button } from '../common'
import { useAppKitAccount } from '@reown/appkit/react'
import { shortAddress } from '@/utils/string'
import { authLogout } from '@/utils/auth'
import Image from 'next/image'

const ProfileButton: FCC = () => {
  const { address } = useAppKitAccount()

  const [isDisconnecting, setIsDisconnecting] = React.useState(false)

  return (
    <div className="absolute top-3 right-4 z-50">
      <Button
        className="py-1.5 pl-1.5"
        withAnimation
        loading={isDisconnecting}
        variant="secondary"
        onClick={async () => {
          try {
            setIsDisconnecting(true)
            await authLogout()
          } finally {
            setIsDisconnecting(false)
          }
        }}
      >
        <div className="flex items-center gap-[10px]">
          <Image
            width={32}
            height={32}
            alt="avatar"
            loading="lazy"
            src="/images/avatars/1.svg"
            className="h-[32px] w-[32px]"
          />
          <span>{shortAddress(address || '', 5, 4)}</span>
        </div>
      </Button>
    </div>
  )
}

export default ProfileButton
