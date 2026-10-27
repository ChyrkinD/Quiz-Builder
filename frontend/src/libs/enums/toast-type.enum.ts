import type { ValueOf } from '~/libs/types/types';

export const ToastType = {
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

export type ToastType = ValueOf<typeof ToastType>;
