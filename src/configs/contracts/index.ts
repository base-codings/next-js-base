import { ContractDataType, DefineContractType, getContractConfig } from './types'

const aeneidConfig: ContractDataType = {
  TOKEN: '0xECef388494E17F9595e89DDfaA70BdF6867e9fa8',
  MATH: '0xa2a39ddEbffF344570dDd05B76461dD87040b654',
  POOL: '0xfd1cbA7494bA2fa34CbcF9AAd82BB3E453739cc0',
  STAKING: '0x56eeAB4e96206a9007b7A329d6d7901c524Bee13',
  ESTIMATOR: '0x82c63ffa80751a59273e376bF9039bE3A2e0568F',
}

const DEFINE_CONTRACTS: DefineContractType = {
  1315: aeneidConfig,
}

export const contractConfig: ContractDataType = getContractConfig(DEFINE_CONTRACTS)
