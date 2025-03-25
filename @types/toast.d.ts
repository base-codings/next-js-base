export type ToastPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right';

export type ToastType = 'error' | 'success';

export interface ToastIF {
  type: ToastType;
  title: string;
  content: string | React.ReactNode;
}
