import { envConfig } from '@/utils'
import aeneid from './aeneid'
import { AppKitNetwork } from '@reown/appkit-common'

export const chainMap: {
  [key: number]: {
    key: string
    chain: AppKitNetwork
  }
} = {
  1315: {
    key: 'story',
    chain: aeneid,
  },
}

export const getInforChain = (chainID: number) => {
  chainID = Number(chainID)
  const chain = chainMap?.[chainID]

  if (!chain) {
    throw new Error('Chain not found')
  }

  return chain
}

export function getKeyChain(): string {
  const chainID = Number(envConfig.CHAIN_ID)
  return getInforChain(chainID)?.key
}

export function getChain(): AppKitNetwork {
  const chainID = Number(envConfig.CHAIN_ID)
  return getInforChain(chainID)?.chain
}
