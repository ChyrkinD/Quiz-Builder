import type { FC } from 'react';

import type { IconName } from '~/libs/enums/enums';
import { getValidClasses } from '~/libs/helpers/helpers';

import { iconNameToIcon } from './libs/maps';

type Properties = {
  className?: string | undefined;
  iconName: IconName;
};

const Icon: FC<Properties> = ({ className, iconName }) => {
  const IconComponent = iconNameToIcon[iconName];

  return (
    <IconComponent
      aria-hidden="true"
      className={getValidClasses('size-5 shrink-0', className)}
      focusable="false"
    />
  );
};

export { Icon };
