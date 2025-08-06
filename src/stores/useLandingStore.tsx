import { create } from 'zustand'

type LandingStore = {}

const store = () => ({})

const useLandingStore = create<LandingStore>(store)
export default useLandingStore

export function setLandingStore<T extends keyof LandingStore>(x: Pick<LandingStore, T>) {
  useLandingStore.setState(x)
}
