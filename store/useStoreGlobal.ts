import { create } from 'zustand';

type StoreGlobalType = {
  zIndexModal: number;
  isStorePage: boolean;
};

const store = () => ({
  zIndexModal: 0,
  isStorePage: false,
});

const useStoreGlobal = create<StoreGlobalType>(store);

export default useStoreGlobal;

export function setStoreGlobal<T extends keyof StoreGlobalType>(x: Pick<StoreGlobalType, T>) {
  useStoreGlobal.setState(x);
}
