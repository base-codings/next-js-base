'use client'

import { FillCheckIcon, FillXIcon, LoadingIcon } from '@/assets'
import ProfileButton from '@/components/layout/ProfileButton'
import { Sidebar } from '@/components/layout/Sidebar'
import { WalletButton } from '@/components/layout/WalletButton'
import { LoadingAll } from '@/components/ui/Loading'
import useAuthStore from '@/stores/useAuthStore'
import { FCC } from '@/types'
import { useAppKitAccount } from '@reown/appkit/react'
import { memo, useMemo } from 'react'
import { Toaster } from 'sonner'

const LayoutProvider: FCC = ({ children }) => {
  const isLogged = useAuthStore((state) => state.isLogged)
  const { status } = useAppKitAccount()

  const isLoading = useMemo(() => {
    return status === 'reconnecting'
  }, [status])

  return (
    <>
      <div className="flex h-screen w-full">
        <Sidebar />
        <main className="lg:pl-sidebar max-w-full flex-1">{children}</main>
        {isLogged ? <ProfileButton /> : <WalletButton />}
        <Toaster
          theme="dark"
          position="top-center"
          toastOptions={{
            className: 'sonner',
            classNames: {
              icon: '!w-5 !h-5',
            },
          }}
          icons={{
            success: <FillCheckIcon className="*:fill-success" />,
            error: <FillXIcon className="*:fill-error" />,
            loading: <LoadingIcon />,
          }}
        />
      </div>
      {isLoading && <LoadingAll />}
    </>
  )
}

export default memo(LayoutProvider)
