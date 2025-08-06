import POOL_ABI from '@/assets/abis/Pool.json'
import TOKEN_ABI from '@/assets/abis/Token.json'

import { readContract } from '@wagmi/core'
import { ITokenInfo, PoolAsset } from './types'
import { wagmiConfig } from '@/configs/wagmi'
import { contractConfig } from '@/configs/contracts'
import { envConfig } from '@/utils'
import { multicall } from '@/utils/onchain/multicall'
import { AbiFunction, formatEther, formatUnits } from 'viem'
import { uiConfig } from '@/configs/ui'

export const getPoolAssets = async (address?: string): Promise<PoolAsset[]> => {
  try {
    const numAssets = await readContract(wagmiConfig, {
      address: contractConfig.POOL,
      abi: POOL_ABI,
      functionName: 'num_assets',
      chainId: envConfig.CHAIN_ID,
    })

    const listToken = await multicall<{
      assets: `0x${string}`
      rate: bigint
      virtual_balance: bigint
      weight: bigint[]
    }>(
      Array.from({ length: Number(numAssets || 0) }, (_, index) => ({
        address: contractConfig.POOL,
        reference: `asset_${index}`,
        abi: POOL_ABI as AbiFunction[],
        functions: [
          {
            function: 'assets',
            args: [index],
          },
          {
            function: 'rate',
            args: [index],
          },
          {
            function: 'virtual_balance',
            args: [index],
          },
          {
            function: 'weight',
            args: [index],
          },
        ],
      })),
    )

    const listTokenInfo = await multicall<{
      name: string
      symbol: string
      decimals: bigint
      balanceOf: bigint
      balanceOfPool: bigint
    }>(
      listToken.map((item) => ({
        address: item.assets.result,
        reference: item.assets.result,
        abi: TOKEN_ABI as AbiFunction[],
        functions: [
          {
            function: 'name',
            args: [],
          },
          {
            function: 'symbol',
            args: [],
          },
          {
            function: 'decimals',
            args: [],
          },
          {
            function: 'balanceOf',
            args: [address as `0x${string}`],
          },
          {
            function: 'balanceOf',
            name: 'balanceOfPool',
            args: [contractConfig.POOL as `0x${string}`],
          },
        ],
      })),
    )

    const assets: PoolAsset[] = listToken.map((item, index) => {
      const tokenInfo = listTokenInfo.find((token) => token.address === item.assets.result)
      const weight = {
        current: formatEther(item.weight.result[0]),
        target: formatEther(item.weight.result[1]),
        lower: formatEther(item.weight.result[2]),
        upper: formatEther(item.weight.result[3]),
      }

      if (tokenInfo) {
        return {
          address: item.assets.result,
          rate: formatEther(item.rate.result),
          virtual_balance: formatEther(item.virtual_balance.result),
          // pool_balance: toBig(String(item.virtual_balance.result))
          //   .div(toBig(String(item.rate.result)))
          //   .toString(),
          pool_balance: formatUnits(BigInt(tokenInfo?.balanceOfPool?.result || '0'), Number(tokenInfo.decimals.result)),
          weight: weight,
          name: tokenInfo.name.result,
          symbol: tokenInfo.symbol.result,
          balance: formatUnits(BigInt(tokenInfo?.balanceOf?.result || '0'), Number(tokenInfo.decimals.result)),
          decimals: Number(tokenInfo.decimals.result),
          index,
        }
      }
      return {
        address: item.assets.result,
        rate: formatEther(item.rate.result),
        virtual_balance: formatUnits(item.virtual_balance.result, 18), // Default to 18 decimals if token info is not found
        pool_balance: '0',
        balance: '0',
        weight: weight,
        name: '',
        symbol: '',
        decimals: 0,
        index,
      }
    })

    return assets
  } catch (error) {
    console.error('Error fetching pool assets:', error)
    return []
  }
}

export const getTokenInfo = async (address: `0x${string}`, userAddress: `0x${string}`): Promise<ITokenInfo> => {
  const tokenInfoMulticall = await multicall<{
    name: string
    symbol: string
    decimals: bigint
    balanceOf: bigint
    balanceOfPool: bigint
  }>([
    {
      address: address,
      reference: address,
      abi: TOKEN_ABI as AbiFunction[],
      functions: [
        {
          function: 'name',
          args: [],
        },
        {
          function: 'symbol',
          args: [],
        },
        {
          function: 'decimals',
          args: [],
        },
        {
          function: 'balanceOf',
          args: [userAddress as `0x${string}`],
        },
      ],
    },
  ])
  const tokenInfo = tokenInfoMulticall?.[0]
  const name = address === contractConfig.TOKEN ? uiConfig.TOKEN_NAME : tokenInfo?.name.result || ''
  const symbol = address === contractConfig.TOKEN ? uiConfig.TOKEN_SYMBOL : tokenInfo?.symbol.result || ''
  const asset: ITokenInfo = {
    address: tokenInfo?.address || address,
    balance: formatUnits(BigInt(tokenInfo?.balanceOf?.result || '0'), Number(tokenInfo?.decimals.result)) || '0',
    name,
    symbol,
    decimals: Number(tokenInfo?.decimals.result) || 18,
  }
  return asset
}
