import { create } from 'zustand'

type AuthStore = {
  isLogged: boolean
  isLogging: boolean
  accessToken?: string
  userAddress?: string
}

const store = () => ({
  isLogged: false,
  isLogging: true,
  accessToken: undefined,
  userAddress: undefined,
})

const useAuthStore = create<AuthStore>(store)
export default useAuthStore

export function setAuthStore<T extends keyof AuthStore>(x: Pick<AuthStore, T>) {
  useAuthStore.setState(x)
}
