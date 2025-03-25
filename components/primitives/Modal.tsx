import { AnimatePresence, motion } from 'framer-motion';
import React, { memo, useEffect } from 'react';

import useStoreGlobal, { setStoreGlobal } from '~/store/useStoreGlobal';
import { cn } from '~/utils/base';

interface ModalIF {
  isOpen: boolean;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
  hideBackdrop?: boolean;
  zIndexForce?: number;
  maxWidth?: string;
  hideBaseUI?: boolean;
  keyName: string;
  closeAllWhenOpen?: boolean;
  needAuth?: boolean;
  centerMobile?: boolean;
}

const initZIndex = 120;

const Modal: React.FC<ModalIF> = ({
  isOpen,
  children,
  onClose = () => {},
  closeAllWhenOpen = false,
  zIndexForce = 0,
  hideBackdrop = false,
  className = '',
  maxWidth = '548px',
  hideBaseUI = false,
  keyName,
  needAuth,
  centerMobile = false,
}) => {
  const zIndexModal = useStoreGlobal((state) => state.zIndexModal);
  const [zIndex, setZIndex] = React.useState(initZIndex);

  useEffect(() => {
    if (zIndexForce > 0) {
      setZIndex(zIndexForce);
    } else {
      if (isOpen) {
        setZIndex((prev) => prev + zIndexModal);
        setStoreGlobal({ zIndexModal: zIndexModal + 1 });
      } else {
        setZIndex(initZIndex);
        setStoreGlobal({ zIndexModal: zIndexModal - 1 });
      }
    }
  }, [isOpen, zIndexForce]);

  useEffect(() => {
    if (isOpen && hideBackdrop) {
      const handleClickOutside = (e: any) => {
        const target = e.target as HTMLElement;
        if (!target.closest('#modal-content') && !target.closest('#menu-bar')) {
          onClose();
        }
      };

      window.addEventListener('mousedown', handleClickOutside);

      return () => {
        window.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, onClose, hideBackdrop]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className={cn(
            'max-w-[100dvw] max-h-[100dvh] fixed top-0 left-0 right-0 bottom-[192px] sm:bottom-[81px] flex sm:items-center items-end justify-center pointer-events-none',
            {
              'items-center': centerMobile,
            }
          )}
          style={{ zIndex }}
        >
          {!hideBackdrop && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-neutral-alpha-white-80 absolute w-full h-full z-[150] backdrop-blur-[2px] pointer-events-auto"
              onClick={onClose}
            />
          )}
          <motion.div
            id="modal-content"
            initial={{
              y: 40,
              opacity: 0,
            }}
            animate={{
              x: 0,
              y: 0,
              opacity: 1,
              transition: {
                y: { delay: 0.1, duration: 0.4 },
                opacity: { duration: 0.6 },
              },
            }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{
              ease: [0, 0, 0.4, 1],
            }}
            style={{
              width: 'calc(100% - 24px)',
              maxWidth: maxWidth,
              position: 'relative',
              zIndex: 160,
              pointerEvents: 'auto',
              maxHeight: 'calc(100% - 16px)',
              overflow: 'auto',
              marginTop: '16px',

              ...(!hideBaseUI && {
                background: '#FAF1F8',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '12px',
                borderRadius: '16px',
                boxShadow: '0px 12px 24px 0px #723B6429',
              }),
            }}
          >
            {!hideBaseUI && <div className="w-[64px] h-[4px] bg-[#723B6414] rounded-full mb-[16px]" />}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default memo(Modal);
