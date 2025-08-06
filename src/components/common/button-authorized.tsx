import { FillRightIcon } from '@/assets'
import useTranslations from '@/hooks/useTranslations'
import useAuthStore from '@/stores/useAuthStore'
import React from 'react'
import { Button, ButtonProps } from './button'
import { FCC } from '@/types'
import { useAppKit } from '@reown/appkit/react'

interface ButtonAuthorizedProps extends ButtonProps {}

const RequireConnect = () => {
  const { t } = useTranslations('common')

  return (
    <>
      {t('common.connect_wallet')}
      <FillRightIcon className="ml-2" />
    </>
  )
}

const ButtonAuthorized: FCC<ButtonAuthorizedProps> = ({ children, onClick, loading, asChild, ...props }) => {
  const isLogged = useAuthStore((state) => state.isLogged)
  const isLogging = useAuthStore((state) => state.isLogging)

  const { open } = useAppKit()

  return (
    <Button
      asChild={asChild && isLogged}
      onClick={(e) => {
        if (!isLogged) {
          e.preventDefault()
          open({ view: 'Connect' })
          return
        }
        onClick?.(e)
      }}
      loading={loading || isLogging}
      {...props}
    >
      {isLogged ? children : <RequireConnect />}
    </Button>
  )
}

export default ButtonAuthorized
