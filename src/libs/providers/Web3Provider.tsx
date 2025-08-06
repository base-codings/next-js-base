'use client'

import { siteConfig } from '@/configs/site'
import { networks, projectId, wagmiAdapter, wagmiConfig } from '@/configs/wagmi'
import { FCC } from '@/types'
import { createAppKit } from '@reown/appkit/react'
import { memo } from 'react'
import { Config, cookieToInitialState, WagmiProvider } from 'wagmi'
import type { AppKitNetwork } from '@reown/appkit-common'

if (!projectId) {
  throw new Error('Project ID is not defined')
}

const metadata = {
  name: siteConfig.title,
  description: siteConfig.description,
  url: siteConfig.url,
  icons: [siteConfig.ogImage],
}

createAppKit({
  adapters: [wagmiAdapter],
  projectId: projectId,
  networks: networks as [AppKitNetwork, ...AppKitNetwork[]],
  defaultNetwork: networks[0],
  metadata: metadata,
  // features: {
  //   analytics: true,
  // },
})

const Web3Provider: FCC<{ cookies: string }> = ({ children, cookies }) => {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)
  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      {children}
    </WagmiProvider>
  )
}

export default memo(Web3Provider)
