import { AppKitNetwork } from '@reown/appkit-common'

const storyAeneid: AppKitNetwork = {
  id: 1315,
  caipNetworkId: 'eip155:1315' as `eip155:${string}`,
  contracts: {
    multicall3: {
      address: '0x0B1adBE31c8739BeBDba737b76893C1d0665fB3B',
    },
  },
  nativeCurrency: {
    name: 'Story',
    symbol: 'IP',
    decimals: 18,
  },
  chainNamespace: 'eip155',
  name: 'Story Public Testnet (Aeneid)',
  rpcUrls: {
    default: {
      http: ['https://dark-thrilling-market.story-aeneid.quiknode.pro/9ec30f251b4da614b70ed5ba26c0cc270b2c9ef2/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Story Explorer',
      url: 'https://aeneid.storyscan.xyz',
    },
  },
  assets: {
    imageId: '',
    imageUrl: '/assets/tokens/native-logo/story.png',
  },
  testnet: true,
}

export default storyAeneid
