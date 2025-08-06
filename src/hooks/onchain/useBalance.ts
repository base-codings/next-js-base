import TOKEN_ABI from '@/assets/abis/Token.json'

import { wagmiAdapter } from '@/configs/wagmi'
import { envConfig } from '@/utils'
import { useAppKitAccount } from '@reown/appkit/react'
import { useQuery } from '@tanstack/react-query'
import { getBalance, readContract } from '@wagmi/core'
import { formatUnits } from 'viem'

type UseBalanceParams = {
  address?: `0x${string}`
  chainId?: number
}

const useBalance = (params?: UseBalanceParams) => {
  const { chainId = envConfig.CHAIN_ID, address } = params || {}

  const { address: account } = useAppKitAccount()

  return useQuery({
    queryKey: ['balance', account, chainId, address],
    queryFn: async () => {
      if (address) {
        const decimals = await readContract(wagmiAdapter.wagmiConfig, {
          address: address as `0x${string}`,
          chainId,
          functionName: 'decimals',
          abi: TOKEN_ABI,
          account: account as `0x${string}`,
        })
        const symbol = await readContract(wagmiAdapter.wagmiConfig, {
          address: address as `0x${string}`,
          chainId,
          functionName: 'symbol',
          abi: TOKEN_ABI,
          account: account as `0x${string}`,
        })
        const balance: bigint = (await readContract(wagmiAdapter.wagmiConfig, {
          address: address as `0x${string}`,
          chainId,
          functionName: 'balanceOf',
          args: [account],
          abi: TOKEN_ABI,
          account: account as `0x${string}`,
        })) as unknown as bigint
        return {
          decimals: Number(decimals),
          symbol: String(symbol),
          value: balance,
          formatted: formatUnits(balance, Number(decimals)),
        }
      } else {
        const balance = await getBalance(wagmiAdapter.wagmiConfig, {
          address: account as `0x${string}`,
          token: address,
          chainId,
        })
        return balance
      }
    },
    enabled: !!account,
  })
}

export default useBalance
