import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { cookieStorage, createStorage } from 'wagmi'
import { envConfig } from '@/utils'
import { getChain } from './chains'
import { AppKitNetwork } from '@reown/appkit-common'

export const projectId = envConfig.PROJECT_ID

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const networks = [getChain()] as AppKitNetwork[]

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
})

export const wagmiConfig = wagmiAdapter.wagmiConfig
