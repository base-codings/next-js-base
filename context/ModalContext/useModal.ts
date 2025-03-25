import { useCallback, useContext } from 'react';
import { ModalContext } from './ModalProvider';

const useModalBase = (key: string) => {
  const context = useContext(ModalContext);
  const modal = context?.state;

  function createOpenFunction(key: string) {
    const modalNow = modal?.[key];
    return (value: boolean, data = {}) => {
      context?.setState((prev) => {
        const newVal = value;
        const newObj = { ...prev, [key]: { ...modalNow, isOpen: newVal, data } };
        return newObj;
      });
    };
  }

  if (key !== '') {
    const modalNow = modal?.[key];
    const setIsOpen = createOpenFunction(key);
    return { ...modalNow, setIsOpen, isOpen: modalNow?.isOpen, data: modalNow?.data || {} };
  }
  return context;
};

export type UseModalResponse<T> = {
  open: (params?: T) => void;
  close: () => void;
  isOpen: boolean;
  isPendingOpen: boolean;
  data: T;
};

function useModal<T>(key: string) {
  const { isOpen, setIsOpen, data } = useModalBase(key);
  function open(params: T) {
    setIsOpen(true, params);
  }
  function close() {
    setIsOpen(false);
  }
  return { isOpen, open, close, data, isPendingOpen: false } as UseModalResponse<T>;
}

export const useControlModal = () => {
  const context = useContext(ModalContext);
  const closeAllModal = useCallback(() => {
    context?.setState((prev) => {
      const newObj = { ...prev };
      Object.keys(newObj).forEach((key) => {
        newObj[key].isOpen = false;
      });
      return newObj;
    });
  }, [context]);
  return { closeAllModal };
};

export default useModal;
