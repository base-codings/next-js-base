/* eslint-disable @typescript-eslint/no-explicit-any */

import { AbiFunction } from 'viem'

function getDefineDataContract<T>(functionName: string, data: any, abi: AbiFunction[]): T | undefined {
  const dataStruct: AbiFunction | undefined = abi?.find((item: any) => item?.name === functionName)
  const outputs = dataStruct?.outputs
  const propsName = outputs?.map?.((item: any) => item?.name)
  if (!propsName?.[0]) return data
  if (typeof data !== 'object') {
    return data
  }
  if (propsName?.length > 0) {
    const res = propsName.reduce((acc: any, curr: any, index: number) => {
      acc[curr] = data?.[index]
      return acc
    }, {})
    return res
  }
  return undefined
}

export default getDefineDataContract
