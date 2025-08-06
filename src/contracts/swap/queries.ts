import { useMutation } from '@tanstack/react-query'
import { useGetPoolAssets } from '../general'
import { useAppKitAccount } from '@reown/appkit/react'
import { KEYS } from './keys'
import useTranslations from '@/hooks/useTranslations'
import { SwapPayload } from './types'
import { swapRequest } from './requests'

export const useMutateSwap = () => {
  const { refetch } = useGetPoolAssets()
  const { address } = useAppKitAccount()
  const { t } = useTranslations('common')
  return useMutation({
    mutationFn: (payload: SwapPayload) => swapRequest(payload, t, address),
    mutationKey: [KEYS.SWAP, address],
    onSuccess: (data) => {
      refetch()
      console.log('Swap successful', data)
    },
    onError: (error) => {
      console.error('Swap failed', error)
    },
  })
}
