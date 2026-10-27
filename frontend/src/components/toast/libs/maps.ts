import { IconName, ToastType } from '~/libs/enums/enums';

import type { ToastStyle } from './types';

export const toastTypeToStyle = {
  [ToastType.SUCCESS]: {
    border: 'border-success',
    icon: 'text-success',
    iconName: IconName.CIRCLE_CHECK,
  },
  [ToastType.ERROR]: { border: 'border-danger', icon: 'text-danger', iconName: IconName.ALERT },
} satisfies Record<ToastType, ToastStyle>;
