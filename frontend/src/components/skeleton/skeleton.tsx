import type { FC } from 'react';

import { getValidClasses } from '~/libs/helpers/helpers';

type Properties = {
  className?: string | undefined;
};

const Skeleton: FC<Properties> = ({ className }) => (
  <div
    aria-hidden="true"
    className={getValidClasses('animate-pulse rounded-sm bg-border', className)}
  />
);

export { Skeleton };
