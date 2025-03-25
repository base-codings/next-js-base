import { create } from 'zustand';

type StoreGlobalType = {
  zIndexModal: number;
};

const store = () => ({
  zIndexModal: 0,
});

const useStoreGlobal = create<StoreGlobalType>(store);

export default useStoreGlobal;

export function setStoreGlobal<T extends keyof StoreGlobalType>(x: Pick<StoreGlobalType, T>) {
  useStoreGlobal.setState(x);
}
