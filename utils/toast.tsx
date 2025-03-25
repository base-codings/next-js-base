import { ReactNode } from 'react';
import { default as callToast, ToastOptions } from 'react-hot-toast';
import Toast from '~/components/primitives/Toast';

export const toast = {
  success: (message?: string | ReactNode, title: string = 'Successful!!!', options?: ToastOptions) => {
    callToast.custom((t) => {
      return <Toast type="success" title={title} content={message} t={t} />;
    }, options);
  },
  error: (message?: string | ReactNode, title: string = 'Ohh! Noooooooo', options?: ToastOptions) => {
    callToast.custom((t) => {
      return <Toast type="error" title={title} content={message} t={t} />;
    }, options);
  },
};
