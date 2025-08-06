import { FC } from 'react'
import { Button } from '../common'
import useTranslations from '@/hooks/useTranslations'
import { WalletIcon } from '@/assets'
import { useAppKit } from '@reown/appkit/react'
import useAuthStore from '@/stores/useAuthStore'

interface Props {}

export const WalletButton: FC<Props> = () => {
  const { t } = useTranslations('common')
  const { open } = useAppKit()

  const isLogging = useAuthStore((state) => state.isLogging)

  return (
    <div className="absolute top-3 right-4 z-50">
      <Button
        loading={isLogging}
        onClick={() => {
          open({
            view: 'Connect',
          })
        }}
      >
        {t('common.connect')} <WalletIcon className="ml-2" />
      </Button>
    </div>
  )
}
