import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { ITokenInfo, PoolAsset } from './types'
import { getPoolAssets, getTokenInfo } from './requests'
import { KEYS } from './keys'
import { useAppKitAccount } from '@reown/appkit/react'
import { contractConfig } from '@/configs/contracts'

export const useGetPoolAssets = (options?: Omit<UseQueryOptions<PoolAsset[], Error>, 'queryKey'>) => {
  const { address } = useAppKitAccount()

  return useQuery<PoolAsset[], Error>({
    queryKey: [KEYS.POOL_ASSETS, address || ''],
    queryFn: () => getPoolAssets(address),
    ...(options || {}),
  })
}

export const useGetTokenInfo = (
  address: `0x${string}` = contractConfig.TOKEN,
  options?: Omit<UseQueryOptions<ITokenInfo, Error>, 'queryKey'>,
) => {
  const { address: userAddress } = useAppKitAccount()

  return useQuery<ITokenInfo, Error>({
    queryKey: [KEYS.TOKEN_INFO, address],
    queryFn: () => getTokenInfo(address, (userAddress || '') as `0x${string}`),
    ...(options || {}),
    placeholderData: {
      address,
      balance: '0',
      name: '',
      symbol: '',
      decimals: 18,
    },
  })
}
