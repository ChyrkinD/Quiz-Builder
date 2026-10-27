import type { FC } from 'react';

import { Icon } from '~/components/icon/icon';
import { IconButton } from '~/components/icon-button/icon-button';
import { ComponentSize, IconName, ToastType } from '~/libs/enums/enums';
import { getValidClasses } from '~/libs/helpers/helpers';

import { toastTypeToStyle } from './libs/maps';

type Properties = {
  message: string;
  type: ToastType;
  onClose: () => void;
};

const Toast: FC<Properties> = ({ message, type, onClose }) => {
  const style = toastTypeToStyle[type];

  return (
    <div
      className={getValidClasses(
        'pointer-events-auto flex w-full max-w-105 items-center gap-3 rounded-lg border-2 bg-surface py-2 pr-2 pl-3.5 shadow-raised sm:w-auto',
        style.border,
      )}
      role={type === ToastType.ERROR ? 'alert' : 'status'}
    >
      <Icon className={style.icon} iconName={style.iconName} />
      <p className="flex-1 py-1 text-sm font-bold text-text">{message}</p>
      <IconButton iconName={IconName.X} label="Dismiss" size={ComponentSize.SM} onClick={onClose} />
    </div>
  );
};

export { Toast };
