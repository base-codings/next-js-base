import { AnimatePresence, motion } from 'framer-motion';
import React, { useMemo } from 'react';
import toast, { Toast as ToastHot } from 'react-hot-toast';
import { ToastIF, ToastType } from '~/@types/toast';
import { cn } from '~/utils/base';
import CloseIcon from '../icons/CloseIcon';
import CheckIcon from '../icons/CheckIcon';
import Typography from '@mui/material/Typography';

type DEFINE_COLOR_TYPE = {
  [key in ToastType]: {
    contentColor: string;
  };
};

const DEFINE_COLOR: DEFINE_COLOR_TYPE = {
  ['success']: {
    contentColor: '#4A982C',
  },
  ['error']: {
    contentColor: '#9D4646',
  },
};

interface ToastProps extends ToastIF {
  t: ToastHot;
}

const Toast: React.FC<ToastProps> = ({ type = 'success', title, content, t }) => {
  function remove() {
    toast.dismiss(t.id);
  }

  const BoxTypeDefine = useMemo(() => {
    return DEFINE_COLOR[type];
  }, [type]);

  return (
    <AnimatePresence>
      {t.visible ? (
        <motion.div
          layout
          key={t.id}
          className="w-max h-max pointer-events-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <div
            className="font-jet-brains flex flex-col gap-[2px] pt-[10px] pb-[8px] rounded-[8px]"
            style={{
              width: '232px',
              maxWidth: 'calc(100vw - 24px)',
              height: 'max-content',
              backgroundColor: '#FAF1F8',
              color: BoxTypeDefine.contentColor,
              boxShadow: '0px 12px 24px 0px #723B6429',
            }}
          >
            <div className="flex items-center gap-[4px] px-[12px] border-b-[1px] border-solid border-[#FCF5FA] pb-[6px]">
              {type === 'error' ? (
                <CloseIcon className={cn('!w-[24px] !h-[24px] !text-[#9D4646]')} />
              ) : (
                <CheckIcon className={cn('!w-[24px] !h-[24px] !text-[#4A982C]')} />
              )}
              <Typography
                sx={{
                  fontSize: '14px',
                  lineHeight: '1.4',
                }}
              >
                {title}
              </Typography>
            </div>
            <div className="whitespace-pre-wrap px-[12px] pt-[6px] border-t-[1px] border-solid border-[#F5E9F5]">
              {typeof content === 'string' ? (
                <Typography
                  dangerouslySetInnerHTML={{
                    __html: content,
                  }}
                  sx={{
                    fontSize: '12px',
                    lineHeight: '1.5',
                  }}
                />
              ) : (
                content
              )}
            </div>
          </div>
        </motion.div>
      ) : (
        <></>
      )}
    </AnimatePresence>
  );
};

export default Toast;
