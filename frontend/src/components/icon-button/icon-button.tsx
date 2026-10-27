import type { FC } from 'react';

import { Icon } from '~/components/icon/icon';
import { ButtonVariant, ComponentSize, type IconName } from '~/libs/enums/enums';
import { getValidClasses } from '~/libs/helpers/helpers';
import { componentSizeToIconClasses } from '~/libs/maps/maps';

import { iconButtonSizeToClasses, iconButtonVariantToClasses } from './libs/maps';
import type { IconButtonVariant } from './libs/types';

type Properties = {
  className?: string | undefined;
  iconName: IconName;
  isDisabled?: boolean | undefined;
  label: string;
  size?: ComponentSize | undefined;
  variant?: IconButtonVariant | undefined;
  onClick: () => void;
};

const IconButton: FC<Properties> = ({
  className,
  iconName,
  isDisabled = false,
  label,
  size = ComponentSize.MD,
  variant = ButtonVariant.GHOST,
  onClick,
}) => (
  <button
    aria-label={label}
    className={getValidClasses(
      'inline-flex shrink-0 items-center justify-center transition-colors focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-45',
      iconButtonSizeToClasses[size],
      iconButtonVariantToClasses[variant],
      className,
    )}
    disabled={isDisabled}
    title={label}
    type="button"
    onClick={onClick}
  >
    <Icon className={componentSizeToIconClasses[size]} iconName={iconName} />
  </button>
);

export { IconButton };
