import { envConfig } from '@/utils'

export type ContractDataType = {
  TOKEN: `0x${string}`
  MATH: `0x${string}`
  POOL: `0x${string}`
  STAKING: `0x${string}`
  ESTIMATOR: `0x${string}`
}

type AllPhases = {
  [key: number]: ContractDataType
}

type PartialPhasesWithDefault = {
  default: ContractDataType
} & Partial<AllPhases>

export type DefineContractType = AllPhases | PartialPhasesWithDefault

export const getContractConfig = (contracts: DefineContractType): ContractDataType => {
  const chainID = envConfig.CHAIN_ID

  if (chainID && contracts?.[chainID]) {
    const contractConfig = contracts[chainID]
    if (contractConfig) {
      return contractConfig
    }
  }

  if ('default' in contracts) {
    return contracts.default
  }

  throw new Error('Invalid contracts configuration')
}
