import { useMutation } from '@tanstack/react-query'
import { useGetPoolAssets, useGetTokenInfo } from '../general'
import { useAppKitAccount } from '@reown/appkit/react'
import { KEYS } from './keys'
import useTranslations from '@/hooks/useTranslations'
import { WithdrawPayload } from './types'
import { withdrawRequest } from './requests'

export const useMutateWithdraw = () => {
  const { data: listTokens, refetch } = useGetPoolAssets()
  const { data: tokenInfo, refetch: refetchTokenInfo } = useGetTokenInfo()
  const { address } = useAppKitAccount()
  const { t } = useTranslations('common')
  return useMutation({
    mutationFn: (payload: WithdrawPayload) => withdrawRequest(payload, t, tokenInfo, listTokens, address),
    mutationKey: [KEYS.WITHDRAW, address],
    onSuccess: (data) => {
      refetch()
      refetchTokenInfo()
      console.log('Withdraw successful', data)
    },
    onError: (error) => {
      console.error('Withdraw failed', error)
    },
  })
}
