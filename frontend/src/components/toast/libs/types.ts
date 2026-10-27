import type { IconName, ToastType } from '~/libs/enums/enums';

export type ToastMessage = {
  id: number;
  message: string;
  type: ToastType;
};

export type ToastContextValue = {
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
};

export type ToastStyle = {
  border: string;
  icon: string;
  iconName: IconName;
};
