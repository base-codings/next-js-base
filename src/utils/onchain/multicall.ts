/* eslint-disable @typescript-eslint/no-explicit-any */

import { AbiFunction } from 'viem'
import { multicall as multicallWagmi } from '@wagmi/core'
import { envConfig } from '../const'
import { wagmiAdapter } from '@/configs/wagmi'
import getDefineDataContract from './get-define-data-contract'

interface MulticalltParams {
  address: `0x${string}`
  reference?: string
  abi: readonly AbiFunction[]
  functions: {
    name?: string
    function: string
    args: any[]
  }[]
}

type IResult<T> = {
  result: T
  success: boolean
}

export type MulticallResult<T extends Record<string, any>> = {
  address: `0x${string}`
  reference?: string
} & {
  [K in keyof T]: IResult<T[K]>
}

export async function multicall<T extends Record<string, any>>(
  contracts: MulticalltParams[],
  chainId: number = envConfig.CHAIN_ID,
): Promise<MulticallResult<T>[]> {
  const result = await multicallWagmi(wagmiAdapter.wagmiConfig, {
    contracts: contracts
      .map((contract) => {
        return contract.functions.map((func) => {
          return {
            address: contract.address,
            abi: contract.abi,
            functionName: func.function,
            args: func.args,
          }
        })
      })
      .flatMap((x) => x),
    chainId: chainId,
  })

  const x = contracts.map((contract, contractIndex) => {
    const data: any = {
      address: contract.address,
      reference: contract?.reference,
    }
    contract.functions.forEach((func, funcIndex) => {
      const _result = result[contractIndex * contract.functions.length + funcIndex]
      data[func?.name || func.function] = {
        result: getDefineDataContract(func.function, _result.result, contract.abi as any),
        success: _result.status,
      }
    })
    return data
  })

  return x as any as MulticallResult<T>[]
}
