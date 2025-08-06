import { create } from 'zustand'

export interface IToken {
  imageUrl: string
  symbol: string
  name: string
}

type TokenStore = {
  token: IToken
}

const store = () => ({
  token: {
    imageUrl: '/images/tokens/solana.png',
    symbol: 'SOL',
    name: 'Solana',
  } as IToken,
})

const useTokenStore = create<TokenStore>(store)
export default useTokenStore

export function setTokenStore<T extends keyof TokenStore>(x: Pick<TokenStore, T>) {
  useTokenStore.setState(x)
}
