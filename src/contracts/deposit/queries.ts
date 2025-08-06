import { useMutation } from '@tanstack/react-query'
import { depositRequest } from './requests'
import { DepositPayload } from './types'
import { useGetPoolAssets } from '../general'
import { useAppKitAccount } from '@reown/appkit/react'
import { KEYS } from './keys'
import useTranslations from '@/hooks/useTranslations'

export const useMutateDeposit = () => {
  const { refetch } = useGetPoolAssets()
  const { address } = useAppKitAccount()
  const { t } = useTranslations('common')
  return useMutation({
    mutationFn: (payload: DepositPayload) => depositRequest(payload, t, address),
    mutationKey: [KEYS.DEPOSIT, address],
    onSuccess: (data) => {
      refetch()
      console.log('Deposit successful', data)
    },
    onError: (error) => {
      console.error('Deposit failed', error)
    },
  })
}
