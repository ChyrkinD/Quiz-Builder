import type { FC, ReactNode } from 'react';

import { Icon } from '~/components/icon/icon';
import { ColorTone, ComponentSize, type IconName } from '~/libs/enums/enums';
import { getValidClasses } from '~/libs/helpers/helpers';
import { colorToneToSoftClasses } from '~/libs/maps/maps';

import { badgeSizeToClasses } from './libs/maps';

type Properties = {
  children: ReactNode;
  className?: string | undefined;
  iconName?: IconName | undefined;
  size?: ComponentSize | undefined;
  tone?: ColorTone | undefined;
};

const Badge: FC<Properties> = ({
  children,
  className,
  iconName,
  size = ComponentSize.MD,
  tone = ColorTone.PRIMARY,
}) => (
  <span
    className={getValidClasses(
      'inline-flex items-center gap-1.5 rounded-full font-bold whitespace-nowrap',
      badgeSizeToClasses[size],
      colorToneToSoftClasses[tone],
      className,
    )}
  >
    {iconName && <Icon className="size-3.5" iconName={iconName} />}
    {children}
  </span>
);

export { Badge };
